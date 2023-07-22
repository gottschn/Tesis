import React, { useState } from "react";

/** components */

/** styles */
import { HelperRedux } from "../../../@redux";
import { Button } from "react-bootstrap";
import { TextInput } from "../../../app/components/TextInput";
import { Actions } from "../../../@redux/empleado/actions";
import { getEmpleados } from "../../../domain/empleados";

/** redux */

const EmpleadoFilter: React.FC<{ onClosed: (isActive: boolean) => void }> = ({
  onClosed,
}) => {
  const dispatch = HelperRedux.useDispatch();
  const [apynom, setApynom] = useState("");
  const [areaTrabajo, setAreaTrabajo] = useState("");

  const handlerFilter = () => {
    dispatch(Actions.setFilterEmpleadosStore(apynom, areaTrabajo));
    onClosed(true);
  };

  const handlerClearFilter = () => {
    getEmpleados().then((x) => {
      dispatch(Actions.setEmpleadosStore(x.data.value));
    });
    dispatch(Actions.setFilterEmpleadosStore("", ""));
    setApynom("");
    setAreaTrabajo("");

    onClosed(false);
  };

  return (
    <div className="container-filter">
      <main>
        <TextInput
          value={apynom}
          onChange={(e) => setApynom(e.target.value)}
          label="Nombre y Apellido"
        />

        <TextInput
          value={areaTrabajo}
          onChange={(e) => setAreaTrabajo(e.target.value)}
          label="Area de Trabajo"
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

export default EmpleadoFilter;
