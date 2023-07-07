import React, { useState } from 'react';
import { useEffect } from 'react';


import { HelperRedux } from '../../../@redux';
import { deleteAlumno, getAlumnos } from '../../../domain/alumnos';
import { Actions } from '../../../@redux/alumno';
import ModalAddAlumno from '../modals/ModalAddAlumno';
import { AlumnoProps } from '../../../@redux/alumno/types';
import DataGrid from '../../../app/components/DataGrid';
import Columns from './Alumno.json';
import ModalEditAlumno from '../modals/ModalEditAlumno';
import ModalDeleteAlumno from '../modals/ModalDeleteAlumno';
import AlumnoFilter from './AlumnoFilter';
import '../../../app/components/GlobalStyles/css/GlobalStyle.css'
import ModalAddAlumnoMasivo from '../modals/ModalAddAlumnoMasivo';
import { ModalConfirmation } from '../../../app/components/Modal';
import moment from 'moment';

const AlumnoList: React.FC<{ alumno: AlumnoProps }> = ({ ...props }) => { 

    const dispatch = HelperRedux.useDispatch()
    const { alumnos } = HelperRedux.useSelector((state) => state.alumnos)
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [confirmationDelete, setConfirmationDelete] = useState({ visible: false, item: { id: 0 } })

    useEffect(() => {
        if (alumnos.length === 0)
            getInitial();
    }, [])

    const getInitial = () => {
        getAlumnos().then(x => {
            dispatch(Actions.setAlumnosStore(x.data.value))
        })

    }

    const handleDeleteAlumnos = () => {
        const { id } = confirmationDelete.item

        setConfirmationDelete({
            visible: false,
            item: { id: 0 }
        })

        deleteAlumno(id).then(() => {
            dispatch(Actions.deleteAlumnos(id))
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
                <div>
                    <h3>Listado de Alumnos</h3>
                </div>

                <div>
                    <ModalAddAlumno />

                    <ModalAddAlumnoMasivo />
                </div>
            </div>

            <DataGrid
                singlePagination={true}
                pageSize={10}
                columns={Columns.alumnos}
                onClickEdit={(row) => {
                    setCurrentUser(row)
                    setShowModal(true)
                }}
                onClickDelete={(row) => setConfirmationDelete({ visible: true, item: row })}
                rows={alumnos.map(x => ({
                    ...x,
                    pagos: x.pagos.length,
                    fechaNacimiento:moment(x.fechaNacimiento).format('YYYY-MM-DD'),
                    fechaIngreso:moment(x.fechaIngreso).format('YYYY-MM-DD')
                }))}
                filterComponent={(onClosedFilter) => <AlumnoFilter onClosed={onClosedFilter} />}
            />

            <ModalConfirmation
                title='¿Confirma baja del registro?'
                visible={confirmationDelete.visible}
                onClickYes={handleDeleteAlumnos}
                onClickNo={handlerDeleteNotification} children={undefined}
            />
        </>
    );
}
export default AlumnoList;