// Aca obtenes los get/post/put/delete
import { TypeActions } from "./types"

const getStart = () => ({
    type: TypeActions.GET_START
})
const getComplete = () => ({
    type: TypeActions.GET_COMPLETE
})

const getCarreras = (
    id: number | string,
    descripcion: string | number,
    cantCuotas?:string | number,
    precioCuo?: string | number,
    
) => ({
    type: TypeActions.GET_CARRERAS,
    id,
    descripcion,
    cantCuotas,
    precioCuo
})

const setCarrerasStore = (data: any) => ({
    type: TypeActions.SET_CARRERAS_STORE,
    data
})

const createCarreras = ( data: any ) => ({
    type: TypeActions.CREATE_CARRERAS,
    data,
})

const updateCarreras = ( data: any, id: number) => ({
    type: TypeActions.UPDATE_CARRERAS,
    data,
    id
})

const deleteCarreras = ( data: any ) => ({
    type: TypeActions.DELETE_CARRERAS,
    data
})

const setFilterCarreraStore = (id: number | string, descripcion: string) => ({
    type: TypeActions.SET_CARRERA_FILTER_STORE,
    id,
    descripcion
})


export const Actions = {
    getStart,
    getComplete,
    getCarreras,
    createCarreras,
    updateCarreras,
    deleteCarreras,
    setCarrerasStore,
    setFilterCarreraStore
}
