// Aca obtenes los get/post/put/delete
import { AlumnoProps, AlumnosFilter, TypeActions } from "./types"

const getStart = () => ({
    type: TypeActions.GET_START
})
const getComplete = () => ({
    type: TypeActions.GET_COMPLETE
})
const getAlumnos = (
    id: number | string,
    legajo: string,
    apynom: string,
    tipoDoc: number | string,
    nroDoc: string,
    fechaNacimiento: Date | string,
    fechaIngreso: Date | string,
    direccion: string,
    telefono: string,
    mail: string,
    extensionId: number | string,
    extension: string,
    ciudadId: number | string,
    ciudad: string,
    codigoPostal: number | string,
    pagos: number | string,
    carrerasId: number | string,
    carreras: number | string,
    
) => ({
    type: TypeActions.GET_ALUMNOS,
    id,
    legajo,
    apynom,
    tipoDoc,
    nroDoc,
    fechaNacimiento,
    fechaIngreso,
    direccion,
    telefono,
    mail,
    extensionId,
    extension,
    ciudadId,
    ciudad,
    codigoPostal,
    pagos,
    carrerasId,
    carreras,
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

const setFilterAlumnosStore = ( data: AlumnosFilter = {
    dni: '',
    legajo: '',
})  => ({
    type: TypeActions.SET_ALUMNO_FILTER_STORE,
    data
})

const addAlumnosMasivo = () => ({
    type: TypeActions.ADD_ALUMNOS_MASSIVO
})

const confirmAlumnosMasivo= () => ({
    type: TypeActions.CONFIRM_ALUMNOS_MASSIVO
})

const deleteAlumnosMasivo = (data: AlumnoProps[]) => ({
    type: TypeActions.DELETE_ALUMNOS_MASSIVO,
    data
})

const cleanAlumnosStore = () => ({
    type: TypeActions.CLEAN_ALUMNOS_STORE,
}) 


export const Actions = {
    getStart,
    getComplete,
    setAlumnosStore,
    getAlumnos,
    createAlumnos,
    updateAlumnos,
    deleteAlumnos,
    setFilterAlumnosStore,
    /* Masivo */
    addAlumnosMasivo,
    deleteAlumnosMasivo,
    confirmAlumnosMasivo,
    cleanAlumnosStore
}
