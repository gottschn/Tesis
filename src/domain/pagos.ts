import instance from "../config/axios/axios"


const getPagos = () => {
    return instance.get(`/pago/ObtenerTodos`)
}

const createPagos = (legajo: string, cantCuota: number, monto: number, nroRecibo: number, fechaCarga: Date, fechaRecibo: Date) => {
    return instance.post(`/pago`,{
        legajo,
        monto,
        cantCuota,
        nroRecibo,
        fechaCarga,
        fechaRecibo
    })
} 

const updatePagos = (id:number, legajo: string, monto:number, nroRecibo:number) => {
    return instance.put(`/pago`, {
        id,
        legajo,
        monto,
        nroRecibo,
    })
}

const deletePagos = (id: number) => {
    return instance.delete(`/pago/${id}`)
}

const addPagosMassivo = () => {
    return instance.post(`/pago/cargamasiva`)
}

const deletePagosMassivo = (desde:Date, hasta:Date) => {
    return instance.delete(`/pago/eliminarmasivo/?desde=${desde}&hasta=${hasta}` )
} 

export {
    getPagos,
    createPagos,
    updatePagos,
    deletePagos,
    addPagosMassivo,
    deletePagosMassivo
}