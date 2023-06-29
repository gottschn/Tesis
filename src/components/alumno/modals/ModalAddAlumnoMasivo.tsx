import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';

import { HelperRedux } from '../../../@redux';

import { Actions } from '../../../@redux/alumno';


import '../../../css/entities/carrera/carrera.css';
import { Button } from '@mui/material';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { addAlumnosMassivo } from '../../../domain/alumnos';

const ModalAddAlumnoMasivo = () => {

    const dispatch = HelperRedux.useDispatch()
    const { alumnos } = HelperRedux.useSelector((state) => state)
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const isVisualize = alumnos.alumnos.length > 0

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        return () => {
            dispatch(Actions.cleanAlumnosStore())
        }
    }, [])

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        
        addAlumnosMassivo().then(x => alert('todo bien'))
        // dispatch(Actions.addAlumnosMasivo())
    }
    const onConfirmMassiveCreate = () => dispatch(Actions.confirmAlumnosMasivo())

    return (
        <>
            <Button
                size='small'
                variant="contained"
                color="success"
                onClick={(handleOpenModal)}
            >
                <LibraryAddIcon />
                <span>Importarcion Masiva Alumnos</span>
            </Button>

            <Modal
                show={showModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className="modaltitle">
                    <Modal.Title>Agregar Importacion Masiva</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handlerSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Archivo</Form.Label>
                            <Form.Control
                                type="file"
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

export default ModalAddAlumnoMasivo;