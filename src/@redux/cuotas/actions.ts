// Aca obtenes los get/post/put/delete
import { TypeActions } from "./types"

const getStart = () => ({
    type: TypeActions.GET_START
})
/* const getError = (meesage: string) => ({
    type: TypeActions.GET_ERROR
}) */
const getComplete = () => ({
    type: TypeActions.GET_COMPLETE
})

const getCuotas = (
    id: number,
    numero: number,
    porcAbonado: number,
    fecha: Date,
    estadoCuenta: number,
    precioCuotaId: number,
    alumnoId: number,
    estaeliminado: string | boolean,
    
) => ({
    type: TypeActions.GET_CUOTAS,
    id,
    numero,
    porcAbonado,
    fecha,
    estadoCuenta,
    precioCuotaId,
    alumnoId,
    estaeliminado,

})

const setCuotasStore = (data: any) => ({
    type: TypeActions.SET_CUOTAS_STORE,
    data
})

const createCuotas = ( data: any ) => ({
    type: TypeActions.CREATE_CUOTAS,
    data
})

const updateCuotas = ( data: any, id: number ) => ({
    type: TypeActions.UPDATE_CUOTAS,
    data,
    id
})

const deleteCuotas = ( data: any ) => ({
    type: TypeActions.DELETE_CUOTAS,
    data
})


export const Actions = {
    getStart,
    /* getError, */
    getComplete,
    getCuotas,
    setCuotasStore,
    createCuotas,
    updateCuotas,
    deleteCuotas
}
