import React from 'react'
import { ModalProps } from './types';
import { Modal as ModalDefault } from 'react-bootstrap';

const Modal: React.FC<ModalProps> = ({ onClosed = () => ({}), ...props}) => {
    return(
        <ModalDefault
            show={props.visible}
        >
            <>

                <ModalDefault.Header>
                </ModalDefault.Header>
                
                <ModalDefault.Body>
                    {props.children}
                </ModalDefault.Body>

                <ModalDefault.Footer>
                    
                </ModalDefault.Footer>
            </>
        </ModalDefault>
    )
}

export default Modal;