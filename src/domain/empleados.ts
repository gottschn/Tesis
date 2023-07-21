import instance from "../config/axios/axios"


const getEmpleados = () => {
    return instance.get(`/empleado/ObtenerTodos`)
}


 const createEmpleado = (apynom:string, tipoDoc: number, nroDoc:string, 
    fechaNacimiento: Date, direccion: string, telefono: string, mail: string,
    areaTrabajo:string, ciudadId:number, extensionId:number ) => {
    return instance.post(`/Empleado`,{
        apynom,
        tipoDoc,
        nroDoc,
        fechaNacimiento,
        direccion,
        telefono,
        mail,
        areaTrabajo,
        ciudadId,
        extensionId,
    })
}

const updateEmpleado = (id:number, apynom:string, tipoDoc: number | string, nroDoc: string, 
    fechaNacimiento: Date, direccion: string, telefono: string,  mail: string,
    areaTrabajo: string, ciudadId: number, extensionId:number) => {
    return instance.put(`/empleado`,{
        id,
        apynom,
        tipoDoc,
        nroDoc,
        fechaNacimiento,
        direccion,
        telefono,
        mail,
        areaTrabajo,
        ciudadId,
        extensionId
    })
}

const deleteEmpleado = (id: number) => {
    return instance.delete(`/empleado/${id}`)
} 

export {
    getEmpleados,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado
}