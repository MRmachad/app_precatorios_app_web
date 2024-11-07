import styled from "styled-components";

export const HomeContainer = styled.div`
  padding: 1.25rem;
`;

export const ModulosContainer = styled.div`
  &:not(:first-child) {
    margin-top: 2rem;
  }
`;

export const RecursosContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-template-columns: repeat(auto-fit, 100px);
  margin-top: 1.25rem;
  gap: 1rem;

  a {
    display: flex;
    flex-direction: column;
    background: var(--black-300);
    width: 18.75rem;
    height: 6.75rem;
    text-decoration: none;
    border-radius: 8px;
    overflow: hidden;

    header {
      p {
        font-size: 0.5rem;
        color: var(--black-100);
      }

      height: 2rem;
      padding: 0.5rem;
      border-bottom: 1px var(--white-500) solid;
    }

    div {
      display: flex;
      flex: 1;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      color: var(--white-300);

      span {
        font-size: 4rem;
        color: var(--white-500);
      }
    }
  }
`;
