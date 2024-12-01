import { useEffect, useState } from "react";
import { Container, Title } from "./styles";
import { DataTable } from "../../../components/DataTable";
import { Processo } from "../../../models/judicial/processo";
import { getAPIAddress } from "../../../services/base";
import { useNavigate } from "react-router-dom";
import AdjustableSlider from "../../../components/AdjustableSlider";
import * as XLSX from "xlsx";
import {
  createVinculosGerenciamentoProcesso,
  getEnterprises,
  getVinculosGerenciamentoProcessoInclusos,
} from "../../../services/UMBITAppGen";
import { VinculosGerenciamentoProcessoDTO } from "./../../../models/judicial/vinculoGerenciamentoProcesso";
import { APIResponse } from "../../../models/base/APIResponse";
import { Input } from "../../../components/Input";

export const ProcessoView = () => {
  const navigation = useNavigate();
   
  const [, setLoading] = useState<boolean>(false);
   
  const [, setError] = useState<string | null>(null);
  const [
    vinculosGerenciamentoRelacionados,
    setVinculosGerenciamentoRelacionados,
  ] = useState<VinculosGerenciamentoProcessoDTO[]>([]);
  const [resourse, setResourse] = useState<string>(`data-processo`);
  const [marcados, setMarcados] = useState<string[]>([]);
  const [processos, setProcessos] = useState<Processo[]>([]);
  const [_atualizeDados, setAtualizeDados] = useState<boolean>(false);
  const [sliderValue, setSliderValue] = useState<number>(100);
  const [isSliderDisabled, setIsSliderDisabled] = useState<boolean>(false);

  const handleCheckboxChange = (processoId: string) => {
    setMarcados((prevMarcados) => {
      if (prevMarcados.includes(processoId)) {
        return prevMarcados.filter((id) => id !== processoId);
      } else {
        return [...prevMarcados, processoId];
      }
    });
  };

  const handleCheckTodos = () => {
    setMarcados(processos.map((t) => t.uuid));
  };

  const handleUnCheckTodos = () => {
    setMarcados(marcados.filter((t) => !processos.some((pr) => pr.uuid == t)));
  };

  const handleDownload = async () => {
    setLoading(true);
    setError(null);

    // Swal.fire({
    //   title: "Ao baixar o processo você mudará o Status do mesmo!",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonText: "Continuar",
    //   cancelButtonText: "Cancelar",
    //   reverseButtons: true,
    // }).then(async (result) => {
    //   if (result.isConfirmed) {

    //   }
    // });

    try {
      const vinculosASerCriado = marcados.filter(
        (t) => !vinculosGerenciamentoRelacionados.map((t) => t.uuid).includes(t)
      );

      if (
        (vinculosASerCriado &&
          (await createVinculosGerenciamentoProcesso(vinculosASerCriado))
            .sucesso) ||
        vinculosASerCriado
      ) {
        if (vinculosASerCriado) {
          setAtualizeDados(true);
        }
        const response = await getEnterprises(marcados);

        const processosData = response.dados;

        const ws = XLSX.utils.json_to_sheet(processosData ?? []);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Processos");

        const file = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

        const buffer = new ArrayBuffer(file.length);
        const view = new Uint8Array(buffer);
        for (let i = 0; i < file.length; i++) {
          view[i] = file.charCodeAt(i) & 0xff;
        }
        const blob = new Blob([buffer], { type: "application/octet-stream" });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "processos.xlsx");
        document.body.appendChild(link);
        link.click();

        link.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      setError("Erro ao baixar os dados. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlerGetVinculosGerenciamento = async () => {
    const vinculosAssociadosResult =
      await getVinculosGerenciamentoProcessoInclusos(
        processos?.map((t) => t.uuid) ?? []
      );

    if (
      vinculosAssociadosResult &&
      (
        vinculosAssociadosResult as APIResponse<
          VinculosGerenciamentoProcessoDTO[]
        >
      ).sucesso
    ) {
      setVinculosGerenciamentoRelacionados(
        (
          vinculosAssociadosResult as APIResponse<
            VinculosGerenciamentoProcessoDTO[]
          >
        ).dados ?? []
      );
    } else {
      setVinculosGerenciamentoRelacionados([]);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setResourse(`data-processo?$filter=valor eq ${sliderValue}`);

      setAtualizeDados(true);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [sliderValue]);

  useEffect(() => {
    if (!isSliderDisabled) {
      setResourse(`data-processo`);
    }
    setAtualizeDados(true);
  }, [isSliderDisabled]);

  useEffect(() => {
    handlerGetVinculosGerenciamento();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processos]);

  return (
    <Container>
      <Title>Processos</Title>
      <DataTable<Processo>
        data={processos}
        apiAddress={getAPIAddress("appgen")}
        resource={resourse}
        columns={[
          {
            header: " ",
            value: (i) => {
              return (
                <div
                  key={i.uuid}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <input
                    type="checkbox"
                    checked={marcados.includes(i.uuid)}
                    onChange={() => handleCheckboxChange(i.uuid)}
                  />
                </div>
              );
            },
          },
          {
            key: "numeroProcesso",
            header: "Número de Processo",
            filterable: true,
          },
          {
            value: (i) => {
              const aux = i.assunto?.slice(0, 70);
              return (
                <div key={i.uuid + "_assunto"}>
                  {i.assunto.length > 70
                    ? `${aux}...`
                    : aux != null && aux != ""
                    ? aux
                    : "-"}
                </div>
              );
            },
            header: "Descrição",
          },
          {
            header: "Tribunal",
            value: () => {
              return <>TJGO</>;
            },
          },
          {
            value: (i) => {
              return (
                <>
                  {i.valor !== 0
                    ? `R$ ${i.valor.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    : "-"}
                </>
              );
            },
            header: "Valor",
          },
          {
            header: "Data de Referência",
            value: (i) => {
              return <>{i.metaProcesso.dataPublicacao}</>;
            },
          },
          {
            header: "Status",
            value: (i) => {
              return (
                <>
                  {vinculosGerenciamentoRelacionados.some(
                    (t) => t.uuid == i.uuid
                  )
                    ? "Vizualizado"
                    : "Não visto"}
                </>
              );
            },
          },
        ]}
        buttons={[
          {
            icon: "edit",
            variant: "warning",
            onClick: (o) => {
              navigation(`/prec/precatorio/${o.uuid}`, {
                state: {
                  processo: o,
                  vinculo: vinculosGerenciamentoRelacionados.find(
                    (t) => t.uuid == o.uuid
                  ),
                },
              });
            },
          },
        ]}
        customButons={[
          {
            value: () => (
              <AdjustableSlider
                sliderValue={sliderValue}
                setSliderValue={setSliderValue}
                isSliderDisabled={isSliderDisabled}
                setIsSliderDisabled={setIsSliderDisabled}
              />
            ),
          },
          {
            value: () => (
              <>
                <Input title={"Polo Passivo"}></Input>
              </>
            ),
          },
          {
            value: () => (
              <>
                <Input icon="spinner" title={"Polo Ativo"}>
                </Input>
              </>
            ),
          },
          {
            icon: "minus-circle",
            variant: "warning",
            label: "Desmarcar",
            condition: () => marcados.length > 0,
            onClick: () => {
              handleUnCheckTodos();
            },
          },
          {
            icon: "check-circle",
            variant: "default",
            label: "Marcar",
            condition: () =>
              marcados.length > 0 && processos.length != marcados.length,
            onClick: () => {
              handleCheckTodos();
            },
          },
          {
            icon: "file-excel",
            variant: "success",
            label: "Baixar Excel",
            condition: () => marcados.length > 0,
            onClick: () => {
              handleDownload();
            },
          },
        ]}
        pageSize={50}
        atualize={_atualizeDados}
        onDadosAtualizados={(msg) => {
          setAtualizeDados(false);
          setProcessos(msg);
        }}
        orderPolicy={"MetaProcesso/DataPublicacao desc"}
      />
    </Container>
  );
};
