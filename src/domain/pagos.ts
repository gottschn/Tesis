import instance from "../config/axios/axios"


const getPagos = () => {
    return instance.get(`/pago/ObtenerTodos`)
}

const createPagos = (legajo: string, cantCuota: number, monto: number, nroRecibo: number, fechaCarga: Date, fechaRecibo: Date) => {
    return instance.post(`/pago`,{
        legajo,
        cantCuota,
        monto,
        nroRecibo,
        fechaCarga,
        fechaRecibo
    })
} 

const updatePagos = (id: number , legajo: string, cantCuota: number, monto: number,
     nroRecibo: number, fechaCarga: Date, fechaRecibo: Date) => {
    return instance.put(`/pago`, {
        id,
        legajo,
        cantCuota,
        monto,
        nroRecibo,
        fechaCarga,
        fechaRecibo
    })
}

const deletePagos = (id: number) => {
    return instance.delete(`/pago/${id}`)
}

const addPagosMassivo = () => {
    return instance.post(`/pago/cargamasiva`)
}

export {
    getPagos,
    createPagos,
    updatePagos,
    deletePagos,
    addPagosMassivo
}