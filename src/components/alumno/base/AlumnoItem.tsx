import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faI } from "@fortawesome/free-solid-svg-icons";
import { AlumnoProps } from '../../../@redux/alumno/types';
import moment from 'moment';
import ModalEditAlumno from '../modals/ModalEditAlumno';
import ModalDeleteAlumno from '../modals/ModalDeleteAlumno';

const AlumnoItem:React.FC<{alumnos:AlumnoProps}> = ({...props}) => {

    const Date = moment(props.alumnos.fechaIngreso).format('DD-MM-YYYY');
    // console.log(props.alumnos)
    return (
        <>
            <tr>
                <td> {props.alumnos.id} </td>
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
                    <ModalEditAlumno alumno={props.alumnos}/>
                    <ModalDeleteAlumno alumno={props.alumnos} />
                </td>
            </tr>
        </>
    );
};

export default AlumnoItem;