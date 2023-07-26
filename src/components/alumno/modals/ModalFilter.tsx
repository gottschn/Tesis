import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';

import { HelperRedux } from '../../../@redux';

import { Actions } from '../../../@redux/filtros';


import '../../../css/entities/carrera/carrera.css';
import { Button } from '@mui/material';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { getFiltros } from '../../../domain/filtros';

const ModalFilter = () => {

    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [clearModal, setClearModal] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handlerClearFilter = () => {
        setClearModal(true)
        handleCloseModal()
    }

    const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { fechaDeCorte } = e.currentTarget
         getFiltros(fechaDeCorte.value).then((x) => {
            alert('Se Filtro Correctamente.')
            window.location.reload()
        })
        .catch(error => {
            console.log('GetFiltro', error)

        })
        .finally(() => handlerClearFilter())
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
                    <Modal.Title>Exportacion de Alumnos</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handlerSubmit}>
                    <Modal.Body>
                    <Form.Group className="mb-3">
                            <Form.Label>Fecha de Corte</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Fecha de Corte"
                                name="fechaDeCorte"
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
                        type="submit">
                            Exportar Alumnos
                        </Button>
                        <Button variant="contained" color="error" onClick={handleCloseModal} >
                            Cancelar Exportacion
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default ModalFilter;