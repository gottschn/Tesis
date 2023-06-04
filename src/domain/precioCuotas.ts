import instance from "../config/axios/axios"


const getPrecioCuotas = () => {
    return instance.get(`/preciocuota/ObtenerTodos`)
}

const createPrecioCuotas = (monto: number, fecha: Date, carreraId: number) => {
    return instance.post(`/preciocuota`,{
        monto,
        fecha,
        carreraId
    })
} 

const updatePrecioCuotas = (id: number ,monto: number, carreraId: number) => {
    return instance.put(`/preciocuota`, {
        id,
        monto,
        carreraId
    })
}

const deletePrecioCuotas = (id: number) => {
    return instance.delete(`/preciocuota/${id}`)
} 

export {
    getPrecioCuotas,
    createPrecioCuotas,
    updatePrecioCuotas,
    deletePrecioCuotas
}