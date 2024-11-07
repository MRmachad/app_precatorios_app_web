import styled from "styled-components";
import { device } from "../../styles/responsive";

export interface PopuverOptionsProps {
  visible: boolean
}

export const HeaderContainer = styled.div`
  display: flex;
  flex: 1;
  height: 3.75rem;
  padding: 1.25rem;
  width: 100%;

  justify-content: space-between;
  align-items: center;

  background-color: ${props => props.theme.background};
  img {
    height: 1.875rem;
    max-height: 30px;
  }
`;

export const MenuOptionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  
  @media ${device.mobile} {
      input {
        display: none;
      }

      svg {
        display: none;
      }
  }

  div.searchBox {

    display: flex;
    align-items: center;

    &:focus-within {
      svg {
        visibility: hidden;
        opacity: 0;
      }
    }

    input {
      width: 15.625rem;
      height: 1.6875rem;
      background-color: ${props => props.theme.backgroundInput};
      color: ${props => props.theme.text};
      padding: 0 0.875rem;
      border-radius: 15px;
      font-size: 0.75rem;    
      border: none;

      &:focus {
        outline: transparent;
      }
    }

    svg {
      font-size: 0.875rem;
      position: absolute;
      margin-left: 14.125rem;

      transition: visibility 1s, opacity 0.2s linear;
    }
  }

  a.notificationBox {
    background: transparent;
    color: ${props => props.theme.text};
    cursor: pointer;
    transition: color 0.2s;
    font-size: 1.25rem;

    &:hover {
      color: ${props => props.theme.activatedText}
    }
  }

  a.userInfo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.3125rem;
    font-size: 0.875rem;
    width: 10rem;

    background: transparent;
    color: ${props => props.theme.text};
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: ${props => props.theme.activatedText}
    }
  }
`;

export const PopuverOptions = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'visible', // Bloqueia "visible" de ir para o DOM
})<PopuverOptionsProps>`
  background: white;
  position: fixed;
  margin-top: 1rem;
  background: var(--black-300);
  border-radius: 0 0 10px 10px;
  width: 10rem;
  overflow: hidden;
  padding: 0.425rem 0;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  
  button {    
    width: 100%;
    padding: .5rem;
    color: var(--white-100);
    text-decoration: none;
    text-align: left;
    font-size: 0.875rem;
    background: transparent;
    border: 0;
    color: ${props => props.theme.text};

    &:hover {
      color: ${props => props.theme.activatedText};
      cursor: pointer;
    }
  }
`;