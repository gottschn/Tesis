import React, { useState } from "react";

/** components */

/** styles */
import { HelperRedux } from "../../../@redux";

import { Button } from "react-bootstrap";
import { TextInput } from "../../../app/components/TextInput";
import { Actions } from "../../../@redux/usuario/actions";
import { getUsuarios } from "../../../domain/usuarios";

/** redux */

const UsuarioFilter: React.FC<{ onClosed: (isActive: boolean) => void }> = ({
  onClosed,
}) => {
  const dispatch = HelperRedux.useDispatch();
  const [nombre, setNombre] = useState("");

  const handlerFilter = () => {
    dispatch(Actions.setFilterUsuariosStore(nombre));
    onClosed(true);
  };

  const handlerClearFilter = () => {
    getUsuarios().then((x) => {
      dispatch(Actions.setUsuariosStore(x.data.value));
    });
    dispatch(Actions.setFilterUsuariosStore(""));
    setNombre("");
    onClosed(false);
  };

  return (
    <div className="container-filter">
      <main>
        <TextInput
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          label="Nombre"
        />
      </main>

      <footer className="d-flex justify-content-between mt-3">
        <div className="d-flex">
          <Button
            className="btn mx-1"
            title="Limpiar"
            onClick={handlerClearFilter}
            variant="outline-danger"
          >
            Limpiar
          </Button>

          <Button
            className="btn mx-5"
            title="Aplicar"
            variant="outline-success"
            onClick={handlerFilter}
          >
            Aplicar
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default UsuarioFilter;
