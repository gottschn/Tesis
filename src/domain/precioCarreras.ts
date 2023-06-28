import instance from "../config/axios/axios"


const getPrecioCarreras = () => {
    return instance.get(`/preciocarrera/ObtenerTodos`)
}

const createPrecioCarreras = (monto: number, matricula: number, fecha: Date, carreraId: number) => {
    return instance.post(`/preciocarrera`,{
        monto,
        matricula,
        fecha,
        carreraId
    })
} 

const updatePrecioCarreras = (id: number ,monto: number, matricula: number, fecha: Date, carreraId: number) => {
    return instance.put(`/preciocarrera`, {
        id,
        monto,
        matricula,
        fecha,
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