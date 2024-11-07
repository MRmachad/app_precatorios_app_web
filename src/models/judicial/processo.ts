export interface MetaProcesso {
    uuid: string; // UUID do meta processo
    numeroProcesso: string; // Número do processo
    numeroProcessoConsulta: string; // Número de consulta do processo
    tipo: string; // Tipo do meta processo
    createdAt: string; // Data de criação no formato ISO 8601
    updatedAt: string; // Data de atualização no formato ISO 8601
    dataPublicacao: string; // Data de publicação no formato ISO 8601
  }
  
  export interface Processo {
    uuid: string; // UUID do processo
    numeroProcesso: string; // Número do processo
    classe: string; // Classe do processo
    nomePoloPassivo: string; // Nome do polo passivo
    nomePoloAtivo: string; // Nome do polo ativo
    assunto: string; // Assunto do processo
    valor: string; // Valor do processo
    serventia: string; // Serventia do processo
    createdAt: string; // Data de criação no formato ISO 8601
    updatedAt: string; // Data de atualização no formato ISO 8601
    numeroProcessoConsulta: string; // Número de consulta do processo
    cpfCNPJPoloPassivo: string; // CPF ou CNPJ do polo passivo
    cpfCNPJNomePoloAtivo: string; // CPF ou CNPJ do polo ativo
    serventia2: string | null; // Segunda serventia, que pode ser nula
    metaProcessoId: string; // UUID do meta processo relacionado
    metaProcesso: MetaProcesso; // Objeto do meta processo relacionado
  }