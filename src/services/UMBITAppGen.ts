import { APIResponse, APIResponseBase } from "../models/base/APIResponse";
import { Processo } from "../models/judicial/processo";
import { getAPIAddress } from "./base";
import { UMBITService } from "./base/UMBITService";
import { CriarVinculosGerenciamentoProcessoRequest, VinculosGerenciamentoProcessoDTO } from './../models/judicial/vinculoGerenciamentoProcesso';

const UMBITAppGenAPI = new UMBITService(getAPIAddress("appgen"));

export const getEnterprises = async (uuids: string[]): Promise<APIResponse<Processo[]>> => {
    return await UMBITAppGenAPI.requisicaoGET(uuids ? `data-processo-genc?$filter=uuid in ("${uuids.join(
            "\",\""
        )}")` : `data-processo`).execute<
        APIResponse<Processo[]>
    >();
};
export const getVinculosGerenciamentoProcessoInclusos = async (uuids: string[]): Promise<APIResponse<VinculosGerenciamentoProcessoDTO[]> | undefined> => {
    if (uuids && uuids.length > 0) {

        return await UMBITAppGenAPI.requisicaoGET(`data-processo-genc?$filter=uuid in ("${uuids.join(
            "\",\""
        )}")`).execute<
            APIResponse<VinculosGerenciamentoProcessoDTO[]>
        >();
    } else {
        return {
            dados: [],
            erros: [],
            erros_sistema: [],
            sucesso: false,
            totalCount: 0
        }
    }
};
export const createVinculosGerenciamentoProcesso = async (uuids: string[]): Promise<APIResponseBase> => {
    return await UMBITAppGenAPI.requisicaoPOST<CriarVinculosGerenciamentoProcessoRequest>(`data-processo-genc`, {
        uuids: uuids
    }).execute<APIResponseBase>();
};