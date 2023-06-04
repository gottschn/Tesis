// Aca obtenes los get/post/put/delete
import { TypeActions } from "./types"

const getStart = () => ({
    type: TypeActions.GET_START
})
const getComplete = () => ({
    type: TypeActions.GET_COMPLETE
})

const getPrecioCuotas = (
    monto: number | string,
    fecha: string | Date,
    carreraId:string | number,
    
) => ({
    type: TypeActions.GET_PRECIO_CUOTAS,
    monto,
    fecha,
    carreraId,
})

const setPrecioCuotasStore = (data: any) => ({
    type: TypeActions.SET_PRECIO_CUOTAS_STORE,
    data
})

const createPrecioCuotas = ( data: any ) => ({
    type: TypeActions.CREATE_PRECIO_CUOTAS,
    data
})

const updatePrecioCuotas = ( data: any, id: number ) => ({
    type: TypeActions.UPDATE_PRECIO_CUOTAS,
    data,
    id
})

const deletePrecioCuotas = ( data: any ) => ({
    type: TypeActions.DELETE_PRECIO_CUOTAS,
    data
})


export const Actions = {
    getStart,
    getComplete,
    getPrecioCuotas,
    setPrecioCuotasStore,
    createPrecioCuotas,
    updatePrecioCuotas,
    deletePrecioCuotas
}
