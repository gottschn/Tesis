// Aca obtenes los get/post/put/delete
import { EmpleadosFilter, TypeActions } from "./types"

const getStart = () => ({
    type: TypeActions.GET_START
})
const getComplete = () => ({
    type: TypeActions.GET_COMPLETE
})
const getEmpleados = (
    id: number | string,
    apynom: string,
    tipoDoc: number | string,
    nroDoc: string,
    fechaNacimiento: Date | string,
    direccion: string,
    telefono: string,
    mail: string,
    extensionId: number | string,
    extension: string,
    ciudadId: number | string,
    ciudad: string,
    codigoPostal: number | string,
    areaTrabajo: string
    
) => ({
    type: TypeActions.GET_EMPLEADOS,
    id,
    apynom,
    tipoDoc,
    nroDoc,
    fechaNacimiento,
    direccion,
    telefono,
    mail,
    extensionId,
    extension,
    ciudadId,
    ciudad,
    codigoPostal,
    areaTrabajo,
})

const setEmpleadosStore = (data: any) => ({
    type: TypeActions.SET_EMPLEADOS_STORE,
    data
})

const createEmpleados = ( data: any ) => ({
    type: TypeActions.CREATE_EMPLEADOS,
    data,
})

const updateEmpleados = ( data: any, id: number) => ({
    type: TypeActions.UPDATE_EMPLEADOS,
    data,
    id
})

const deleteEmpleados = ( data: any ) => ({
    type: TypeActions.DELETE_EMPLEADOS,
    data
})

const setFilterEmpleadosStore = (apynom: string, areaTrabajo: string)  => ({
    type: TypeActions.SET_EMPLEADOS_FILTER_STORE,
    apynom,
    areaTrabajo
})


export const Actions = {
    getStart,
    getComplete,
    setEmpleadosStore,
    getEmpleados,
    createEmpleados,
    updateEmpleados,
    deleteEmpleados,
    setFilterEmpleadosStore
}
