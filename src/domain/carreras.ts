import instance from "../config/axios/axios"

const getCarreras = () => {
    return instance.get(`/carrera/ObtenerTodos`)
}


const createCarreras = (descripcion: string, cantCuotas: number) => {
    return instance.post(`/carrera`,{
        descripcion,
        cantCuotas
    })
} 

const updateCarreras = (id: number,descripcion: string, cantCuotas: number) => {
    return instance.put(`/carrera`, {
        id,
        descripcion,
        cantCuotas
    })
}

const deleteCarreras = (id: number) => {
    return instance.delete(`/carrera/${id}`)
} 



export {
    getCarreras,
    createCarreras,
    updateCarreras,
    deleteCarreras
}