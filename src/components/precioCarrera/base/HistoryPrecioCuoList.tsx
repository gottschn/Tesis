import React, { useEffect }from 'react';
/* REDUX */
import { HelperRedux } from '../../../@redux';
/* Components */
import { Table } from 'react-bootstrap';
import { getPrecioCarreras } from '../../../domain/precioCarreras';
import { Actions } from '../../../@redux/precioCarrera';
import HistoryPrecioCuoItem from './HistoryPrecioCuoItem';

const HistoryPrecioCuoList = () => {
    const dispatch = HelperRedux.useDispatch()
    const { precioCarreras } = HelperRedux.useSelector((state) => state.precioCarrera)
    
    useEffect(() => {
        getInitial();
    }, [])
    
    const getInitial = () => {
        getPrecioCarreras().then(x => {dispatch(Actions.setPrecioCarrerasStore(x.data.value))})
        
    }
    return (
        <>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Carrera ID </th>
                        <th>Carrera</th>
                        <th>Monto</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        precioCarreras ?
                        precioCarreras.map((precioCarr, index) =>
                                <HistoryPrecioCuoItem
                                     precioCarreras={precioCarr}
                                    key={index}
                                />
                            )
                            :
                            <tr>
                                <td colSpan={4} className="text-center">
                                    No posee precios de cuotas cargadas
                                </td>
                            </tr>
                    }
                </tbody>
            </Table>
        </>
    );
};

export default HistoryPrecioCuoList;