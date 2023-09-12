import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";

import { HelperRedux } from "../../../@redux";

import { Actions } from "../../../@redux/alumno";

import "../../../css/entities/carrera/carrera.css";
import { Button } from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { addAlumnosMassivo } from "../../../domain/alumnos";
import Swal from "sweetalert2";

const ModalAddAlumnoMasivo = () => {
  const dispatch = HelperRedux.useDispatch();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(Actions.cleanAlumnosStore());
    };
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addAlumnosMassivo().then((x) =>
      Swal.fire({
        icon: "success",
        text: "Los Alumnos se importaron Correctamente.",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.reload();
      })
    );
  };
  const onConfirmMassiveCreate = () => dispatch(Actions.confirmAlumnosMasivo());

  return (
    <>
      <Button
        size="small"
        variant="contained"
        color="success"
        onClick={handleOpenModal}
      >
        <LibraryAddIcon />
        <>Importarcion Masiva Alumnos</>
      </Button>

      <Modal
        show={showModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="modaltitle testeo">
          <Modal.Title>Importacion Masiva de Alumnos</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handlerSubmit}>
          {/*        <Modal.Body>
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
                    </Modal.Body> */}
          <Modal.Footer>
            <Button
              variant="contained"
              color="success"
              onClick={onConfirmMassiveCreate}
              type="submit"
            >
              Añadir Importacion
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleCloseModal}
            >
              Cancelar Importacion
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddAlumnoMasivo;
