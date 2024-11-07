import { ReactNode } from "react"
import { APIResponseError } from "../../models/base/APIResponse"
import { ErrorsContainer, FormContainer } from "./styles"

interface FormProps extends React.ButtonHTMLAttributes<HTMLFormElement> {
  children: ReactNode,
  errors?: APIResponseError[] | null
}

export function Form({ children, errors = null, ...props } : FormProps) {
  return (
    <FormContainer {...props}>
      {children}

      {errors && errors.length > 0 && (
        <ErrorsContainer>
          <ul>
            {errors.map((err, index) => (
              <li key={index}>
                <label>• {err.mensagem}</label>
              </li>
            ))}
          </ul>
        </ErrorsContainer>
      )}
    </FormContainer>
  )
}