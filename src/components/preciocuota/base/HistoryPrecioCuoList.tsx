import React, { useEffect }from 'react';
/* REDUX */
import { HelperRedux } from '../../../@redux';
/* Components */
import { Table } from 'react-bootstrap';
import { getPrecioCuotas } from '../../../domain/precioCuotas';
import { Actions } from '../../../@redux/precioCuotas';
import HistoryPrecioCuoItem from './HistoryPrecioCuoItem';

const HistoryPrecioCuoList = () => {
    const dispatch = HelperRedux.useDispatch()
    const { precioCuotas } = HelperRedux.useSelector((state) => state.precioCuota)
    
    useEffect(() => {
        getInitial();
    }, [])
    
    const getInitial = () => {
        getPrecioCuotas().then(x => {dispatch(Actions.setPrecioCuotasStore(x.data.value))})
        
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
                        precioCuotas ?
                        precioCuotas.map((precioCuo, index) =>
                                <HistoryPrecioCuoItem
                                    precioCuotas={precioCuo}
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