import { AuthClaims } from "./AuthClaims";

export interface AuthUsuario{
    id: string,
    nome: string,
    claims: AuthClaims[]
}