import instance from "../config/axios/axios"

const getExtensiones = () => {
    return instance.get(`/extension/ObtenerTodos`)
}

const createExtensiones = (descripcion: string) => {
    return instance.post(`/extension`,{
        descripcion,
    })
} 

const updateExtensiones = (id: number, descripcion: string) => {
    return instance.put(`/extension`, {
        id,
        descripcion,
    })
}

const deleteExtensiones= (id: number) => {
    return instance.delete(`/extension/${id}`)
} 



export {
    getExtensiones,
    createExtensiones,
    updateExtensiones,
    deleteExtensiones
}