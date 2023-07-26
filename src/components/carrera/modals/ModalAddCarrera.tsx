import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import "../../../css/entities/carrera/carrera.css";
import { HelperRedux } from "../../../@redux";
import { Actions } from "../../../@redux/carreras";
import { CarrerasProps } from "../../../@redux/carreras/types";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { createCarreras } from "../../../domain/carreras";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

const ModalAddCarrera = () => {
  const [form, setForm] = useState<CarrerasProps>({
    id: 0,
    descripcion: "",
    cantCuotas: 0,
    precioCarrera: 0,
    fecha: "",
  });

  const dispatch = HelperRedux.useDispatch();
  const { carreras } = HelperRedux.useSelector((state) => state.carreras);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [clearModal, setClearModal] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const carrerasModal = carreras.find((x) => x.id);
    if (carrerasModal) setForm(carrerasModal);
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handlerClearFilter = () => {
    setClearModal(true);
    handleCloseModal();
    setForm({
      id: 0,
      descripcion: '',
      cantCuotas: 0,
      precioCarrera: 0,
      fecha: "",
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (form.descripcion === "" || !form.cantCuotas) {
      setErrorMsg("Todos los campos son obligatorios");
      return;
    }
    setErrorMsg(null);
    createCarreras(form.descripcion, form.cantCuotas)
      .then((x) => {
        dispatch(Actions.createCarreras({ ...form, id: x.data.value }));
        Swal.fire({
          icon: 'success',
          text: 'La carrera se registro con exito.',
          showConfirmButton: false,
          timer: 1500, 
        }).then(() => {
          window.location.reload()
        })
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        handlerClearFilter();
      });
  };

  return (
    <>
      <Button
        size="small"
        variant="contained"
        color="success"
        onClick={handleOpenModal}
      >
        <AddCircleIcon />
        <span>Agregar Carrera</span>
      </Button>

      <Modal
        show={showModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="modaltitle title">
          <Modal.Title>Agregar carrera</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nombre De la Carrera </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                onFocus={() => setErrorMsg(null)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cantidad Cuotas</Form.Label>
              <Form.Control
                type="text"
                placeholder="Cantidad de cuotas"
                name="cantCuotas"
                value={form.cantCuotas}
                onChange={handleChange}
                onFocus={() => setErrorMsg(null)}
              />
            </Form.Group>
            <div>{errorMsg && <p className="error">{errorMsg}</p>}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="contained" color="success" type="submit">
              Añadir
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleCloseModal}
            >
              Cancelar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddCarrera;
