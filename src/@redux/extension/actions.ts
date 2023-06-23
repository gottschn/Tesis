// Aca obtenes los get/post/put/delete
import { ExtensionFilter, TypeActions } from "./types"

const getStart = () => ({
    type: TypeActions.GET_START
})
const getComplete = () => ({
    type: TypeActions.GET_COMPLETE
})

const getExtensiones = (
    id: number | string,
    descripcion: string,
    
) => ({
    type: TypeActions.GET_EXTENSIONES,
    id,
    descripcion,
})

const setExtensionesStore = (data: any) => ({
    type: TypeActions.SET_EXTENSIONES_STORE,
    data
})

const createExtensiones= ( data: any ) => ({
    type: TypeActions.CREATE_EXTENSIONES,
    data,
})

const updateExtensiones = ( data: any, id: number) => ({
    type: TypeActions.UPDATE_EXTENSIONES,
    data,
    id
})

const deleteExtensiones = ( data: any ) => ({
    type: TypeActions.DELETE_EXTENSIONES,
    data
})

const setFilterExtensionesStore = (data: ExtensionFilter  = {
    id: '', 
    descripcion: '', 
}) => ({
    type: TypeActions.SET_EXTENSIONES_FILTER_STORE,
    data
})


export const Actions = {
    getStart,
    getComplete,
    getExtensiones,
    createExtensiones,
    updateExtensiones,
    deleteExtensiones,
    setExtensionesStore,
    setFilterExtensionesStore
}
