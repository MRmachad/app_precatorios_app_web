import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "./styles";

export function Loading() {
  return (
    <Container>
      <FontAwesomeIcon icon='spinner' />
    </Container>
  )
}