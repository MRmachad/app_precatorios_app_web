import { useState } from "react"


import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Container, InputContainer, InputTitle } from "./styles"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string,
  icon?: string,
  placeholder?: string
}

export function Input({ title, placeholder, icon, ...props } : InputProps) {
  const [activated, setActivated] = useState<boolean>(false);

  const isDateInput = props.type === 'date';

  return (
    <Container>
      <InputTitle>
        {title}
        {(icon || isDateInput) && activated && (
          <small>
            {isDateInput ? <FontAwesomeIcon icon='calendar-alt' /> : <FontAwesomeIcon icon={icon as IconProp} />}
          </small>
        )}
      </InputTitle>
      <InputContainer $activated={activated}>
        <input {...props} placeholder={placeholder ? placeholder : title} onFocus={() => setActivated(true)} onBlur={() => setActivated(false)} />
        {icon && !isDateInput && <FontAwesomeIcon icon={icon as IconProp} /> }
      </InputContainer>
    </Container>
  )
}
