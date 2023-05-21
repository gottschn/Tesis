/* react, axios */
import { useState } from 'react';
import clientAxios from '../../config/axios/axios';
import React from 'react';

/* Contect */
import AlumnoContext from './AlumnoContext';

const AlumnoProvider = ({ children }) => {

    const initialValues = {
        alumnos: [],
        currentAlumno: {}
    };

    const [values, setValues] = useState(initialValues);

    const getAlumnos = async () => {
        try {
            const res = await clientAxios.get(`/alumno`);
            console.log("pepe", res.data)
            res.status === 200 && setValues({
                ...values,
                alumnos: res.data
            });
        } catch (error) {
            throw error;
        }
    }

    const getAlumno = async alumnoId => {
        try {
            const res = await clientAxios.get(`/alumno/ObtenerTodos`);
            res.status === 200 && setValues({ ...values, currentAlumno: res.data });
        } catch (error) {
            throw error;
        }
    }

    const addAlumno = async alumno => {
        try {
            alumno.fechaIngreso = new Date(Date.now()).toLocaleDateString();
            alumno.porcBeca = parseFloat(alumno.porcBeca);
            alumno.Eliminado = false;
            const res = await clientAxios.post(`/alumno`, alumno);
            res.status === 201 && await getAlumnos();
        } catch (error) {
            throw error;
        }
    }

    const updateAlumno = async alumno => {
        try {
            //verif que no se pierda la fecha de ingreso una vez conectado a .net
            alumno.porcBeca = parseFloat(alumno.porcBeca);
            const res = await clientAxios.put(`/alumno/${alumno.id}`, alumno);
            res.status === 200 && await getAlumnos();
        } catch (error) {
            throw error;
        }
    }

    const deleteAlumno = async alumno => {
        try {
            // const res = await clientAxios.delete(`${API_URL_JSON_SERVER}/alumno/${alumnoId}`);
            alumno.Eliminado = true;
            const res = await clientAxios.put(`/alumno/${alumno.id}`, alumno);
            res.status === 200 && await getAlumnos();
        } catch (error) {
            throw error;
        }
    }

    const clearCurrentAlumno = () => setValues({ ...values, currentAlumno: {} });

    return (
        <AlumnoContext.Provider value={{
            ...values,
            getAlumnos,
            getAlumno,
            addAlumno,
            updateAlumno,
            deleteAlumno,
            clearCurrentAlumno
        }}>
            {children}
        </AlumnoContext.Provider>
    );
};

export default AlumnoProvider;