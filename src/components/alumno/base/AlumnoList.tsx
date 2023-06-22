import React from 'react';
import { useEffect } from 'react';


import { HelperRedux } from '../../../@redux';
import { getAlumnos } from '../../../domain/alumnos';
import { Actions } from '../../../@redux/alumno';
import ModalAddAlumno from '../modals/ModalAddAlumno';
import { AlumnoProps } from '../../../@redux/alumno/types';
import DataGrid from '../../../app/components/DataGrid';
import Columns from './Alumno.json';
import ModalEditAlumno from '../modals/ModalEditAlumno';
import ModalDeleteAlumno from '../modals/ModalDeleteAlumno';
import ModalAddAlumnoMasivo from '../modals/ModalAddAlumnoMasivo';
import AlumnoFilter from './AlumnoFilter';
import '../../../app/components/GlobalStyles/css/GlobalStyle.css'

const AlumnoList: React.FC<{ alumno: AlumnoProps }> = ({ ...props }) => {

    const dispatch = HelperRedux.useDispatch()
    const { alumnos } = HelperRedux.useSelector((state) => state.alumnos)

    useEffect(() => {
        if (alumnos.length === 0)
            getInitial();
    }, [])

    const getInitial = () => {
        getAlumnos().then(x => { dispatch(Actions.setAlumnosStore(x.data.value)) })

    }

    return (
        <>
            <main>
                <div className="modalMain">
                    <div className="">
                        <h3>Listado de Alumnos</h3>
                    </div>

                    <div className="">
                            <ModalAddAlumno />

                            <ModalAddAlumnoMasivo />
                        </div>
                </div>

                <DataGrid
                    singlePagination={true}
                    subTableName='details'
                    pageSize={10}
                    columns={Columns.alumnos}
                    onClickEdit={(row) => { <ModalEditAlumno alumno={props.alumno} /> }}
                    onClickDelete={(row) => { <ModalDeleteAlumno alumno={props.alumno} /> }}

                    rows={alumnos.map(x => ({
                        ...x,
                    }),
                    )}
                    filterComponent={(onClosedFilter) => <AlumnoFilter onClosed={onClosedFilter} />}
                />
            </main>
        </>
    );
};

export default AlumnoList;