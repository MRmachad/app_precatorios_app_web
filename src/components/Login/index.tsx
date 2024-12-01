import { BackgroundContent, Container, Content } from "./styles";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { APIResponse, APIResponseBase, APIResponseError } from "../../models/base/APIResponse";
import { Form } from "../Form";
import { AuthStatus } from "../../context/auth/AuthStatus";

interface LoginPageProps {
  background: string;
  logo: string;
  checkAuthStatusHandler: () => Promise<APIResponse<AuthStatus>>;
  addAdminHandler: (
    nome: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<APIResponseBase>;
}

export function LoginPage({ background, logo, checkAuthStatusHandler, addAdminHandler }: LoginPageProps) {
  const navigate = useNavigate();

  const [statusChecking, setStatusChecking] = useState<boolean>(true);
  const [authConfigurationStatus, setAuthConfigurationStatus] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [ user, setUser ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');

  const { login } = useContext(AuthContext);

  const [formErrors, setFormErrors] = useState<APIResponseError[]>([]);
  const [admNome, setAdmNome] = useState<string>('');
  const [admEmail, setAdmEmail] = useState<string>('');
  const [admPassword, setAdmPassword] = useState<string>('');
  const [admConfirmPassoword, setAdmConfirmPassword] = useState<string>('');

  const onAuthenticateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login(user, password);

      if(response) {
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  }

  const onAddAdminSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try
    {

      const response = await addAdminHandler(
        admNome,
        admEmail,
        admPassword,
        admConfirmPassoword
      );

      if(response.sucesso) {
        setAuthConfigurationStatus(true);
      } else {
        setFormErrors(response.erros);
      }
    }
    finally {
      setLoading(false);
    }
  }

  const updateConfigurationStatus = async () => {
    const response = await checkAuthStatusHandler();
    if(response.sucesso && response.dados) {
      setAuthConfigurationStatus(response.dados.configured);
    } else {
      setAuthConfigurationStatus(true);
    }

    setStatusChecking(false);
  };

  useEffect(() => {
    updateConfigurationStatus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <BackgroundContent image={background} />
      <Content>
      {statusChecking ? (
          <div>
            Carregando Informações...
          </div>
        ) : (
          <>
            <div className="logo-container">
              <img src={logo} />
            </div>
            { authConfigurationStatus ? (
              <Form className="login-form" onSubmit={onAuthenticateSubmit}>
                <hr />
                <Input title="Usuário" placeholder="Usuário" icon="user" onChange={(evt) => setUser(evt.target.value)} />
                <Input title="Senha" placeholder="Senha" type="password" icon="key" onChange={(evt) => setPassword(evt.target.value)}  />
                <Button title="Entrar" size="lg" type="submit" loading={loading} />
                <div className="options-form">
                  <a href="#">Esqueci a senha</a>
                </div>
              </Form>
            ) : (
              <>
                <Form className="login-form" errors={formErrors} onSubmit={onAddAdminSubmit}>
                  <hr/>
                  <h3>Cadastrar Administrador</h3>
                  <hr />
                  <Input title="Nome" placeholder="Nome" onChange={(evt) => setAdmNome(evt.target.value)} />
                  <Input title="Email" placeholder="Email" type="email" onChange={(evt) => setAdmEmail(evt.target.value)} />
                  <Input title="Senha" placeholder="Senha" type="password" onChange={(evt) => setAdmPassword(evt.target.value)} />
                  <Input title="Confirmar Senha" placeholder="Confirmar Senha" type="password" onChange={(evt) => setAdmConfirmPassword(evt.target.value)} />
                  <Button title="Salvar" size="lg" type="submit" loading={loading} />
                </Form>
              </>
            )}
          </>
        )}
      </Content>
    </Container>
  )
}