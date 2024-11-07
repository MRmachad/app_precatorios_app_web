import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ErrorsContainer = styled.div`
  padding: 0 1rem;
  
  ul {
    background: var(--red-100);
    color: var(--danger);
    border: 1px solid var(--red-300);
    border-radius: 10px;    
    padding: 0.3125rem;
    overflow-y: scroll;
    max-height: 10rem;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: nome;
    }

    li {
      display: flex;
      flex-direction: column;
      font-size: .75rem;

      label {
        margin: .625rem 0;
        margin-left: .5rem;
      }
    }
  }
`;