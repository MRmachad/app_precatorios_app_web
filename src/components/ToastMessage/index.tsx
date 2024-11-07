interface ToastMessageProps {
  mensagem: string;
  titulo?: string;
}

export function ToastMessage({ mensagem, titulo }: ToastMessageProps) {
  return (
    <div>
      {titulo && <strong>{titulo}</strong>}
      {mensagem ? <p>{mensagem}</p> : ""}
    </div>
  );
}
