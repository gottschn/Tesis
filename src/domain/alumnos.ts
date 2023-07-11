import instance from "../config/axios/axios"


const getAlumnos = () => {
    return instance.get(`/alumno/ObtenerTodos`)
}


 const createAlumno = (legajo:string, apynom: string, tipoDoc: number, nroDoc: string, 
    fechaNacimiento: Date,  direccion: string, telefono:string, mail: string, fechaIngreso: Date,
     carreraId: [], ciudadId: number, extensionId: number, codigoPostal: number ) => {
    return instance.post(`/alumno`,{
        legajo,
        apynom,
        tipoDoc,
        nroDoc,
        fechaNacimiento,
        direccion,
        telefono,
        mail,
        fechaIngreso,
        carreraId,
        ciudadId,
        extensionId,
        codigoPostal,
    })
}

const updateAlumno = (id:number,legajo:string, apynom: string, tipoDoc: number, nroDoc: string, 
    fechaNacimiento: Date,  direccion: string, telefono:string, mail: string, fechaIngreso: Date,
     carreraId: [], ciudadId: number, extensionId: number, codigoPostal: number) => {
    return instance.put(`/alumno`,{
        id,
        legajo,
        apynom,
        tipoDoc,
        nroDoc,
        fechaNacimiento,
        direccion,
        telefono,
        mail,
        fechaIngreso,
        carreraId,
        ciudadId,
        extensionId,
        codigoPostal,
    })
}

const deleteAlumno = (id: number) => {
    return instance.delete(`/alumno/${id}`)
} 

const addAlumnosMassivo = () => {
    return instance.post(`/alumno/cargamasiva`)
}

 const deleteAlumnosMassivo = (desde:Date, hasta:Date) => {
    return instance.delete(`/alumno/eliminarmasivo/${desde}, ${hasta}` )
} 


export {
    getAlumnos,
    createAlumno,
    updateAlumno,
    deleteAlumno,
    /* Masivo */
    addAlumnosMassivo,
    deleteAlumnosMassivo 
}