import { toast } from "react-toastify";
import { APIResponseBase } from "../../models/base/APIResponse";
import { ToastMessage } from "../../components/ToastMessage";

export class UMBITRequest {
  private _path: string;
  private _options: RequestInit;

  private _filters: string[];
  private _selects: string[];
  private _pagina: number;
  private _tamanhoPagina: number;
  private _orderPolicy: string;

  private _habilitaPaginacao = false;
  private _habilitaSelects = false;
  private _habilitaFiltros = false;
  private _habilitaOrdenacao = false;

  constructor(path: string, options: RequestInit) {
    this._path = path;
    this._options = options;
    this._pagina = 0;
    this._tamanhoPagina = 0;
    this._orderPolicy = "";

    this._filters = [];
    this._selects = [];

    this._habilitaPaginacao = false;
    this._habilitaSelects = false;
    this._habilitaFiltros = false;
    this._habilitaOrdenacao = false;
  }

  addFilter = (filter: string): UMBITRequest => {
    this._habilitaFiltros = true;

    this._filters.push(filter);

    return this;
  };

  addPagination = (pagina: number, tamanhoPagina: number): UMBITRequest => {
    this._habilitaPaginacao = true;

    this._pagina = pagina;
    this._tamanhoPagina = tamanhoPagina;

    return this;
  };

  addSelect = (select: string): UMBITRequest => {
    this._habilitaSelects = true;

    this._selects.push(select);
    return this;
  };

  addOrderPolicy = (orderPolicy: string): UMBITRequest => {
    this._habilitaOrdenacao = true;
    this._orderPolicy = orderPolicy;

    return this;
  };

  execute = async <TResponse extends APIResponseBase>(): Promise<TResponse> => {
    const queryString = [];

    try {
      if (this._habilitaFiltros) {
        const queryFilter = `$filter=${this._filters
          .map((filter) => `(${filter})`)
          .join(" AND ")}`;
        queryString.push(queryFilter);
      }
      if (this._habilitaSelects) {
        const querySelect = `$select=${this._selects
          .map((select) => `${select}`)
          .join(", ")}`;
        queryString.push(querySelect);
      }
      if (this._habilitaPaginacao) {
        const querySkip = `$skip=${(this._pagina - 1) * this._tamanhoPagina}`;
        const queryTake = `$top=${this._tamanhoPagina}`;

        queryString.push(querySkip);
        queryString.push(queryTake);
      }
      if (this._habilitaOrdenacao) {
        const queryOrder = `$orderby=${this._orderPolicy}`;

        queryString.push(queryOrder);
      }

      const _url =
        queryString.length > 0
          ? `${this._path}${
              this._path.includes("?") ? "&" : "?"
            }${queryString.join("&")}`
          : this._path;

      const request = new Request(_url, this._options);
      const response = await fetch(request);

      const result = (await response.json()) as Promise<TResponse>;

      return this.responseMiddleware<TResponse>(await result);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return this.responseMiddleware<TResponse>(
        this.getDefaultError() as TResponse
      );
    }
  };

  private getDefaultError = (): APIResponseBase => {
    return {
      sucesso: false,
      erros: [
        {
          titulo: "Falha na Requisição",
          mensagem:
            "Não foi possivel acessar a fonte de dados, Tente novamente mais tarde.",
        },
      ],
      erros_sistema: [],
    };
  };

  private responseMiddleware = <TResponse extends APIResponseBase>(
    response: TResponse
  ): TResponse => {
    if (!response.sucesso && response.erros) {
      response.erros.forEach((err) => {
        toast.error(
          <ToastMessage mensagem={err.mensagem} titulo={err.titulo} />,
          {
            data: {
              title: err.titulo,
              text: err.mensagem,
            },
          }
        );
      });
    }

    return response;
  };
}
