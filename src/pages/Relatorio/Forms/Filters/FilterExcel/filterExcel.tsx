import  { useState } from 'react';
import axios from 'axios';
import { Button, Container, Input, InputGroup, Label, Title } from './styles';

export const RelatorioPrecatorio = () => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleDownload = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/relatorio-precatorio', {
        params: {
          startDate,
          endDate,
        },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Relatorio_Precatorio_${startDate}_to_${endDate}.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading the file', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Baixar Relatório de Precatórios</Title>
      <InputGroup>
        <Label>Data de Início:</Label>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </InputGroup>
      <InputGroup>
        <Label>Data de Fim:</Label>
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </InputGroup>
      <Button onClick={handleDownload} disabled={loading} loading={loading}>
        {loading ? 'Baixando...' : 'Baixar Excel'}
      </Button>
    </Container>
  );
};
