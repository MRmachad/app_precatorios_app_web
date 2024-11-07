import { ReactNode } from "react";

import { PanelContainer, PanelHeader, PanelBody } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface PanelProps {
  title: string,
  icon?: string,
  children: ReactNode,
}

export function Panel({ title, icon, children } : PanelProps) {
  return (
    <PanelContainer>
      <PanelHeader>
        {icon && <FontAwesomeIcon icon={icon as IconProp} />}
        {title}
      </PanelHeader>
      <PanelBody>
        {children}
      </PanelBody>
    </PanelContainer>
  )
}