import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';

import { HelperRedux } from '../../../@redux';
import { getCarreras } from '../../../domain/carreras';

import { Actions } from '../../../@redux/alumno';
import { createAlumno } from '../../../domain/alumnos';


import { AlumnoProps } from '../../../@redux/alumno/types';
import { Actions as ActionsCarrera } from '../../../@redux/carreras';

import '../../../css/entities/carrera/carrera.css';
import { Button } from '@mui/material';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

let newDate = new Date()

const ModalAddPagoMasivo = () => {

   /*  const [form, setForm] = useState<AlumnoProps>({
        id: 0,

    }); */
    /* const { id, nombre, apellido, dni, legajo, direccion, mail, porcBeca, telefono, carrerasId } = form; */

    const dispatch = HelperRedux.useDispatch()
    const { alumnos, carreras } = HelperRedux.useSelector((state) => state)
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
/* 
        if (name === 'carrerasId') {
            setForm({
                ...form,
                [name]: [parseInt(value)],
            });
            return
        }
        setForm({
            ...form,
            [name]: value,
        }); */
    };
    useEffect(() => {
        if (showModal) {
            getCarreras()
                .then(x => dispatch(ActionsCarrera.setCarrerasStore(x.data.value)))
                .catch(() => alert('Se produjo un bardo'))
        }
    }, [showModal])
    useEffect(() => {
        /* const AlumnosModal = alumnos.alumnos.find((x) => x.id)
        if (AlumnosModal) setForm(AlumnosModal)
 */
    }, [])

    const handleSubmit = (e: any) => {
        e.preventDefault();

        setErrorMsg(null);
/* 
        createAlumno(form.nombre, form.apellido, form.dni, form.legajo, form.direccion,
            form.mail, form.porcBeca, form.telefono, form.carrerasId, form.fechaIngreso,).then((x) => {
                dispatch(Actions.createAlumnos({ ...form, id: x.data.value }));
            })
            .catch(error => { console.log(error, "Error ?") })
            .finally(() => { handleCloseModal() }) */
    };

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
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        
                        <p> Hola</p>
                        <div>
                            {errorMsg && (<p className="error-msg">{errorMsg}</p>)}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="contained" color="success" type="submit">
                            Añadir
                        </Button>
                        <Button variant="contained" color="error" onClick={handleCloseModal} >
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default ModalAddPagoMasivo;