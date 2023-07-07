import React, { useEffect, useState } from 'react';
/* REDUX */
import { HelperRedux } from '../../../@redux';
import { PrecioCarreraProps } from '../../../@redux/precioCarrera/types';
import { Actions } from '../../../@redux/precioCarrera';

/* Components */
import PrecioCarreraFilter from './PrecioCarreraFilter';
import { ModalConfirmation } from '../../../app/components/Modal';
import ModalAddPrecioCarrera from '../modals/ModalAddPrecioCarrera';
import ModalEditPrecioCarrera from '../modals/ModalEditPrecioCarrera';
import DataGrid from '../../../app/components/DataGrid';

import { deletePrecioCarreras, getPrecioCarreras } from '../../../domain/precioCarreras';
import Columns from './PrecioCarreras.json';
import moment from 'moment';


const PrecioCarreraList: React.FC<{ precioCarrera: PrecioCarreraProps }> = ({ ...props }) => {
    const dispatch = HelperRedux.useDispatch()
    const { precioCarreras } = HelperRedux.useSelector((state) => state.precioCarrera)
    const [confirmationDelete, setConfirmationDelete] = useState({ visible: false, item: { id: 0 } })
    
    useEffect(() => {
        if (precioCarreras.length === 0) {
            getInitial()
        }
    }, [])

    const getInitial = () => {
        getPrecioCarreras().then(x => { dispatch(Actions.setPrecioCarrerasStore(x.data.value)) })

    }

    const handleDeletePrecioCarrera = () => {
        const { id } = confirmationDelete.item

        setConfirmationDelete({
            visible: false,
            item: { id: 0 }
        })

        deletePrecioCarreras(id).then(() => {
            dispatch(Actions.deletePrecioCarreras(id))
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
                    <h3>Precio de las Carreras</h3>
                </div>

                <div className="col-6 d-flex justify-content-end mb-1">
                    <ModalAddPrecioCarrera />
                </div>
            </div>
            <DataGrid
                singlePagination={true}
                subTableName='details'
                pageSize={10}
                columns={Columns.precioCarreras}
                onClickEdit={(row) => { <ModalEditPrecioCarrera precioCuota={props.precioCarrera} /> }}
                onClickDelete={(row) => setConfirmationDelete({ visible: true, item: row })}

                rows={precioCarreras.map(x => ({
                    ...x,
                    fecha:moment(x.fecha).format('YYYY-MM-DD'),
                    monto: `$ ${x.monto}` 
                }),
                )}
                filterComponent={(onClosedFilter) => <PrecioCarreraFilter onClosed={onClosedFilter} />}
            />

            <ModalConfirmation
                title='¿Confirma baja del registro?'
                visible={confirmationDelete.visible}
                onClickYes={handleDeletePrecioCarrera}
                onClickNo={handlerDeleteNotification} children={undefined}
            />

        </>
    );
};

export default PrecioCarreraList;