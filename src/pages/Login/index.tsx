/* eslint-disable @typescript-eslint/no-unused-vars */
import { BackgroundContent, Container, Content } from "./styles";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { Form } from "../../components/Form";

interface LoginPageProps {
  background: string;
  logo: string;
  setAuthenticated: () => Promise<void> | void;
}

export function LoginPage({
  setAuthenticated,
  background,
  logo,
}: LoginPageProps) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onAuthenticateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      navigate("/");
      setAuthenticated();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <BackgroundContent image={background} />
      <Content>
        <>
          <div className="logo-container">
            <img src={logo} />
          </div>
          <Form className="login-form" onSubmit={onAuthenticateSubmit}>
            <hr />
            <Input
              title="Usuário"
              placeholder="Usuário"
              icon="user"
              onChange={(evt) => setUser(evt.target.value)}
            />
            <Input
              title="Senha"
              placeholder="Senha"
              type="password"
              icon="key"
              onChange={(evt) => setPassword(evt.target.value)}
            />
            <Button title="Entrar" size="lg" type="submit" loading={loading} />
            <div className="options-form">
              <a href="#">Esqueci a senha</a>
            </div>
          </Form>
        </>
      </Content>
    </Container>
  );
}
