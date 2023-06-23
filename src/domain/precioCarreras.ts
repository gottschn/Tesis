import instance from "../config/axios/axios"


const getPrecioCarreras = () => {
    return instance.get(`/preciocarrera/ObtenerTodos`)
}

const createPrecioCarreras = (monto: number, fecha: Date, carreraId: number) => {
    return instance.post(`/preciocarrera`,{
        monto,
        fecha,
        carreraId
    })
} 

const updatePrecioCarreras = (id: number ,monto: number, carreraId: number) => {
    return instance.put(`/preciocarrera`, {
        id,
        monto,
        carreraId
    })
}

const deletePrecioCarreras = (id: number) => {
    return instance.delete(`/preciocarrera/${id}`)
} 

export {
    getPrecioCarreras,
    createPrecioCarreras,
    updatePrecioCarreras,
    deletePrecioCarreras,
}