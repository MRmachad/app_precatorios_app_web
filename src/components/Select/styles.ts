import styled from "styled-components";

interface InputContainerProps {
  $activated: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SelectTitle = styled.label`
  margin: 0 .125rem;
  font-size: 0.725rem;
  font-weight: bold;
  color: var(--black-200);

  small {
    margin-left: .425rem;
    font-size: .625rem;
  }
`;

export const SelectContainer = styled.div<InputContainerProps>`
    flex: 1;
    display: flex;
    align-items: center;
    margin-top: .425rem;

    transition: margin .25s;

    &:focus-within {
      svg {
        visibility: hidden;
        opacity: 0;
      }
    }

    select {
      flex: 1;
      height: 2.125rem;
      background-color: var(--white-100);
      color: var(--black-200);
      padding: 0 0.875rem;
      border-radius: 8px;
      font-size: 0.75rem;    
      border: 1px solid var(--white-400);

      &::-webkit-input-placeholder {
        color: transparent;
      }

      &:focus {
        outline: transparent;

        &::-webkit-input-placeholder {
          color: var(--black-100);
        }
      }

      &:disabled {
        color: var(--black-100)
      }
    }
`;