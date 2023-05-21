import { useContext, useEffect } from 'react';
import CarreraContext from '../../../context/carrera/CarrerasContext';
import AlumCarreraContext from '../../../context/alumCarrera/AlumCarreraContext';

import { Table } from 'react-bootstrap';
import React from 'react';

const SearchedCarrera = () => {
    const { currentCarrera, getCarrera, clearCurrentCarrera } = useContext(CarreraContext);
    const { alumnosCarreras } = useContext(AlumCarreraContext);    

    useEffect(() => {
        if (alumnosCarreras.length === 1) {
            getCarrera(alumnosCarreras[0].fkCarrera);
        }
    }, [alumnosCarreras]);


    return (
        <>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Cantidad Cuotas</th>
                        <th>Precio Cuota</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentCarrera.descripcion ?
                            <tr>
                                <td> {1} </td>
                                <td> {currentCarrera.descripcion} </td>
                                <td> {currentCarrera.cantCuotas} </td>
                                <td> ${currentCarrera.precioCuo} </td>
                            </tr>
                            :
                            <tr>
                                <td colSpan={4} className="text-center">
                                    Aun no se ha seleccionado una Carrera
                                </td>
                            </tr>
                    }
                </tbody>
            </Table>
        </>
    );
};

export default SearchedCarrera;