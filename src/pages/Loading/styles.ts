import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;

  svg {
    animation: rotateAnimation 2s linear infinite;
    color: var(--gray-200);
  }
`;