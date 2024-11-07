import { ReactNode } from "react";

import { BackgroundModal, ModalBody, ModalContainer, ModalContent, ModalHeader } from './styles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface ModalProps {
  title: string,
  icon?: string,
  isOpen: boolean,
  onCloseModal: () => void,
  children: ReactNode
}

export function Modal({ title, icon, isOpen, onCloseModal, children } : ModalProps) {
  if(isOpen) {
    return (
      <BackgroundModal>
        <ModalContainer>
          <ModalContent isToggle={isOpen}>
            <ModalHeader>
              <div className="headerTitle">
                {icon && <FontAwesomeIcon icon={icon as IconProp} />}
                <h4>{title}</h4>
              </div>
              <button className="closeButton"><FontAwesomeIcon icon='x' onClick={onCloseModal} /></button>
            </ModalHeader>            
            <ModalBody>
              {children}
            </ModalBody>
          </ModalContent>          
        </ModalContainer>
      </BackgroundModal>
    )
  }

  return null;
}