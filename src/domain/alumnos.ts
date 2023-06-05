import instance from "../config/axios/axios"


const getAlumnos = () => {
    return instance.get(`/alumno/ObtenerTodos`)
}


 const createAlumno = (nombre:string, apellido: string, dni: string, legajo: string, direccion: string,  mail: string, porcBeca:number, telefono: string, carrerasId: [], fechaIngreso: Date ) => {
    return instance.post(`/alumno`,{
        nombre,
        apellido,
        dni,
        legajo,
        direccion,
        mail,
        porcBeca,
        telefono,
        carrerasId,
        fechaIngreso
    })
}

const updateAlumno = (id:number, nombre:string, apellido: string, dni: string, legajo: string, direccion: string,  mail: string, porcBeca:number, telefono: string, carrerasId: [], ) => {
    return instance.put(`/alumno`,{
        id,
        nombre,
        apellido,
        dni,
        legajo,
        direccion,
        mail,
        porcBeca,
        telefono,
        carrerasId
    })
}

const deleteAlumno = (id: number) => {
    return instance.delete(`/alumno/${id}`)
} 

export {
    getAlumnos,
    createAlumno,
    updateAlumno,
    deleteAlumno
}