import { useContext, useEffect } from 'react';
import CarreraContext from '../../../context/carrera/CarrerasContext';
import AlumCarreraContext from '../../../context/alumCarrera/AlumCarreraContext';

import { Table } from 'react-bootstrap';
import React from 'react';
import { CarrerasProps } from '../../../@redux/carreras/types';
import { Actions } from '../../../@redux/carreras';
import { getCarreras } from '../../../domain/carreras';
import { HelperRedux } from '../../../@redux';
import CarreraItem from '../base/CarreraItem';

const SearchedCarrera:React.FC<{carrera:CarrerasProps}>= () => {
    const dispatch = HelperRedux.useDispatch()
    const { carreras } = HelperRedux.useSelector((state) => state.carreras)

    useEffect(() => {
        getInitial();
    }, [])
    
    const getInitial = () => {
        getCarreras().then(x => {dispatch(Actions.setCarrerasStore(x.data.value))})
        
    }

   // console.log(carreras,"prueba de carrera searched")
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
                        carreras ?
                            carreras.map((carrera, index) => 
                                <CarreraItem
                                    carrera={carrera}
                                    key={index}
                                    
                                />
                            )
                            :
                            <tr>
                                <td colSpan={4} className="text-center">
                                    No hay carreras cargadas
                                </td>
                            </tr>
                    } 
                </tbody>
            </Table>
        </>
    );
};

export default SearchedCarrera;