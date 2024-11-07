import { useLocation } from "react-router-dom";
import { Processo } from "../../models/judicial/processo";
import {
  ProcessoContainer,
  HeaderGrid,
  InfoCard,
  InfoTitle,
  InfoValue,
  MovimentacoesList,
  MovimentacaoItem,
  HeaderContainer,
  HeaderTitle,
  NumeroTitle,
  ActionButton,
  ActionButtonsContainer,
} from "./styles";
import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VinculosGerenciamentoProcessoDTO } from "./../../models/judicial/vinculoGerenciamentoProcesso";
import { createVinculosGerenciamentoProcesso, getVinculosGerenciamentoProcessoInclusos } from "../../services/UMBITAppGen";

interface Movimentacao {
  dataHora: string;
  nome: string;
  descricao?: string;
}

export const DetalhesProcesso = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);
  const [classe, setClasse] = useState<string>("");
  const [orgaoJulgador, setOrgaoJulgador] = useState<string>("");
  const {
    processo,
    vinculo,
  }: {
    processo: Processo;
    vinculo: VinculosGerenciamentoProcessoDTO;
  } = useLocation().state;

  const [_vinculo, setVinculo] = useState<VinculosGerenciamentoProcessoDTO | undefined>(vinculo)

  const PolosAtivos = processo.nomePoloAtivo.split(",").filter((t) => t != " ");
  const PolosPassivos = processo.nomePoloPassivo
    .split(",")
    .filter((t) => t != " ");


  useEffect(() => {
    const fetchMovimentacoes = async () => {
      try {
        const response = await axios.post(
          "/api-datajud/api_publica_tjgo/_search",
          {
            query: {
              match: {
                numeroProcesso: processo.numeroProcesso.replace(/[-.]/g, ""),
              },
            },
          },
          {
            headers: {
              Authorization:
                "APIKey cDZHYzlZa0JadVREZDJCendQbXY6SkJlTzNjLV9TRENyQk1RdnFKZGRQdw==",
              "Content-Type": "application/json",
            },
          }
        );

        const movimentos = response.data.hits.hits[0]._source.movimentos.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (mov: any) => ({
            dataHora: mov.dataHora,
            nome: mov.nome,
            descricao: mov.complementosTabelados?.[0]?.descricao || "N/A",
          })
        );

        const classe =
          response.data.hits?.hits[0]?._source?.classe?.nome ?? "-";
        const orgaoJulgador =
          response.data.hits?.hits[0]?._source?.orgaoJulgador?.nome ?? "-";
        setClasse(classe);
        setMovimentacoes(movimentos);
        setOrgaoJulgador(orgaoJulgador);
      } catch (error) {
        console.error("Erro ao buscar movimentações:", error);
      }
    };

    fetchMovimentacoes();
  }, [processo.numeroProcesso]);

  const handleDownload = async () => {
    setLoading(true);
    setError(null);

    try {
      // Converte os dados JSON para um formato de planilha (worksheet)
      const ws = XLSX.utils.json_to_sheet([processo]);

      // Cria uma nova planilha e adiciona o conteúdo da worksheet
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Processos");

      // Converte a planilha para um arquivo .xlsx
      const file = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

      // Cria um link para download do arquivo Excel
      const buffer = new ArrayBuffer(file.length);
      const view = new Uint8Array(buffer);
      for (let i = 0; i < file.length; i++) {
        view[i] = file.charCodeAt(i) & 0xff;
      }
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      const url = window.URL.createObjectURL(blob);

      // Criando o link e fazendo o download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "processos.xlsx"); // Nome do arquivo
      document.body.appendChild(link);
      link.click();

      // Limpeza do link
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError("Erro ao baixar os dados. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handlerMarcar = async () => {
    
    await createVinculosGerenciamentoProcesso([processo.uuid]);

    const result = (await getVinculosGerenciamentoProcessoInclusos([processo.uuid]))

    setVinculo(result?.dados[0]);

  }
  return (
    <ProcessoContainer>
      <HeaderContainer>
        <div style={{ marginTop: "5px" }}>
          <NumeroTitle>
            <FontAwesomeIcon icon={"fa-scale-balanced"} />{" "}
            {processo.numeroProcesso}
          </NumeroTitle>
        </div>
        <br></br>
        <div style={{ marginTop: "5px" }}>
          <HeaderTitle>{processo.assunto}</HeaderTitle>
        </div>
        <br></br>
        <HeaderGrid>
          <InfoCard>
            <InfoTitle>
              <FontAwesomeIcon icon={"home"} /> Tribunal
            </InfoTitle>
            <InfoValue>TJGO</InfoValue>
          </InfoCard>
          <InfoCard>
            <InfoTitle>
              <FontAwesomeIcon icon={"home"} /> Valor da Causa
            </InfoTitle>
            <InfoValue>R$ {processo.valor}</InfoValue>
          </InfoCard>
          <InfoCard>
            <InfoTitle>
              <FontAwesomeIcon icon={"home"} /> Classe
            </InfoTitle>
            <InfoValue>{classe}</InfoValue>
          </InfoCard>
          <InfoCard>
            <InfoTitle>
              <FontAwesomeIcon icon={"home"} /> Serventia
            </InfoTitle>
            <InfoValue>{processo.serventia}</InfoValue>
          </InfoCard>
          <InfoCard>
            <InfoTitle>
              <FontAwesomeIcon icon={"home"} /> Nome do Polo Ativo
            </InfoTitle>
            <InfoValue>
              <ul>
                {PolosAtivos.map((t) => (
                  <li>{t}</li>
                ))}
              </ul>
            </InfoValue>
          </InfoCard>
          <InfoCard>
            <InfoTitle>
              <FontAwesomeIcon icon={"home"} /> Nome do Polo Passivo
            </InfoTitle>
            <InfoValue>
              <ul>
                {PolosPassivos.map((t) => (
                  <li>{t}</li>
                ))}
              </ul>
            </InfoValue>
          </InfoCard>
          <InfoCard>
            <InfoTitle>
              <FontAwesomeIcon icon={"home"} /> Data de Publicação
            </InfoTitle>
            <InfoValue>
              {new Date(
                processo.metaProcesso.dataPublicacao
              ).toLocaleDateString()}
            </InfoValue>
          </InfoCard>
          <InfoCard>
            <InfoTitle>
              <FontAwesomeIcon icon={"home"} /> Orgão julgador
            </InfoTitle>
            <InfoValue>{orgaoJulgador}</InfoValue>
          </InfoCard>
        </HeaderGrid>

        <ActionButtonsContainer>
          <ActionButton download={true} onClick={() => handleDownload()}>
            <FontAwesomeIcon icon="file-excel" /> Baixar
          </ActionButton>

          {!_vinculo && (
            <ActionButton
              download={false}
              onClick={() => {handlerMarcar()
              }}
            >
              <FontAwesomeIcon icon="check-circle" /> Marcar como Lida
            </ActionButton>
          )}
        </ActionButtonsContainer>
      </HeaderContainer>
      <MovimentacoesList>
        <h2>Movimentações do Processo</h2>
        <br></br>{" "}
        <MovimentacaoItem key={-1}>
          <span>Data</span>
          <span>Nome</span>
          <span>Descrição</span>
        </MovimentacaoItem>
        {movimentacoes.length > 0 ? (
          movimentacoes.map((movimentacao, index) => (
            <MovimentacaoItem key={index}>
              <span>{new Date(movimentacao.dataHora).toLocaleString()}</span>
              <span>{movimentacao.nome}</span>
              <span>{movimentacao.descricao}</span>
            </MovimentacaoItem>
          ))
        ) : (
          <p>Nenhuma movimentação encontrada.</p>
        )}
      </MovimentacoesList>
    </ProcessoContainer>
  );
};
