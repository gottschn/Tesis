import React, { useEffect, useState } from 'react';

/* REDUX */
import { HelperRedux } from '../../../@redux';
import { Actions } from '../../../@redux/ciudad/actions';
/* Components */
import DataGrid from '../../../app/components/DataGrid';
/* icons */
import { deleteCiudades, getCiudades } from '../../../domain/ciudades';

import ModalAddCiudad from '../modals/ModalAddCiudad';
import CiudadFilter from './CiudadFilter';
import { CiudadesProps } from '../../../@redux/ciudad/types';
import ModalEditCiudad from '../modals/ModalEditCiudad';
import ModalDeleteCiudad from '../modals/ModalDeleteCiudad';
import Columns from './Ciudades.json';
import { ModalConfirmation } from '../../../app/components/Modal';


const CiudadList: React.FC<{ ciudad: CiudadesProps }> = ({ ...props }) => {

    const dispatch = HelperRedux.useDispatch()
    const { ciudades } = HelperRedux.useSelector((state) => state.ciudades)
    const [confirmationDelete, setConfirmationDelete] = useState({ visible: false, item: { id: 0 } })

    useEffect(() => {
        if (ciudades.length === 0) {
            getInitial()
        }
    }, [])

    const getInitial = () => {
        getCiudades().then(x => { dispatch(Actions.setCiudadesStore(x.data.value)) })

    }

    const handleDeleteCiudades = () => {
        const { id } = confirmationDelete.item

        setConfirmationDelete({
            visible: false,
            item: { id: 0 }
        })

        deleteCiudades(id).then(() => {
            dispatch(Actions.deleteCiudades(id))
        })
            .catch(error => console.log(error))
        window.location.reload()
    }

    const handlerDeleteNotification = () => {
        setConfirmationDelete({
            visible: false,
            item: { id: 0 }
        })
    }

    return (
        <>
            <div className="row">
                <div className="col-6">
                    <h3>Listado de Ciudades</h3>
                </div>

                <div className="col-6 d-flex justify-content-end mb-1">
                    <ModalAddCiudad />
                </div>
            </div>
            <DataGrid
                singlePagination={true}
                subTableName='details'
                pageSize={10}
                columns={Columns.ciudades}
                onClickEdit={(row) => { <ModalEditCiudad ciudad={props.ciudad} /> }}
                onClickDelete={(row) => setConfirmationDelete({ visible: true, item: row })}


                rows={ciudades.map(x => ({
                    ...x,
                }),
                )}
                filterComponent={(onClosedFilter) => <CiudadFilter onClosed={onClosedFilter} />}
            />
            <ModalConfirmation
                title='¿Confirma baja del registro?'
                visible={confirmationDelete.visible}
                onClickYes={handleDeleteCiudades}
                onClickNo={handlerDeleteNotification} children={undefined}
            />
        </>
    );
};

export default CiudadList;