import React, { useState } from "react";

/** components */

/** styles */
import { HelperRedux } from "../../../@redux";
import { Actions } from "../../../@redux/precioCarrera";
import { getPrecioCarreras } from "../../../domain/precioCarreras";
import { Button } from "react-bootstrap";
import { TextInput } from "../../../app/components/TextInput";

const PrecioCarreraFilter: React.FC<{
  onClosed: (isActive: boolean) => void;
}> = ({ onClosed }) => {
  const dispatch = HelperRedux.useDispatch();
  const { filter } = HelperRedux.useSelector((state) => state.precioCarrera);
  const [ descripcion, setDescripcion] = useState('')


  const handlerClearFilter = () => {
    getPrecioCarreras().then((x) => {dispatch(Actions.setPrecioCarrerasStore(x.data.value));});
    dispatch(Actions.setPrecioCarrerasFilter(''));
    setDescripcion('')
    onClosed(false);
  };

  const handlerFilter = () => {
    dispatch(Actions.setPrecioCarrerasFilter(descripcion));

    onClosed(true);
  };

  return (
    <div className="container-filter" style={{ width: "280px" }}>
      <TextInput
        value={descripcion}
        onChange={(event) => setDescripcion(event.target.value)}
        label='Nombre de la Carrera'
      />
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

export default PrecioCarreraFilter;
