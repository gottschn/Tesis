import { useEffect } from 'react';
import AlumnoItem from './AlumnoItem';
import { Table } from 'react-bootstrap';

import React from 'react';
import { HelperRedux } from '../../../@redux';
import { getAlumnos } from '../../../domain/alumnos';
import { Actions } from '../../../@redux/alumno';
import ModalAddAlumno from '../modals/ModalAddAlumno';

const AlumnoList = () => {

    const dispatch = HelperRedux.useDispatch()
    const { alumnos } = HelperRedux.useSelector((state) => state.alumnos)

    useEffect(() => {
        if(alumnos.length === 0)
            getInitial();
    }, [])
    
    const getInitial = () => {
        getAlumnos().then(x => {dispatch(Actions.setAlumnosStore(x.data.value))})
        
    }

    return (
        <>
            <div className="row">
                <div className="col-6">
                    <h3>Listado de Alumnos</h3>
                </div>
                <div className="col-6 d-flex justify-content-end mb-1">
                    <ModalAddAlumno />
                </div>
            </div>

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID del Alumno</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Dni</th>
                        <th>Direccion</th>
                        <th>Telefono</th>
                        <th>Mail</th>
                        <th>PorcBeca</th>
                        <th>Fecha Ingreso</th>
                        <th>Legajo</th>
                        <th>CarreraId</th>
                        <th className='text-center'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        alumnos ?
                            alumnos.map((alumno, index) =>
                                <AlumnoItem
                                    alumnos={alumno}
                                    key={index}
                                />
                            )
                            :
                            <tr>
                                <td colSpan={4} className="text-center">
                                    No posee alumnos cargados
                                </td>
                            </tr>
                    }
                </tbody>
            </Table>
        </>
    );
};

export default AlumnoList;