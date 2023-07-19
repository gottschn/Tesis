import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import React from "react";
import { PagosProps } from "../../../@redux/Pagos/types";
import { HelperRedux } from "../../../@redux";
import { updatePagos } from "../../../domain/pagos";
import { Actions } from "../../../@redux/Pagos";
import moment from "moment";

const ModalEditPago: React.FC<{
  pago: PagosProps;
  visible: boolean;
  onClosedModal: () => void;
}> = ({ ...props }) => {
  const [form, setForm] = useState<PagosProps>({} as PagosProps);

  const dispatch = HelperRedux.useDispatch();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    setForm(form);
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    setForm({
      id: props.pago.id,
      legajo: props.pago.legajo,
      monto: props.pago.monto,
      cantCuota: props.pago.cantCuota,
      nroRecibo: props.pago.nroRecibo,
      fechaCarga: props.pago.fechaCarga,
      fechaRecibo: props.pago.fechaRecibo,
    });
  }, [props.pago.id]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    updatePagos(
      form.id,
      form.legajo,
      form.monto,
      form.nroRecibo,
    )
      .then(() => {
        dispatch(Actions.updatePagos({ ...form }, form.id));
        alert("El Pago se Modifico con Exito.");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        props.onClosedModal();
      });
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
          <Modal.Title>Editar Pago de Cuota</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Legajo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Legajo"
                name="legajo"
                value={form.legajo}
                onChange={handleChange}
                onFocus={() => setErrorMsg(null)}
              />
            </Form.Group>
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
              <Form.Label>Numeros de Recibos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Numero de Recibo"
                name="nroRecibo"
                value={form.nroRecibo}
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

export default ModalEditPago;
