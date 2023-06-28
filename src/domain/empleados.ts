import instance from "../config/axios/axios"


const getEmpleados = () => {
    return instance.get(`/empleado/ObtenerTodos`)
}


 const createEmpleado = (apynom:string, tipoDoc: number, nroDoc: string, 
    direccion: string, telefono: string,  mail: string, extensionId:number, 
    ciudadId: number, codigoPostal: number, areaTrabajo: string ) => {
    return instance.post(`/empleado`,{
        apynom,
        tipoDoc,
        nroDoc,
        direccion,
        telefono,
        mail,
        extensionId,
        ciudadId,
        codigoPostal,
        areaTrabajo
    })
}

const updateEmpleado = (id:number,apynom:string, tipoDoc: number, nroDoc: string, 
    direccion: string, telefono: string,  mail: string, extensionId:number, 
    extension: string, ciudadId: number, ciudad: string, codigoPostal: number, areaTrabajo: string) => {
    return instance.put(`/empleado`,{
        id,
        apynom,
        tipoDoc,
        nroDoc,
        direccion,
        telefono,
        mail,
        extensionId,
        extension,
        ciudadId,
        ciudad,
        codigoPostal,
        areaTrabajo
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