import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/Login";

interface AuthRotesProps {
  backgroundLogin: string;
  logo: string;
  setAuthenticated: () => Promise<void> | void;
}

export function AuthRoutes({ ...props }: AuthRotesProps) {
  return (
    <Routes>
      <Route
        Component={() => (
          <LoginPage
            setAuthenticated={props.setAuthenticated}
            background={props.backgroundLogin}
            logo={props.logo}
          />
        )}
        path="/"
      />
      <Route
        Component={() => (
          <LoginPage
            setAuthenticated={props.setAuthenticated}
            background={props.backgroundLogin}
            logo={props.logo}
          />
        )}
        path="/login"
      />

      {/* Default */}
      <Route Component={() => <Navigate to="/" />} path="*" />
    </Routes>
  );
}
