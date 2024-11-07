import styled from 'styled-components';


export const ProcessoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
  background: #f9f9f9;
  border-radius: 8px;
  width: 100%;
  margin: auto;
`;
export const HeaderContainer = styled.div`
  gap: 15px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
export const HeaderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  background: #fff;
`;

export const InfoCard = styled.div`
  display: flex;
  flex-direction: column;
  background: #fafafa;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const InfoTitle = styled.span`
  font-size: 13px;
  color: #777;
`;

export const NumeroTitle = styled.span`
  font-size: 18px;
  margin: 5px;
  color: #333333;
`;
export const HeaderTitle = styled.span`
  font-size: 15px;
  margin: 5px;
  color: #777;
`;

export const ActionButtonsContainer = styled.div`
margin: 1rem;
margin-top: 2rem;
display: flex;
justify-content: flex-end;
gap: 10px;
`;

export const ActionButton = styled.button<{download:boolean}>`
padding: 8px 12px;
font-size: 14px;
color: white;
background-color: ${(props) => (props.download ? "#28a745" : "#007bff")};
border: none;
border-radius: 4px;
cursor: pointer;
display: flex;
align-items: center;
gap: 6px;

&:hover {
  background-color: ${(props) => (props.download ? "#218838" : "#0069d9")};
}
`;

export const InfoValue = styled.span`
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  
  ul{
    list-style: none;

    li{
    }
  }
`;

export const MovimentacoesList = styled.div`
  margin-top: 20px;
`;

export const MovimentacaoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  span{
    width: 100%;
    justify-content: center;
  }
`;