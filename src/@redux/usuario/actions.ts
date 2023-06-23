// Aca obtenes los get/post/put/delete
import { UsuarioFilter, TypeActions } from "./types"

const getStart = () => ({
    type: TypeActions.GET_START
})
const getComplete = () => ({
    type: TypeActions.GET_COMPLETE
})

const getUsuarios = (
    id: number | string,
    nombre: string,
    password: string,
    rol: number | string,
    personaId: number | string,

    
) => ({
    type: TypeActions.GET_USUARIOS,
    id,
    nombre,
    password,
    rol,
    personaId
})

const setUsuariosStore = (data: any) => ({
    type: TypeActions.SET_USUARIOS_STORE,
    data
})

const createUsuarios= ( data: any ) => ({
    type: TypeActions.CREATE_USUARIOS,
    data,
})

const updateUsuarios = ( data: any, id: number) => ({
    type: TypeActions.UPDATE_USUARIOS,
    data,
    id
})

const deleteUsuarios = ( data: any ) => ({
    type: TypeActions.DELETE_USUARIOS,
    data
})

const setFilterUsuariosStore = (data: UsuarioFilter  = {
    id: '', 
    nombre: '', 
}) => ({
    type: TypeActions.SET_USUARIOS_FILTER_STORE,
    data
})


export const Actions = {
    getStart,
    getComplete,
    getUsuarios,
    createUsuarios,
    updateUsuarios,
    deleteUsuarios,
    setUsuariosStore,
    setFilterUsuariosStore
}
