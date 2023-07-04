import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';

import { HelperRedux } from '../../../@redux';



import '../../../css/entities/carrera/carrera.css';
import { Button } from '@mui/material';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { addPagosMassivo } from '../../../domain/pagos';
import { Actions } from '../../../@redux/Pagos';

const ModalAddPagoMasivo = () => {

    const dispatch = HelperRedux.useDispatch()
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        
        addPagosMassivo().then(x => alert('todo bien'))
        
    }
    const onConfirmMassiveCreate = () => dispatch(Actions.confirmPagosMasivo())

    return (
        <>
            <Button
                size='small'
                variant="contained"
                color="success"
                onClick={(handleOpenModal)}
            >
                <RequestQuoteIcon />
                <span>Importacion Masiva Pagos</span>
            </Button>

            <Modal
                show={showModal}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className="modaltitle">
                    <Modal.Title>Importacion Masiva de Pagos</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handlerSubmit}>
                    <Modal.Body>
                        
                        <p> Hola</p>
                        <div>
                            {errorMsg && (<p className="error-msg">{errorMsg}</p>)}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                        variant="contained" 
                        color="success"
                        onClick={onConfirmMassiveCreate} 
                        type="submit">
                            Añadir Importacion
                        </Button>
                        <Button variant="contained" color="error" onClick={handleCloseModal} >
                            Cancelar Importacion
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default ModalAddPagoMasivo;