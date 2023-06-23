import instance from "../config/axios/axios"

const getCiudades = () => {
    return instance.get(`/ciudad/ObtenerTodos`)
}


const createCiudades = (descripcion: string) => {
    return instance.post(`/ciudad`,{
        descripcion,
    })
} 

const updateCiudades = (id: number, descripcion: string) => {
    return instance.put(`/ciudad`, {
        id,
        descripcion,
    })
}

const deleteCiudades = (id: number) => {
    return instance.delete(`/ciudad/${id}`)
} 



export {
    getCiudades,
    createCiudades,
    updateCiudades,
    deleteCiudades
}