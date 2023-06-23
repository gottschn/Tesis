import instance from "../config/axios/axios"

const getUsuarios = () => {
    return instance.get(`/usuario/ObtenerTodos`)
}


const createUsuarios = (nombre: string, password: string, rol: number, personaId: number) => {
    return instance.post(`/usuario`,{
        nombre,
        password,
        rol,
        personaId
    })
} 

const updateUsuarios = (id: number,nombre: string, password: string, rol: number, personaId: number) => {
    return instance.put(`/usuario`, {
        id,
        nombre,
        password,
        rol,
        personaId
    })
}

const deleteUsuarios = (id: number) => {
    return instance.delete(`/usuario/${id}`)
} 



export {
    getUsuarios,
    createUsuarios,
    updateUsuarios,
    deleteUsuarios
}