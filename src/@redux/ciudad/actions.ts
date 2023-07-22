// Aca obtenes los get/post/put/delete
import { CiudadesFilter, TypeActions } from "./types"

const getStart = () => ({
    type: TypeActions.GET_START
})
const getComplete = () => ({
    type: TypeActions.GET_COMPLETE
})

const getCiudades = (
    id: number | string,
    descripcion: string,
    
) => ({
    type: TypeActions.GET_CIUDADES,
    id,
    descripcion,
})

const setCiudadesStore = (data: any) => ({
    type: TypeActions.SET_CIUDADES_STORE,
    data
})

const createCiudades= ( data: any ) => ({
    type: TypeActions.CREATE_CIUDADES,
    data,
})

const updateCiudades = ( data: any, id: number) => ({
    type: TypeActions.UPDATE_CIUDADES,
    data,
    id
})

const deleteCiudades = ( data: any ) => ({
    type: TypeActions.DELETE_CIUDADES,
    data
})

const setFilterCiudadesStore = (descripcion: string) => ({
    type: TypeActions.SET_CIUDADES_FILTER_STORE,
    descripcion
})


export const Actions = {
    getStart,
    getComplete,
    getCiudades,
    createCiudades,
    updateCiudades,
    deleteCiudades,
    setCiudadesStore,
    setFilterCiudadesStore
}
