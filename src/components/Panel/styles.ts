import styled from "styled-components";

export const PanelContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: var(--white-200);
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--black-400);
  padding: 0.475rem;
  border-radius: 8px 8px 0 0;
  font-size: .8125rem;
  color: var(--white-300);
  height: 2.125rem;

  svg {
    font-size: 0.625rem;
    margin-right: .425rem;
  }
`;

export const PanelBody = styled.div`
  flex: 1;
  padding: 0.475rem;
  background-color: var(--white-100);
  border-radius: 0 0 8px 8px;
`;