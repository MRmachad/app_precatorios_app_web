import { ReactNode, createContext, useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";
import { APIResponse, APIResponseBase } from "../models/base/APIResponse";
import { Loading } from "../pages/Loading";
import { AuthUsuario } from "./auth/AuthUsuario";
import { AuthResponse } from "./auth/APIResponseAuth";

interface AuthContextData {
  authenticated: boolean;
  user: AuthUsuario | undefined;
  acessToken: string | undefined;
  refreshToken: string | undefined;
  login: (user: string, password: string) => Promise<boolean>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
  authService: {
    login: (
      user: string,
      password: string
    ) => Promise<APIResponse<AuthResponse>>;
    refreshSession: (
      token: string,
      refreshToken: string
    ) => Promise<APIResponse<AuthResponse>>;
    logout: () => Promise<APIResponseBase>;
  };
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function AuthProvider({ children, authService }: AuthProviderProps) {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AuthUsuario | undefined>();
  const [acessToken, setAcessToken] = useState<string | undefined>();
  const [refreshToken, setRefreshToken] = useState<string | undefined>();

  const [isLoading, setLoading] = useState<boolean>(false);

  const valideToken = (token: string | undefined): boolean => {
    if (!token) return false;
    else {
      try {
        const { exp } = jwtDecode(token) as {
          exp: number;
        };

        const expirationDatetimeInSeconds = exp * 1000;
        return Date.now() <= expirationDatetimeInSeconds;
      } catch {
        return false;
      }
    }
  };

  const loginFunc = async (
    user: string,
    password: string
  ): Promise<boolean> => {
    const authResponse = await authService.login(user, password);

    if (authResponse.sucesso && authResponse.dados) {
      const authData = authResponse.dados;

      if (valideToken(authData.accessToken)) {
        setAuthenticated(true);
        storeData(
          authData.usuarioToken,
          authData.accessToken,
          authData.refreshToken
        );

        return true;
      }
    } else {
      setAuthenticated(false);
      clearData();
    }

    return false;
  };

  const refreshFunc = async (
    acessToken: string,
    refreshToken: string
  ): Promise<void> => {
    setLoading(true);

    const authResponse = await authService.refreshSession(
      acessToken,
      refreshToken
    );

    if (
      authResponse.sucesso &&
      authResponse.dados &&
      valideToken(authResponse.dados.accessToken)
    ) {
      const authData = authResponse.dados;

      setAuthenticated(true);
      storeData(
        authData.usuarioToken,
        authData.accessToken,
        authData.refreshToken
      );
    } else {
      setAuthenticated(false);
      clearData();
    }

    setLoading(false);
  };

  const logoutFunc = () => {
    const { _acessToken } = getStoredData();
    if (valideToken(_acessToken)) {
      authService.logout();
    }

    setAuthenticated(false);
    clearData();
  };

  const storeData = (
    _user: AuthUsuario,
    _acessToken: string,
    _refreshToken: string
  ) => {
    setUser(_user);
    setAcessToken(_acessToken);
    setRefreshToken(_refreshToken);

    localStorage.setItem("user", JSON.stringify(_user));
    localStorage.setItem("acessToken", JSON.stringify(_acessToken));
    localStorage.setItem("refreshToken", JSON.stringify(_refreshToken));
  };

  const clearData = () => {
    setUser(undefined);
    setAcessToken(undefined);
    setRefreshToken(undefined);

    localStorage.removeItem("user");
    localStorage.removeItem("acessToken");
    localStorage.removeItem("refreshToken");
  };

  const getStoredData = () => {
    const storedUser = localStorage.getItem("user") ?? undefined;
    const storedAcessToken = localStorage.getItem("acessToken") ?? undefined;
    const storedRefreshToken =
      localStorage.getItem("refreshToken") ?? undefined;

    return {
      _user: storedUser ? (JSON.parse(storedUser) as AuthUsuario) : undefined,
      _acessToken: storedAcessToken,
      _refreshToken: storedRefreshToken,
    };
  };

  useEffect(() => {
    const { _user, _acessToken, _refreshToken } = getStoredData();
    const acessValid = valideToken(_acessToken);

    if (acessValid) {
      setAuthenticated(true);

      setUser(_user);
      setAcessToken(_acessToken);
      setRefreshToken(_refreshToken);
    } else if (_acessToken && _refreshToken && valideToken(_refreshToken)) {
      refreshFunc(_acessToken, _refreshToken);
    } else {
      setAuthenticated(false);
      clearData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authenticated: isAuthenticated,
        user: user,
        acessToken: acessToken,
        refreshToken: refreshToken,
        login: loginFunc,
        logout: logoutFunc,
      }}
    >
      {isLoading ? <Loading /> : children}
    </AuthContext.Provider>
  );
}
