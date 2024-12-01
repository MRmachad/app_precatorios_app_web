import { AuthUsuario } from "./AuthUsuario";

export interface AuthResponse{
    enabledTwoFactor: boolean,
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
    usuarioToken: AuthUsuario
}
