import { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import React from "react";
import { HelperRedux } from "../../../@redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import { updateEmpleado } from "../../../domain/empleados";
import { EmpleadosProps } from "../../../@redux/empleado/types";

import { Actions as ActionsExtensiones } from "../../../@redux/extension";
import { Actions as ActionsCiudades } from "../../../@redux/ciudad";
import { Actions } from "../../../@redux/empleado/actions";
import { getCiudades } from "../../../domain/ciudades";
import { getExtensiones } from "../../../domain/extensiones";
import moment from "moment";

const ModalEditEmpleado: React.FC<{
  empleado: EmpleadosProps;
  visible: boolean;
  onClosedModal: () => void;
}> = ({ ...props }) => {
  const [form, setForm] = useState<EmpleadosProps>({} as EmpleadosProps);

  const dispatch = HelperRedux.useDispatch();
  const { extensiones, ciudades } = HelperRedux.useSelector((state) => state);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "ciudadId") {
      setForm({
        ...form,
        [name]: parseInt(value),
      });
      return;
    }
    if (name === "extensionId") {
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
    getCiudades()
      .then((x) => dispatch(ActionsCiudades.setCiudadesStore(x.data.value)))
      .catch(() => alert("Se produjo un bardo"));

    getExtensiones()
      .then((x) =>
        dispatch(ActionsExtensiones.setExtensionesStore(x.data.value))
      )
      .catch(() => alert("Se produjo un bardo"));
  }, []);

  useEffect(() => {
    setForm({
      id: props.empleado.id,
      apynom: props.empleado.apynom,
      tipoDoc: props.empleado.tipoDoc,
      nroDoc: props.empleado.nroDoc,
      fechaNacimiento: props.empleado.fechaNacimiento,
      direccion: props.empleado.direccion,
      telefono: props.empleado.telefono,
      mail: props.empleado.mail,
      extensionId: props.empleado.extensionId,
      extension: props.empleado.extension,
      ciudadId: props.empleado.ciudadId,
      ciudad: props.empleado.ciudad,
      codigoPostal: props.empleado.codigoPostal,
      areaTrabajo: props.empleado.areaTrabajo,
    });
  }, [props.empleado.id]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    updateEmpleado(
      form.id,
      form.apynom,
      form.tipoDoc,
      form.nroDoc,
      form.fechaNacimiento,
      form.direccion,
      form.telefono,
      form.mail,
      form.areaTrabajo,
      form.ciudadId,
      form.extensionId
    )
      .then(() => {
        dispatch(Actions.updateEmpleados({ ...form }, form.id));
        alert("El Empleado se Modifico con Exito.");
      })
      .catch((error) => console.log(error, "Error"))
      /* .finally(() => props.onClosedModal()); */
  };

  return (
    <>
      <Modal
        show={props.visible}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="modaltitle">
          <Modal.Title>Editar Empleado</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nombre y Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre y Apellido"
                name="apynom"
                value={form.apynom}
                onChange={handleChange}
                onFocus={() => setErrorMsg(null)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de Documento</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tipo de Documento"
                name="tipoDoc"
                value={form.tipoDoc}
                onChange={handleChange}
                onFocus={() => setErrorMsg(null)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Numero de Documento</Form.Label>
              <Form.Control
                type="text"
                placeholder="Numero de Documento"
                name="nroDoc"
                value={form.nroDoc}
                onChange={handleChange}
                onFocus={() => setErrorMsg(null)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control
                type="date"
                placeholder="Fecha de Nacimiento"
                name="fechaNacimiento"
                value={moment(form.fechaNacimiento).format("YYYY-MM-DD")}
                onChange={handleChange}
                onFocus={() => setErrorMsg(null)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Direccion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Direccion"
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                onFocus={() => setErrorMsg(null)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="text"
                placeholder="Telefono"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                onFocus={() => setErrorMsg(null)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mail</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mail"
                name="mail"
                value={form.mail}
                onChange={handleChange}
                onFocus={() => setErrorMsg(null)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Extension</Form.Label>
              <Form.Control
                as={"select"}
                multiple={false}
                name="extensionId"
                value={form.extensionId}
                onChange={handleChange}
                onFocus={() => setErrorMsg(null)}
              >
                <option key={`option-carera-0`} value={0}>
                  Seleccione...
                </option>
                {extensiones.extensiones.map((x) => (
                  <option key={`option-extensiones-${x.id}`} value={x.id}>
                    {x.descripcion}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                as={"select"}
                multiple={false}
                name="ciudadId"
                value={form.ciudadId}
                onChange={handleChange}
                onFocus={() => setErrorMsg(null)}
              >
                <option key={`option-carera-0`} value={0}>
                  Seleccione...
                </option>
                {ciudades.ciudades.map((x) => (
                  <option key={`option-ciudades-${x.id}`} value={x.id}>
                    {x.descripcion}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Codigo Postal</Form.Label>
              <Form.Control
                type="text"
                placeholder="Codigo Postal"
                name="codigoPostal"
                value={form.codigoPostal}
                onChange={handleChange}
                onFocus={() => setErrorMsg(null)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Area de Trabajo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Area de Trabajo"
                name="areaTrabajo"
                value={form.areaTrabajo}
                onChange={handleChange}
                onFocus={() => setErrorMsg(null)}
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

export default ModalEditEmpleado;
