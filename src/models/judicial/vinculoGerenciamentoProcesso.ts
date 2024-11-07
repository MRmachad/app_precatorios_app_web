export interface VinculosGerenciamentoProcessoDTO {
    uuid: string;
    status: number;
}

export interface CriarVinculosGerenciamentoProcessoRequest {
    uuids: string[];
}