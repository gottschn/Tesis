import React from 'react';

import { ConfirmationProps } from './types';
import { Modal } from 'react-bootstrap';
import { Button } from '@mui/material';
import './style.css'
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
        centered
    >
        <Modal.Header className='modaltitle'>
            <Modal.Title>
                {title}
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <h6>El registro será borrado de forma permanente.</h6>
            
        </Modal.Body>

        <Modal.Footer>
            <Button onClick={onClickYes} variant='contained' color='error'>Aceptar</Button>
            <Button onClick={onClickNo} variant='contained' color='secondary' >Cancelar</Button>
        </Modal.Footer>
    </Modal>
);

export default Confirmation;



{/* <Modal
show={visible}
onClose={onClickNo}
>
<>
    <div className='d-flex align-items-center flex-column'>
    
    <Typography className='modaltitle' id="transition-modal-title" variant="h5" component="h2">
       {title}
    </Typography>
        <Typography className='mt-2'>{message}</Typography> 
        <DeleteForeverIcon sx={{ color: red[500], fontSize: 60 }} />
    </div>
    <div className='d-flex justify-content-center mt-4'>
        <Button  onClick={onClickYes} variant='contained' color='error'>Aceptar</Button>
        <div> <Button  onClick={onClickNo}  variant='contained' color='secondary' >Cancelar</Button></div>
    </div>
</>
</Modal> */}