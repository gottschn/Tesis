import { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import React from "react";
import { HelperRedux } from "../../../@redux";
import { PrecioCarreraProps } from "../../../@redux/precioCarrera/types";
import { updatePrecioCarreras } from "../../../domain/precioCarreras";
import { Actions } from "../../../@redux/precioCarrera";
import { Actions as ActionsCarrera } from "../../../@redux/carreras";
import { getCarreras } from "../../../domain/carreras";
import moment from "moment";
import Swal from "sweetalert2";

const ModalEditPrecioCarrera: React.FC<{
  precioCarrera: PrecioCarreraProps;
  visible: boolean;
  onClosedModal: () => void;
}> = ({ ...props }) => {
  const [form, setForm] = useState<PrecioCarreraProps>(
    {} as PrecioCarreraProps
  );

  const dispatch = HelperRedux.useDispatch();
  const { carreras } = HelperRedux.useSelector((state) => state);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "carreraId") {
      setForm({
        ...form,
        [name]: parseInt(value),
      });
      return;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    getCarreras()
      .then((x) => dispatch(ActionsCarrera.setCarrerasStore(x.data.value)))
      .catch(() => alert("Se produjo un bardo"));
  }, []);

  useEffect(() => {
    setForm({
      id: props.precioCarrera.id,
      monto: props.precioCarrera.monto,
      matricula: props.precioCarrera.matricula,
      fecha: props.precioCarrera.fecha,
      carreraId: props.precioCarrera.carreraId,
      carrera: props.precioCarrera.carrera,
    });
  }, [props.precioCarrera.id]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    updatePrecioCarreras(
      form.id,
      form.monto,
      form.matricula,
      form.fecha,
      form.carreraId
    )
      .then(() => {
        dispatch(Actions.updatePrecioCarreras({ ...form }, form.id));
        Swal.fire({
          icon: "success",
          text: "El Precio de la Carrera se modifico con exito.",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => console.log(error))
      .finally(() => props.onClosedModal());
  };

  return (
    <>
      <Modal
        show={props.visible}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="modaltitle">
          <Modal.Title>Editar Precio Carrera</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Monto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Monto"
                name="monto"
                value={form.monto}
                onChange={handleChange}
                onFocus={() => setErrorMsg(null)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Matricula</Form.Label>
              <Form.Control
                type="text"
                placeholder="Matricula"
                name="matricula"
                value={form.matricula}
                onChange={handleChange}
                onFocus={() => setErrorMsg(null)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Carrera</Form.Label>
              <Form.Control
                as={"select"}
                multiple={false}
                name="carreraId"
                value={form.carreraId}
                onChange={handleChange}
              >
                <option key={`option-carera-0`} value={0}>
                  Seleccione...
                </option>
                {carreras.carreras.map((x) => (
                  <option key={`option-carera-${x.id}`} value={x.id}>
                    {x.descripcion}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                placeholder="Fecha"
                name="fecha"
                value={moment(form.fecha).format("YYYY-MM-DD")}
                onChange={handleChange}
              />
            </Form.Group>
            <div>{errorMsg && <p className="error-msg">{errorMsg}</p>}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit">
              Guardar
            </Button>
            <Button variant="danger" onClick={props.onClosedModal}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ModalEditPrecioCarrera;
