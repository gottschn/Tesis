import React, { useEffect }from 'react';
/* REDUX */
import { HelperRedux } from '../../../@redux';

/* Components */
import PrecioCuoItem from './PrecioCuoItem';
import { Table } from 'react-bootstrap';
import { getPrecioCuotas } from '../../../domain/precioCuotas';
import { Actions } from '../../../@redux/precioCuotas';
import ModalAddPrecioCuota from '../modals/ModalAddPrecioCuota';
const PrecioCuoList = () => {
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

        <div className="row">
                <div className="col-6">
                    <h3>Precio Carrera</h3>
                </div>

                <div className="col-6 d-flex justify-content-end mb-1">
                    <ModalAddPrecioCuota /> 
                </div>
        </div>

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Carrera ID</th>
                        <th>Carrera</th>
                        <th>Monto</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        precioCuotas ?
                        precioCuotas.map((precioCuo, index) =>
                                <PrecioCuoItem
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

export default PrecioCuoList;