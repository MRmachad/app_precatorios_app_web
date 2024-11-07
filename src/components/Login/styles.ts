import styled from "styled-components";

interface BackgroundContentProps {
  image: string;
}

export const Container = styled.div`
  display: flex;
`;

export const BackgroundContent = styled.div<BackgroundContentProps>`
  display: flex;
  flex: 1;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background: url(${props => props.image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% auto;

  @media screen and (max-width: 48rem) {
    display: none;
  }
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: var(--white-100);
  padding: 5rem 0;

  h3 {
    text-align: center;
    color: var(--gray-200);
  }
  

  @media screen and (min-width: calc(48rem + 1px)) {
    max-width: 30rem;
  }

  .logo-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;

    img {
      width: 10rem;
      height: auto;
    }
  }

  .login-form {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    padding: 2rem;

    input {
      height: 2.250rem;
    }

    hr {
      border-top: 0.5px;
      border-color: var(--white-400);
    }

    .options-form {
      display: flex;
      justify-content: center;
      align-items: center;

      a {
        text-decoration: none;
        font-size: 0.75rem;
        color: var(--black-200);

        &:hover {
          text-decoration: underline;
          color: var(--black-300);
        }
      }
    }
  }
`;