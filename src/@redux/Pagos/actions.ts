// Aca obtenes los get/post/put/delete
import { PagosFilter, TypeActions } from "./types"

const getStart = () => ({
    type: TypeActions.GET_START
})
const getComplete = () => ({
    type: TypeActions.GET_COMPLETE
})

const getPagos = (
    legajo: string,
    cantCuota: number,
    nroCuota: number,
    monto: number,
    nroRecibo: number,
    fechaCarga: Date | null,
    fechaRecibo: Date | null,
    alumnoId: number,
    alumno: string,
    
) => ({
    type: TypeActions.GET_PAGO,
    legajo,
    cantCuota,
    nroCuota,
    monto,
    nroRecibo,
    fechaCarga,
    fechaRecibo,
    alumnoId,
    alumno

})

const setPagosStore = (data: any) => ({
    type: TypeActions.SET_PAGO_STORE,
    data
})

const createPagos = ( data: any ) => ({
    type: TypeActions.CREATE_PAGO,
    data
})

const updatePagos = ( data: any, id: number ) => ({
    type: TypeActions.UPDATE_PAGO,
    data,
    id
})

const deletePagos = ( data: any ) => ({
    type: TypeActions.DELETE_PAGO,
    data
})

const setPagosFilterStore = ( data: PagosFilter = {
    legajo: ''
}) => ({
    type: TypeActions.SET_PAGO_FILTER_STORE,
    data
})


export const Actions = {
    getStart,
    getComplete,
    getPagos,
    setPagosStore,
    createPagos,
    updatePagos,
    deletePagos,
    setPagosFilterStore
}
