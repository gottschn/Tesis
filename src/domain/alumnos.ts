//import { CarreraEntity } from "../context/carrera/types";

import instance from "../config/axios/axios"


const getAlumnos = () => {
    return instance.get(`/alumno/ObtenerTodos`)
}


 const createAlumno = (nombre:string, apellido: string, dni: string, legajo: string, direccion: string,  mail: string, porcBeca:number, telefono: string, carrerasId: [], fechaIngreso: Date ) => {
    return instance.post(`/alumno`,{
        nombre,
        apellido,
        dni,
        legajo,
        direccion,
        mail,
        porcBeca,
        telefono,
        carrerasId,
        fechaIngreso
    })
}

export {
    getAlumnos,
    createAlumno,
}