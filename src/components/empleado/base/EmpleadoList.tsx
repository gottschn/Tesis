import React, { useState } from 'react';
import { useEffect } from 'react';


import { HelperRedux } from '../../../@redux';
import DataGrid from '../../../app/components/DataGrid';
import Columns from './Empleado.json';
import '../../../app/components/GlobalStyles/css/GlobalStyle.css'
import EmpleadoFilter from './EmpleadoFilter';
import { Actions } from '../../../@redux/empleado/actions';
import { deleteEmpleado, getEmpleados } from '../../../domain/empleados';
import { EmpleadosProps } from '../../../@redux/empleado/types';
import ModalAddEmpleado from '../modals/ModalAddEmpleado';
import moment from 'moment';
import { ModalConfirmation } from '../../../app/components/Modal';
import ModalEditEmpleado from '../modals/ModalEditEmpleado';

const EmpleadoList: React.FC<{ empleados: EmpleadosProps }> = ({ ...props }) => {

    const dispatch = HelperRedux.useDispatch()
    const { empleados } = HelperRedux.useSelector((state) => state.empleados)
    const [currentEmpleado, setCurrentEmpleado] = useState<EmpleadosProps>({} as EmpleadosProps);
    const [confirmationDelete, setConfirmationDelete] = useState({ visible: false, item: { id: 0 } })
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (empleados.length === 0)
            getInitial();
    }, [])

    const getInitial = () => {
        getEmpleados().then(x => { dispatch(Actions.setEmpleadosStore(x.data.value)) })

    }

    const handleDeleteEmpleado = () => {
        const { id } = confirmationDelete.item

        setConfirmationDelete({
            visible: false,
            item: { id: 0 }
        })

        deleteEmpleado(id).then(() => {
            dispatch(Actions.deleteEmpleados(id))
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
            <div className="modalMain">
                <div className="">
                    <h3>Listado de Empleados</h3>
                </div>

                <div className="">
                    <ModalAddEmpleado />
                    <ModalEditEmpleado visible={showModal} onClosedModal={() => setShowModal(false)} empleado={currentEmpleado} />
                </div>
            </div>

            <DataGrid
                singlePagination={true}
                subTableName='details'
                pageSize={10}
                columns={Columns.empleados}
                 onClickEdit={(row) => { 
                    setCurrentEmpleado(row)
                    setShowModal(true)
                 }}
                onClickDelete={(row) => setConfirmationDelete({ visible: true, item: row })}

                rows={empleados.map(x => ({
                    ...x,
                    fechaNacimiento: moment(x.fechaNacimiento).format("YYYY-MM-DD"),
                }),
                )}
                filterComponent={(onClosedFilter) => <EmpleadoFilter onClosed={onClosedFilter} />}
            />

            <ModalConfirmation
                title='¿Confirma baja del registro?'
                visible={confirmationDelete.visible}
                onClickYes={handleDeleteEmpleado}
                onClickNo={handlerDeleteNotification} children={undefined}
            />
        </>
    );
};

export default EmpleadoList;