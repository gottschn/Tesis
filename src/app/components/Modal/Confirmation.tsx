import React from 'react';

import { ConfirmationProps } from './types';
import { Modal } from 'react-bootstrap';
import { Button } from '@mui/material';

const Confirmation: React.FunctionComponent<ConfirmationProps> = ({
    visible,
    title,
    message = "",
    onClickYes,
    onClickNo
}) => (
    <Modal
        show={visible}
        onClose={onClickNo}
    >
        <>
            <div className='d-flex align-items-center flex-column'>
               {/*  < color='red' size={3.5} />  aca habia un icono*/ }
                <h3 className='mt-4'>{title}</h3>
                <p className='mt-4'>{message}</p>
            </div>
            <div className='d-flex justify-content-center mt-4'>
                <Button  onClick={onClickNo} className='me-2' variant='contained'>Cancelar</Button>
                <Button  onClick={onClickYes}>Aceptar</Button>
            </div>
        </>
    </Modal>
);

export default Confirmation;