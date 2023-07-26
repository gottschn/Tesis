import React, { useEffect, useState } from "react";

/* REDUX */
import { ExtensionProps } from "../../../@redux/extension/types";
import { HelperRedux } from "../../../@redux";
import { Actions } from "../../../@redux/extension";
import { deleteExtensiones, getExtensiones } from "../../../domain/extensiones";
/* Components */
import DataGrid from "../../../app/components/DataGrid";
import ExtensionFilter from "./ExtensionFilter";
import ModalAddExtension from "../modals/ModalAddExtension";
import ModalEditExtension from "../modals/ModalEditExtension";
/* icons */
import Columns from "./Extension.json";
import { ModalConfirmation } from "../../../app/components/Modal";
import Swal from "sweetalert2";

const ExtensionList: React.FC<{ extension: ExtensionProps }> = ({
  ...props
}) => {
  const dispatch = HelperRedux.useDispatch();
  const { extensiones, filter } = HelperRedux.useSelector(
    (state) => state.extensiones
  );
  const [currentExtension, setCurrentExtension] = useState<ExtensionProps>(
    {} as ExtensionProps
  );
  const [confirmationDelete, setConfirmationDelete] = useState({
    visible: false,
    item: { id: 0 },
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (extensiones.length === 0) {
      getInitial();
    }
  }, []);

  const getInitial = () => {
    getExtensiones().then((x) => {
      dispatch(Actions.setExtensionesStore(x.data.value));
    });
  };

  const handleDeleteExtensiones = () => {
    const { id } = confirmationDelete.item;

    setConfirmationDelete({
      visible: false,
      item: { id: 0 },
    });

    deleteExtensiones(id)
      .then(() => {
        dispatch(Actions.deleteExtensiones(id));
      })
      .catch((error) => console.log(error))
      .catch((error) => console.log(error));
    Swal.fire({
      icon: "success",
      text: "La Extension se elimino con exito.",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      window.location.reload();
    });
  };

  const handlerDeleteNotification = () => {
    setConfirmationDelete({
      visible: false,
      item: { id: 0 },
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-6">
          <h3>Listado de Extensiones</h3>
        </div>

        <div className="col-6 d-flex justify-content-end mb-1">
          <ModalAddExtension />
          <ModalEditExtension
            visible={showModal}
            onClosedModal={() => setShowModal(false)}
            extension={currentExtension}
          />
        </div>
      </div>
      <DataGrid
        singlePagination={true}
        subTableName="details"
        pageSize={10}
        columns={Columns.extension}
        onClickEdit={(row) => {
          setCurrentExtension(row);
          setShowModal(true);
        }}
        onClickDelete={(row) =>
          setConfirmationDelete({ visible: true, item: row })
        }
        rows={extensiones
          .filter((x) => x.descripcion.includes(filter.descripcion))
          .map((x) => ({
            ...x,
          }))}
        filterComponent={(onClosedFilter) => (
          <ExtensionFilter onClosed={onClosedFilter} />
        )}
      />

      <ModalConfirmation
        title="¿Confirma baja del registro?"
        visible={confirmationDelete.visible}
        onClickYes={handleDeleteExtensiones}
        onClickNo={handlerDeleteNotification}
        children={undefined}
      />
    </>
  );
};

export default ExtensionList;
