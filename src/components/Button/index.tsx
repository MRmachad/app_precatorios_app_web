import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ButtonContainer } from "./styles"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'warning' | 'danger' | 'success',
  size?: 'lg' | 'md' | 'sm',
  icon?: string, 
  title?: string,
  loading?: boolean
}

export function Button({ variant = 'default', size = 'md', loading = false, icon, title, ...props } : ButtonProps) {
  return (
    <ButtonContainer $variant={variant} $size={size} {...props} disabled={loading}>
      {!loading ? (
        <>
          {icon && <FontAwesomeIcon icon={icon as IconProp} /> }
          <p>{title}</p>
        </>
      ) : (
        <div className="loading">
          <FontAwesomeIcon icon='spinner' />
        </div>
      )}
    </ButtonContainer>
  )
}