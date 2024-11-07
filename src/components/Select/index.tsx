import { useState } from "react";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, SelectContainer, SelectTitle } from "./styles";

interface SelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  title: string;
  icon?: string;
  options: { id: string; description: string }[];
}

export function Select({ title, options, icon, ...props }: SelectProps) {
  const [activated, setActivated] = useState<boolean>(false);

  const isDateInput = props.type === "date";

  return (
    <Container>
      <SelectTitle>
        {title}
        {(icon || isDateInput) && activated && (
          <small>
            {isDateInput ? (
              <FontAwesomeIcon icon="calendar-alt" />
            ) : (
              <FontAwesomeIcon icon={icon as IconProp} />
            )}
          </small>
        )}
      </SelectTitle>
      <SelectContainer $activated={activated}>
        <select
          {...props}
          onFocus={() => setActivated(true)}
          onBlur={() => setActivated(false)}
        >
          <option value={""}></option>
          {options.map((opt) => (
            <option key={`opt-${opt.id}`} value={opt.id}>
              {opt.description}
            </option>
          ))}
        </select>
      </SelectContainer>
    </Container>
  );
}
