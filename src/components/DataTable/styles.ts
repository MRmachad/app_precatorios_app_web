import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;

  div.actions-containers{
    display: flex;
    flex-direction: row;

    .custom-buttons{
      padding-top: 0.8rem;
      display: flex;
      justify-content: flex-end;
      
      align-items: center;
      max-width: 50%;
      width: 100%;

      .container-action{
        margin: 5px;
      }

    }
  }

  .form-filter{  
    width: 50%;
  }
  
  div.filtro-container {
    flex: 1;
    width: 100%;
    display: flex;
    padding: 1rem 0;

    .filter-input {
      flex: 1;
      max-width: 30rem;
    }

    .button-container {
      display: flex;
      align-items: flex-end;
      justify-content: baseline;
    }
  }

  div.pagination-container {
    display: flex;
    justify-content: end;
    align-items: center;
    padding: 1rem 0;
    gap: 0.675rem;
    font-size: 0.875rem;

    button {
      padding: 0.125rem;
      width: 3rem;
      font-size: 0.875rem;
      border-radius: 5px;
      border: 0px;
    }
  }

  table {
    th.actions-col {
      width: 4rem;
    }

    td.actions-col {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }
  }
`;
