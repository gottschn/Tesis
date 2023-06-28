import React from 'react';
import { useEffect } from 'react';


import { HelperRedux } from '../../../@redux';
import DataGrid from '../../../app/components/DataGrid';
import Columns from './Empleado.json';
import '../../../app/components/GlobalStyles/css/GlobalStyle.css'
import EmpleadoFilter from './EmpleadoFilter';
import { Actions } from '../../../@redux/empleado/actions';
import { getEmpleados } from '../../../domain/empleados';
import { EmpleadosProps } from '../../../@redux/empleado/types';
import ModalAddEmpleado from '../modals/ModalAddEmpleado';

const EmpleadoList: React.FC<{ empleados: EmpleadosProps }> = ({ ...props }) => {

    const dispatch = HelperRedux.useDispatch()
    const { empleados } = HelperRedux.useSelector((state) => state.empleados)

    useEffect(() => {
        if (empleados.length === 0)
            getInitial();
    }, [])

    const getInitial = () => {
        getEmpleados().then(x => { dispatch(Actions.setEmpleadosStore(x.data.value)) })

    }

    return (
        <>
            <main>
                <div className="modalMain">
                    <div className="">
                        <h3>Listado de Empleados</h3>
                    </div>

                    <div className="">
                            <ModalAddEmpleado />
                        </div>
                </div>

                <DataGrid
                    singlePagination={true}
                    subTableName='details'
                    pageSize={10}
                    columns={Columns.empleados}
                   /*  onClickEdit={(row) => { <ModalEditAlumno alumno={props.alumno} /> }}
                    onClickDelete={(row) => { <ModalDeleteAlumno alumno={props.alumno} /> }} */

                    rows={empleados.map(x => ({
                        ...x,
                    }),
                    )}
                    filterComponent={(onClosedFilter) => <EmpleadoFilter onClosed={onClosedFilter} />}
                />
            </main>
        </>
    );
};

export default EmpleadoList;