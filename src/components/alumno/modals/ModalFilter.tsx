import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';

import { HelperRedux } from '../../../@redux';

import { Actions } from '../../../@redux/filtros';


import '../../../css/entities/carrera/carrera.css';
import { Button } from '@mui/material';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { getFiltros } from '../../../domain/filtros';

const ModalFilter = () => {

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
         /* getFiltros().then(x => alert('todo bien')) */
    }

    return (
        <>
            <Button
                size='small'
                variant="contained"
                color="success"
                onClick={(handleOpenModal)}
            >
                <LibraryAddIcon />
                <span>Exportacion Alumnos</span>
            </Button>

            <Modal
                show={showModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className="modaltitle">
                    <Modal.Title>Filtros Alumnos</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handlerSubmit}>
                    <Modal.Body>
                    <Form.Group className="mb-3">
                            <Form.Label>Fecha de Corte</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Fecha de Corte"
                                name="fechaDeCorte"
                                /* value={moment(form.fechaNacimiento).format('YYYY-MM-DD')} */
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <div>
                            {errorMsg && (<p className="error-msg">{errorMsg}</p>)}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                        variant="contained" 
                        color="success"
                        /* onClick={onConfirmMassiveCreate}  */
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

export default ModalFilter;