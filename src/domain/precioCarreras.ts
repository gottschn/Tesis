import instance from "../config/axios/axios"


const getPrecioCarreras = () => {
    return instance.get(`/preciocuota/ObtenerTodos`)
}

const createPrecioCarreras = (monto: number, fecha: Date, carreraId: number) => {
    return instance.post(`/preciocuota`,{
        monto,
        fecha,
        carreraId
    })
} 

const updatePrecioCarreras = (id: number ,monto: number, carreraId: number) => {
    return instance.put(`/preciocuota`, {
        id,
        monto,
        carreraId
    })
}

const deletePrecioCarreras = (id: number) => {
    return instance.delete(`/preciocuota/${id}`)
} 

export {
    getPrecioCarreras,
    createPrecioCarreras,
    updatePrecioCarreras,
    deletePrecioCarreras,
}