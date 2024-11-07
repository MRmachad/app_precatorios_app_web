import styled, { css, keyframes } from "styled-components";

interface AnimationProps {
  isToggle : boolean;
}

const toggleAnimation = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const BackgroundModal = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(0, 0, 0, 0.7);
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

export const ModalContent = styled.div<AnimationProps>`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 80rem;
  min-height: 10rem;
  background: var(--white-100);
  border-radius: 15px;
  overflow: hidden;

  ${(props) => props.isToggle && css`
    animation: ${toggleAnimation} 0.5s ease-in-out;
  `}
`;

export const ModalHeader = styled.div`
  display: flex;
  height: 3rem;
  padding: .5rem;
  background: var(--white-200);
  align-items: center;
  justify-content: space-between;

  h4 {
    font-weight: bold;
  }

  div.headerTitle {
    display: flex;
    align-items: center;
    gap: .5rem;
    color: var(--black-200);
  }

  button.closeButton {
    font-size: .75rem;
    color: var(--black-200);
    cursor: pointer;
    border: 0px;
    margin-right: .5rem;
  }
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-height: 500px;
  overflow-y: scroll;
  padding: 1rem;
`;