export interface APIResponseBase {
  sucesso: boolean,
  erros: APIResponseError[]
  erros_sistema: APISystemError[]
}

export interface APIResponse<T> extends APIResponseBase {
  dados: T | null,
  totalCount: number | null
}

export interface APIResponseError {
  titulo: string,
  mensagem: string
}

export interface APISystemError {
  excecao : string,
  excecaoInterna : string,
  rastreamentoPilha : string,
  metodoCodigoFonte : string,
  linhaCodigoFonte : number,
  nomeArquivoFonte : string,
  objetoManipulado : string
  titulo : string,
  mensagem : string
}