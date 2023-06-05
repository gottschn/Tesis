
import React, { useEffect }  from 'react';

/* REDUX */
import { HelperRedux } from '../../../@redux';
import { Actions } from '../../../@redux/carreras/index'
/* Components */
/* import AddCarreraModal from '../modals/AddCarreraModal';
import EditCarreraModal from '../modals/EditCarreraModal';
import DeleteCarreraModal from '../modals/DeleteCarreraModal';
import HistoryPrecioCuoModal from '../../preciocuota/modals/HistoryPrecioCuoModal'; */
import CarreraItem from './CarreraItem';
import ModalAddCarrera from '../modals/ModalAddCarrera';

/* icons */
import { Table } from 'react-bootstrap';
import { getCarreras } from '../../../domain/carreras';
//import { useNavigate } from 'react-router-dom';


const CarreraList = () => {
   // const navigate = useNavigate()
    const dispatch = HelperRedux.useDispatch()
    const { carreras } = HelperRedux.useSelector((state) => state.carreras)

    useEffect(() => {
        if(carreras.length === 0)
        {
            getInitial()
        }
    }, [])
    
    const getInitial = () => {
        getCarreras().then(x => {dispatch(Actions.setCarrerasStore(x.data.value))})
        
    }
    return (
        <>
            <div className="row">
                <div className="col-6">
                    <h3>Listado de Carreras</h3>
                </div>
                <div className="col-6 d-flex justify-content-end mb-1">
                  <ModalAddCarrera/> 
                </div>
            </div>

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Cantidad Cuotas</th>
                        <th>Precio Cuota</th>
                        <th className='text-center'>Acciones</th>
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

export default CarreraList;