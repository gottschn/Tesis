import instance from "../config/axios/axios"


const getPagoCuotas = () => {
    return instance.get(`/pago/ObtenerTodos`)
}

const createPagoCuotas = (monto: number, cuotaId: number) => {
    return instance.post(`/pago`,{
        monto,
        cuotaId
    })
} 

const updatePagoCuotas = (id: number ,monto: number, cuotaId: number) => {
    return instance.put(`/pago`, {
        id,
        monto,
        cuotaId
    })
}

const deletePagoCuotas = (id: number) => {
    return instance.delete(`/pago/${id}`)
} 

export {
    getPagoCuotas,
    createPagoCuotas,
    updatePagoCuotas,
    deletePagoCuotas
}