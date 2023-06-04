import instance from "../config/axios/axios"


const getPagoCuotas = () => {
    return instance.get(`/pago/ObtenerTodos`)
}

const createPrecioCuotas = (monto: number, fecha: Date, carreraId: number) => {
    return instance.post(`/pago`,{
        monto,
        fecha,
        carreraId
    })
} 

const updatePrecioCuotas = (id: number ,monto: number, carreraId: number) => {
    return instance.put(`/pago`, {
        id,
        monto,
        carreraId
    })
}

const deletePagoCuotas = (id: number) => {
    return instance.delete(`/pago/${id}`)
} 

export {
    getPagoCuotas,
    createPrecioCuotas,
    updatePrecioCuotas,
    deletePagoCuotas
}