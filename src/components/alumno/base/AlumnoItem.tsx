import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faI } from "@fortawesome/free-solid-svg-icons";
import { AlumnoProps } from '../../../@redux/alumno/types';
import moment from 'moment';

const AlumnoItem:React.FC<{alumnos:AlumnoProps}> = ({...props}) => {

    const Date = moment(props.alumnos.fechaIngreso).format('DD-MM-YYYY');
    // console.log(props.alumnos)
    return (
        <>
            <tr>
            
                <td> {props.alumnos.nombre} </td>
                <td> {props.alumnos.apellido} </td>
                <td> {props.alumnos.dni} </td>
                <td> {props.alumnos.direccion} </td>
                <td> {props.alumnos.telefono} </td>
                <td> {props.alumnos.mail} </td>
                <td> {props.alumnos.porcBeca} </td>
                <td> { Date } </td>
                <td> {props.alumnos.legajo} </td>
                <td> {props.alumnos.carreras.length > 0 ? props.alumnos.carreras[0].descripcion : 'S/N'} </td>
                <td className="text-center">
                    <Button
                        variant="warning"
                        className='me-2'
                        onClick={() => {
                           // getAlumno(alumno.id);
                           // openEditModal();
                        }}
                    >
                        <FontAwesomeIcon icon={faPen} />
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => {
                            //getAlumno(alumno.id);
                            //openDeleteModal();
                        }}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </td>
            </tr>
        </>
    );
};

export default AlumnoItem;