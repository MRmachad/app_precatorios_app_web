import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Input } from "../Input";
import { Button } from "../Button";
import { Container } from "./styles";
import { APIResponse } from "../../models/base/APIResponse";
import { UMBITService } from "../../services/base/UMBITService";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Column<T> {
  header: string;
}

interface SimpleColumn<T> extends Column<T> {
  filterable?: boolean;
  key: keyof T;
}

interface CustomColumn<T> extends Column<T> {
  value: (instanceData: T) => JSX.Element;
}
interface CustomAction {
  value: () => JSX.Element;
}

interface ColumnButton<T> {
  icon?: string | undefined;
  label?: string | undefined;
  condition?: (instanceData: T) => boolean;
  onClick: (instanceData: T) => Promise<void> | void;
  variant?: "default" | "warning" | "danger" | "success" | undefined;
}

interface CustomButton {
  icon?: string | undefined;
  label?: string | undefined;
  condition?: () => boolean;
  onClick: () => Promise<void> | void;
  variant?: "default" | "warning" | "danger" | "success" | undefined;
}

interface TableProps<T> {
  resource: string;
  pageSize?: number;
  atualize: boolean;
  apiAddress: string;
  orderPolicy: string;
  enableFilter?: boolean;
  customFilters?: string[];
  enablePagination?: boolean;
  buttons?: ColumnButton<T>[];
  data: T[] | undefined;
  customButons?: (CustomButton | CustomAction)[];
  columns: (SimpleColumn<T> | CustomColumn<T>)[];
  onDadosAtualizados: (data: T[]) => void;
  onRowClick?: (instanceData: T) => Promise<void> | void;
}

export const DataTable = <T extends object>({
  data,
  columns,
  buttons,
  atualize,
  resource,
  apiAddress,
  orderPolicy,
  customFilters,
  customButons,
  pageSize = 50,
  enableFilter = true,
  enablePagination = true,
  onDadosAtualizados,
  onRowClick,
}: TableProps<T>) => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (!atualize) fetchData();
  }, [page]);

  useEffect(() => {
    if (atualize) {
      fetchData();
    }
  }, [atualize]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData();
  };

  const fetchData = async () => {
    try {
      const umbitService = new UMBITService(apiAddress);

      const requestData = umbitService.requisicaoGET(resource);

      const _groupedFilter: string[] = [];
      columns
        .filter((column) => (column as SimpleColumn<T>).filterable)
        .forEach((column) => {
          if ((column as SimpleColumn<T>).filterable) {
            _groupedFilter.push(
              `contains(cast(${(
                column as SimpleColumn<T>
              ).key.toString()}, 'Edm.String'), '${filter.replace("'", "`")}')`
            );
          }
        });

      if (_groupedFilter.length > 0) {
        requestData.addFilter(_groupedFilter.join(" OR "));
      }

      if (customFilters && customFilters?.length > 0) {
        requestData.addFilter(
          customFilters.map((filter) => `(${filter})`).join(" AND ")
        );
      }

      if (enablePagination) {
        requestData.addOrderPolicy(orderPolicy);
        requestData.addPagination(page, pageSize);
      }

      const resultData = await requestData.execute<APIResponse<T[]>>();
      if (resultData.sucesso) {
        setTotalItems(resultData.totalCount!);
        onDadosAtualizados(resultData.dados ?? []);
        if (page != 1 && resultData.dados?.length == 0) setPage(page - 1);
      }
    } catch (error) {
      console.error("Erro ao buscar os dados: ", error);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <Container>
        <div className="actions-containers">
          {enableFilter &&
            columns.filter((col) => (col as SimpleColumn<T>).filterable)
              .length > 0 && (
              <form className="form-filter" onSubmit={handleSubmit}>
                <div className="filtro-container">
                  <div className="filter-input">
                    <Input
                      title="Buscar"
                      type="text"
                      placeholder="Filtrar"
                      value={filter}
                      onChange={handleFilterChange}
                      icon="search"
                    />
                  </div>
                  <div className="button-container">
                    <Button title="Buscar" icon="search" size="md" />
                  </div>
                </div>
              </form>
            )}
          <div className="custom-buttons">
            {customButons
              ?.filter((btn) => (btn as CustomAction).value)
              .map((btn, index_btn) => {
                const cta = btn as CustomAction;
                return <div key={`act_custom_${index_btn}`} className="container-action">{cta.value()}</div>;
              })}
            {customButons
              ?.filter((btn) => !(btn as CustomAction).value)
              ?.filter((btn) => {
                const customButton = btn as CustomButton;
                return (
                  customButton.condition === undefined ||
                  customButton.condition()
                );
              })
              .map((btn, index_btn) => (
                <div className="container-action">
                  <Button
                    key={`btn_custom_${index_btn}`}
                    size="md"
                    icon={(btn as CustomButton).icon}
                    title={(btn as CustomButton).label}
                    variant={(btn as CustomButton).variant}
                    onClick={() => (btn as CustomButton).onClick()}
                  />
                </div>
              ))}
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={`header_${index}`}>{column.header}</th>
              ))}
              {buttons && buttons.length > 0 && (
                <th className="actions-col"></th>
              )}
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr
                key={index}
                onClick={() => onRowClick == undefined || onRowClick(item)}
              >
                {columns.map((column, index_col) =>
                  (column as SimpleColumn<T>).key ? (
                    <td key={`column_${index}_${index_col}`}>{`${
                      item[(column as SimpleColumn<T>).key]
                    }`}</td>
                  ) : (
                    <td key={`column_${index}_${index_col}`}>
                      {(column as CustomColumn<T>).value(item)}
                    </td>
                  )
                )}
                {buttons && buttons.length > 0 && (
                  <td className="actions-col">
                    {buttons
                      .filter(
                        (btn) =>
                          btn.condition == undefined || btn.condition(item)
                      )
                      .map((btn, index_btn) => (
                        <Button
                          key={`btn_${index}_${index_btn}`}
                          size="sm"
                          icon={btn.icon}
                          title={btn.label}
                          variant={btn.variant}
                          onClick={() => btn.onClick(item)}
                        />
                      ))}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-container">
          <button
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            <FontAwesomeIcon icon={"arrow-left"} />
          </button>
          <span>Página {page}</span>
          <button
            disabled={page * pageSize >= totalItems}
            onClick={() => handlePageChange(page + 1)}
          >
            <FontAwesomeIcon icon={"arrow-right"} />
          </button>
        </div>
      </Container>
    </>
  );
};
