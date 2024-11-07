import styled from "styled-components";

interface ButtonContainerProps {
  $variant: "default" | "warning" | "danger" | "success";
  $size: "lg" | "md" | "sm";
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  color: var(--white-400);
  cursor: pointer;
  border: none;
  min-width: 1.5rem;
  text-align: center;

  p:not(:empty) {
    margin-left: 0.5rem;
  }

  .loading {
    svg {
      animation: rotateAnimation 2s linear infinite;
    }
  }

  font-size: ${(props) => () => {
    if (props.$size === "lg") {
      return `1.25rem`;
    } else if (props.$size === "sm") {
      return ".75rem";
    }

    return "1rem";
  }};

  background: ${(props) => () => {
    if (props.$variant !== "default") {
      return `var(--${props.$variant})`;
    }

    return "var(--black-300)";
  }};

  svg {
    font-size: ${(props) => () => {
      if (props.$size === "lg") {
        return `1rem`;
      } else if (props.$size === "sm") {
        return ".5rem";
      }

      return ".75rem";
    }};
  }

  &:hover {
    background: ${(props) => {
      if (props.$variant !== "default") {
        return `var(--${props.$variant}-hover)`;
      }
      return "var(--black-400)";
    }};

    color: var(--white-100);
  }

  &:disabled {
    cursor: auto;
  }
`;
