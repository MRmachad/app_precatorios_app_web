import { useEffect, useState } from "react";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import background from "./assets/background.jpg";
import logo from "./assets/logo.svg";
import logo_light from "./assets/logo-light.svg";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { Home } from "./components/Home";

import styles from "./App.module.css";
import { Header } from "./components/Header";
import { Menu } from "./components/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthRoutes } from "./routes/auth";
import "./global.css"

library.add(fas);
export function App() {
  return (
    <div>
      <AppMain />
      <ToastContainer />
    </div>
  );
}

export function AppMain() {
  const store = localStorage.getItem("auth")
  const [loading, setLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(store == "true");

  const _theme = "default";
  const _logo = logo;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return authenticated ? (
    <>
      <BrowserRouter>
        <Header theme={_theme} logo={_logo} />
        <div className={styles.container}>
          <Menu />
          <div className={styles.pageContainer}>
            <Routes>
              <Route Component={Home} path="/" />
              {routes.map((r) => (
                <Route key={1} path={r.path} Component={r.component} />
              ))}
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  ) : loading ? (
    <div className={styles.loadingContainer}>
      <FontAwesomeIcon icon="spinner" />
    </div>
  ) : (
    <BrowserRouter>
      <AuthRoutes
        setAuthenticated={() => {
          setAuthenticated(true)
          localStorage.setItem("auth", "true")
        }}
        backgroundLogin={background}
        logo={logo_light}
      />
    </BrowserRouter>
  );
}
