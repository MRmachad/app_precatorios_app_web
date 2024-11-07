import { ThemeProvider } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { defaultTheme, lightTheme } from "../../styles/themes/default"
import { HeaderContainer, MenuOptionsContainer, PopuverOptions } from "./styles"
import {  useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  theme: 'light' | 'default',
  logo: string
}

export function Header({ theme, logo } : HeaderProps ) {
  const navigate = useNavigate();
  const [optionsVisible, setOptionsVisible] = useState<boolean>(false);

  const _theme = (theme === 'light' ? lightTheme : defaultTheme );

  const sair = () => {
    navigate("/login");
  }

  return (
    <ThemeProvider theme={_theme}>
      <HeaderContainer>
        <a href="/">
          <img src={logo} alt="Preencher alt" height={30} />
        </a>
        <MenuOptionsContainer>
          <div className="searchBox">
            <input placeholder="Pesquisar" />
            <FontAwesomeIcon icon='search' color={_theme.placeHolder} />
          </div>
          <a className="notificationBox">
            <FontAwesomeIcon icon='bell' />
          </a>
          <div>
            <a className="userInfo" onClick={() => setOptionsVisible(!optionsVisible)}>
              {"Usuario precatorio"}
              <FontAwesomeIcon icon="caret-down" />
            </a>
            <PopuverOptions visible={optionsVisible}>
              <button onClick={sair}>Sair</button>
            </PopuverOptions>
          </div>
        </MenuOptionsContainer>
      </HeaderContainer>      
    </ThemeProvider>
  )
}