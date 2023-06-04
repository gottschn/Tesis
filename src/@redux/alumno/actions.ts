// Aca obtenes los get/post/put/delete
import { TypeActions } from "./types"

const getStart = () => ({
    type: TypeActions.GET_START
})
const getComplete = () => ({
    type: TypeActions.GET_COMPLETE
})
const getAlumnos = (
    id: number,
    nombre: string,
    apellido:string,
    dni: string,
    legajo: string,
    direccion: string,
    mail: string,
    porcBeca: number,
    telefono: string,
    carreraId: number,
    fechaIngreso: Date
    
) => ({
    type: TypeActions.GET_ALUMNOS,
    id,
    nombre,
    apellido,
    dni,
    legajo,
    direccion,
    mail,
    porcBeca,
    telefono,
    carreraId,
    fechaIngreso,
})

const setAlumnosStore = (data: any) => ({
    type: TypeActions.SET_ALUMNO_STORE,
    data
})

const createAlumnos = ( data: any ) => ({
    type: TypeActions.CREATE_ALUMNOS,
    data,
})

const updateAlumnos = ( data: any, id: number) => ({
    type: TypeActions.UPDATE_ALUMNOS,
    data,
    id
})

const deleteAlumnos = ( data: any ) => ({
    type: TypeActions.DELETE_ALUMNOS,
    data
})


export const Actions = {
    getStart,
    getComplete,
    setAlumnosStore,
    getAlumnos,
    createAlumnos,
    updateAlumnos,
    deleteAlumnos
}
