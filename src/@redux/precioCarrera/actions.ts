// Aca obtenes los get/post/put/delete
import { TypeActions } from "./types"

const getStart = () => ({
    type: TypeActions.GET_START
})
const getComplete = () => ({
    type: TypeActions.GET_COMPLETE
})

const getPrecioCarreras = (
    monto: number | string,
    carreraId: string | number,
    matricula?: number | string,
    fecha?: string | Date,
    carrera?: string | number,
    
) => ({
    type: TypeActions.GET_PRECIO_CARRERAS,
    monto,
    matricula,
    fecha,
    carreraId,
    carrera,
})

const setPrecioCarrerasStore = (data: any) => ({
    type: TypeActions.SET_PRECIO_CARRERAS_STORE,
    data
})

const createPrecioCarreras = ( data: any ) => ({
    type: TypeActions.CREATE_PRECIO_CARRERAS,
    data
})

const updatePrecioCarreras = ( data: any, id: number ) => ({
    type: TypeActions.UPDATE_PRECIO_CARRERAS,
    data,
    id
})

const deletePrecioCarreras = ( data: any ) => ({
    type: TypeActions.DELETE_PRECIO_CARRERAS,
    data
})

const setPrecioCarrerasFilter = (descripcion: string) => ({
    type: TypeActions.SET_PRECIO_CARRERA_FILTER_STORE,
    descripcion
})


export const Actions = {
    getStart,
    getComplete,
    getPrecioCarreras,
    setPrecioCarrerasStore,
    createPrecioCarreras,
    updatePrecioCarreras,
    deletePrecioCarreras,
    setPrecioCarrerasFilter
}
