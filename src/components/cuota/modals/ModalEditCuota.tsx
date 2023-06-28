import { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import React from 'react';
import { HelperRedux } from "../../../@redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { CuotaProps } from "../../../@redux/cuotas/types";
import { Actions } from "../../../@redux/cuotas";
import { Actions as ActionsAlumno } from "../../../@redux/alumno";
import { Actions as ActionsPrecioCuota} from "../../../@redux/precioCarrera";
import { updateCuotas } from "../../../domain/cuotas";
import { getAlumnos } from "../../../domain/alumnos";
import { getPrecioCarreras } from "../../../domain/precioCarreras";

const ModalEditCuota:React.FC<{cuota:CuotaProps}> = ({...props}) => {
    
    const [form, setForm] = useState<CuotaProps>({
        id: props.cuota.id,
        numero: props.cuota.numero,
        alumnoId: props.cuota.alumnoId,
        precioCuotaId: props.cuota.precioCuotaId,
        monto: props.cuota.monto,
        alumno: props.cuota.alumno
    });

    const { id } = form;
    const  dispatch = HelperRedux.useDispatch()
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const { alumnos, precioCarrera } = HelperRedux.useSelector((state) => state)

    useEffect(() => {
        setForm(form);
    }, []);

    React.useEffect(() => {
        const onError = () => alert('Se produjo un erorr.')
        getAlumnos().then(x => {
            dispatch(ActionsAlumno.setAlumnosStore(x.data.value))
        })
        .catch(onError)

        getPrecioCarreras().then(x => {
            dispatch(ActionsPrecioCuota.setPrecioCarrerasStore(x.data.value))
        })
        .catch(onError)

    }, [])
  
  const handleOpenModal = () => {
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // if (monto === 0 || ) {
        //   setErrorMsg('Todos los campos son obligatorios');
        //   return;
        // }
       
        setErrorMsg(null);
        updateCuotas(form.id, form.numero, form.alumnoId, form.precioCuotaId,).then((x) => {
          dispatch(Actions.updateCuotas({...form}, form.id));
        })
        
        .catch(error => {console.log(error)})
        .finally(() => {handleCloseModal()})
      };
      
    return (
        <>
             <Button 
                        variant="warning"
                        className='me-2'
                        onClick={() => {
                            handleOpenModal()
                        }}
                    >
                        <FontAwesomeIcon icon={faPen} />
              </Button>
            <Modal
                show={showModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className="modaltitle">
                    <Modal.Title>
                        Editar Precio Cuota
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                    <Form.Group className="mb-3">
                            <Form.Label>ID</Form.Label>
                            <Form.Control
                                type="id"
                                placeholder="id"
                                name="id"
                                value={id}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                    <Form.Label>Alumno</Form.Label>
                        <Form.Control
                        as={'select'}
                        name="alumnoId"
                        value={form.alumnoId}
                        onChange={handleChange}
                        onFocus={() => setErrorMsg(null)}
                        >
                        <option key={`option-carera-0`} value={0}>Seleccione...</option>
                        {alumnos.alumnos.map(x => <option key={`option-alumno-${x.id}`} value={x.id}>{`${x.apynom}`}</option>)}
                        </Form.Control>
                   </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Precio Cuota</Form.Label>
                    <Form.Control
                        as={'select'}
                        name="precioCuotaId"
                        value={form.precioCuotaId}
                        onChange={handleChange}
                        onFocus={() => setErrorMsg(null)}
                        >
                        <option key={`option-precio-cuota-0`} value={id}>Seleccione...</option>
                        {precioCarrera.precioCarreras.map(x => <option key={`option-precio-cuto-${x.id}`} value={x.id}>{`${x.id} - ${x.monto} $`}</option>)}
                     </Form.Control>
                </Form.Group>
                        <div>
                            {errorMsg && (<p className="error-msg">{errorMsg}</p>)}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" type="submit">
                            Guardar
                        </Button>
                        <Button variant="danger" onClick={handleCloseModal}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default ModalEditCuota;