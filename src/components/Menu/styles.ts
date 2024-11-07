import styled from "styled-components";
import { device } from "../responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const MenuContainer = styled.div<{ isOpen: boolean }>`
  overflow: hidden;
  height: 100%;
  background: var(--black-300);
  width: ${props => (props.isOpen ? '250px' : '60px')}; 

  @media ${device.mobile} {
    display: none;
  }

  @media ${device.mobileS} {
    display: none;
  }

  & > header {
    background: var(--black-400);
    color: var(--white-100);
    font-size: 0.875rem;
    font-weight: bold;

    padding: 1.25rem;
  }

  div.menuContent {
    color: var(--white-100);

    > header {
      margin-top: 1rem;
      padding: 0.25rem 1rem;

      p {
        font-size: 0.75rem;
        font-weight: bold;
        color: var(--black-100);
      }
    }

    section {
      margin-top: 0.25rem;

      ul {
        cursor: pointer;

        li {
          display: none;
        }
      }

      ul.active {
        background: var(--black-400);

        > a {
          color: var(--success);
        }

        li.active > a {
          color: var(--success);
        }
      }

      ul.selected {
        li {
          display: block;
        }
      }
    }
  }
`;
export const Icon = styled(FontAwesomeIcon) <{ isOpen: boolean }>`
transition: transform 0.3s ease; /* Animação de transformação */
font-size: ${props => (props.isOpen ? '16px' : '24px')}; /* Tamanho do ícone */
`;
export const MenuButton = styled.button<{ isOpen: boolean }>`
height: 2rem;
background: var(--white-400);
  transition: left 0.3s ease;
  width: ${props => (props.isOpen ? '250px' : '60px')}; 
`;
export const SideContainer = styled.button<{ isOpen: boolean }>`

overflow: hidden;
width: ${props => (props.isOpen ? '250px' : '60px')}; 
`;


export const MenuItem = styled.a`
  display: flex;
  justify-content: center;
  height: 2rem;
  margin: 0.5;
  padding: 0 1rem;
  align-items: center;
  color: var(--white-400);
  font-size: 0.75rem;
  text-decoration: none;
  transition: color 0.2s;
  user-select: none;

  > svg {
    transition: transform 0.25s ease;
  }

  > div {
    flex: 1;

    small {
      margin-right: 1rem;
    }
  }

  &:hover {
    padding-left: calc(1rem + 2px);
    transition: padding 0.1s;

    color: var(--white-300);
  }

  &.selected {
    > svg {
      transform: rotate(90deg);
    }
  }
`;

export const SubMenuItem = styled.a`
  display: flex;
  height: 2rem;
  padding: 0 2.5rem;
  align-items: center;
  font-size: 0.625rem;
  color: var(--black-100);
  text-decoration: none;
  transition: color 0.2s;
  background: var(--black-300);

  &:hover {
    color: var(--white-100);
  }
`;
