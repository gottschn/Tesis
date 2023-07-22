import React, { useEffect, useState } from 'react';

/* REDUX */
import { HelperRedux } from '../../../@redux';
import { Actions } from '../../../@redux/carreras/index'
import { CarrerasProps } from '../../../@redux/carreras/types';
/* Components */
import {  ModalConfirmation } from '../../../app/components/Modal';
import ModalAddCarrera from '../modals/ModalAddCarrera';
import CarreraFilter from './CarreraFilter';
import DataGrid from '../../../app/components/DataGrid';
/* icons */
import { deleteCarreras, getCarreras } from '../../../domain/carreras';
import Columns from './Carreras.json';
import moment from 'moment';
import ModalEditCarrera from '../modals/ModalEditCarrera';


const CarreraList: React.FC<{ carrera: CarrerasProps }> = () => {

    const dispatch = HelperRedux.useDispatch()
    const { carreras, filter } = HelperRedux.useSelector((state) => state.carreras)
    const [showModal, setShowModal] = useState(false);
    const [currentCarrera, setCurrentCarrera] = useState<CarrerasProps>({} as CarrerasProps);
    const [confirmationDelete, setConfirmationDelete] = useState({ visible: false, item: { id: 0 } })

    useEffect(() => {
        if (carreras.length === 0) { getInitial() }
    }, [])

    const getInitial = () => {
        getCarreras().then(x => { dispatch(Actions.setCarrerasStore(x.data.value)) })

    }

    const handlerDeleteNotification = () => {
        setConfirmationDelete({
            visible: false,
            item: { id: 0 }
        })
    }

    const handleDeleteCarrera = () => {
        const { id } = confirmationDelete.item

        setConfirmationDelete({
            visible: false,
            item: { id: 0 }
        })


        deleteCarreras(id).then(() => {
            dispatch(Actions.deleteCarreras(id))
        })
        .catch(error => console.log(error))
        window.location.reload()
    };

    return (
        <>

            <div className="row">
                <div className="col-6">
                    <h3>Listado de Carreras</h3>
                </div>

                <div className="col-6 d-flex justify-content-end mb-1">
                    <ModalAddCarrera />

                    <ModalEditCarrera visible={showModal} onClosedModal={() => setShowModal(false)} carrera={currentCarrera} />
                </div>
            </div>
            <DataGrid
                singlePagination={true}
                subTableName='details'
                pageSize={10}
                columns={Columns.carreras}
                onClickEdit={(row) => {
                    setCurrentCarrera(row)
                    setShowModal(true)
                }}
                onClickDelete={(row) => setConfirmationDelete({ visible: true, item: row })}

                rows={carreras.filter(x => x.descripcion.includes(filter.descripcion)).map(x => ({
                    ...x,
                    fecha: moment(x.fecha).format('YYYY-MM-DD'),
                    precioCarrera: `$ ${x.precioCarrera}`
                }),
                )}
                filterComponent={(onClosed) => <CarreraFilter onClosed={onClosed} />}
            />

            <ModalConfirmation
                title='¿Confirma baja del registro?'
                visible={confirmationDelete.visible}
                onClickYes={handleDeleteCarrera}
                onClickNo={handlerDeleteNotification} children={undefined}
            />

        </>
    );
};

export default CarreraList;