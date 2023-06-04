// Aca obtenes los get/post/put/delete
import { TypeActions } from "./types"

const getStart = () => ({
    type: TypeActions.GET_START
})
const getComplete = () => ({
    type: TypeActions.GET_COMPLETE
})

const getPagoCuotas = (
    monto: number,
    fechaPago: Date,
    porcPago: number,
    cuotaId: number,
    
) => ({
    type: TypeActions.GET_PAGO_CUOTAS,
    monto,
    fechaPago,
    porcPago,
    cuotaId
})

const setPagoCuotasStore = (data: any) => ({
    type: TypeActions.SET_PAGO_CUOTAS_STORE,
    data
})

const createPagoCuotas = ( data: any ) => ({
    type: TypeActions.CREATE_PAGO_CUOTAS,
    data
})

const updatePagoCuotas = ( data: any, id: number ) => ({
    type: TypeActions.UPDATE_PAGO_CUOTAS,
    data,
    id
})

const deletePagoCuotas = ( data: any ) => ({
    type: TypeActions.DELETE_PAGO_CUOTAS,
    data
})


export const Actions = {
    getStart,
    getComplete,
    getPagoCuotas,
    setPagoCuotasStore,
    createPagoCuotas,
    updatePagoCuotas,
    deletePagoCuotas
}
