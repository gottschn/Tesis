import { useState, useEffect, useContext } from 'react';
import EditCuotaModal from '../modals/EditCuotaModal';
import DeleteCuotaModal from '../modals/DeleteCuotaModal';
import CuotaContext from '../../../context/cuota/CuotaContext';
import { Table } from 'react-bootstrap';
import CuotaItem from './CuotaItem';
//import CarreraContext from '../../../context/carrera/CarrerasContext';
//import AlumnoContext from '../../../context/alumno/AlumnoContext';
import PagoCuotaModal from '../../pagoCuota/modals/PagoCuotaModal';
import React from 'react';
import { getCuotas } from '../../../domain/cuotas';
import { Actions } from '../../../@redux/cuotas';
import { HelperRedux } from '../../../@redux';
import ModalAddAlumno from '../../alumno/modals/ModalAddAlumno';
import ModalAddCuota from '../modals/ModalAddCuota';

const CuotaList = () => {
    const dispatch = HelperRedux.useDispatch()
    const { cuotas } = HelperRedux.useSelector((state) => state.cuotas)
    
    /* const { getCuotasByAlumAndCarr, cuotas } = useContext(CuotaContext); */
    const [showPagoCuotaModal, setShowPagoCuotaModal] = useState(false);
    const [showEditCuotaModal, setShowEditCuotaModal] = useState(false);
    const [showDeleteCuotaModal, setShowDeleteCuotaModal] = useState(false);

    /* const { currentAlumno } = useContext(AlumnoContext);
    const { currentCarrera } = useContext(CarreraContext); */

    /* useEffect(() => {
        getCuotasByAlumAndCarr(currentAlumno.id, currentCarrera.id);
    }, [currentCarrera]); */

    useEffect(() => {
        getInitial();
    }, [])
    
    const getInitial = () => {
        getCuotas().then(x => {dispatch(Actions.setCuotasStore(x.data.value))})
 
    }

   /*  const openPagoCuotaModal = () => {
        setShowPagoCuotaModal(true);
    };

    const openEditModal = () => {
        setShowEditCuotaModal(true);
    };

    const openDeleteModal = () => {
        setShowDeleteCuotaModal(true);
    }; */
        /* ESTO IMPACTA EN PAGO */
    return (
        <>
            <div className="row">
                <div className="col-6">
                    <h3>Listado de Cuotas</h3>
                </div>
            </div>
                <ModalAddCuota />
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Numero</th>
                        <th>Alumno</th>
                        <th>Precio Cuota</th>
                        <th className='text-center'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cuotas && cuotas.length > 0 ?
                            cuotas.map((cuota, index) =>
                                <CuotaItem
                                    cuotas={cuota}
                                    key={index}
                                
                                    /* openPagoCuotaModal={openPagoCuotaModal}
                                    openEditModal={openEditModal}
                                    openDeleteModal={openDeleteModal} */
                                />
                            )
                            :
                            <tr>
                                <td colSpan={5} className="text-center">
                                    El Alumno seleccionado no posee Cuotas cargadas en la Carrera Seleccionada
                                </td>
                            </tr>
                    }
                </tbody>
            </Table>

            <PagoCuotaModal
                show={showPagoCuotaModal}
                onHide={() => setShowPagoCuotaModal(false)}
            />

            <EditCuotaModal
                show={showEditCuotaModal}
                onHide={() => setShowEditCuotaModal(false)}
            />

            <DeleteCuotaModal
                show={showDeleteCuotaModal}
                onHide={() => setShowDeleteCuotaModal(false)}
            />

        </>
    );
};

export default CuotaList;