import styled from 'styled-components';

// Estilos para o container principal
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  width: 100%;
  margin: 50px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Estilo do título
export const Title = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
`;

// Estilo para o container dos campos de input
export const InputGroup = styled.div`
  margin-bottom: 15px;
  width: 100%;
`;

// Estilo dos labels
export const Label = styled.label`
  display: block;
  font-size: 1rem;
  color: #555;
  margin-bottom: 5px;
`;

// Estilo dos inputs de data
export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

// Estilo do botão
export const Button = styled.button<{ loading: boolean }>`
  width: 100%;
  padding: 10px;
  background-color: ${(props) => (props.loading ? '#888' : '#007bff')};
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.loading ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (!props.loading ? '#0056b3' : '#888')};
  }
`;
