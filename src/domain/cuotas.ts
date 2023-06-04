//import { CarreraEntity } from "../context/carrera/types";

import instance from "../config/axios/axios"


const getCuotas = () => {
    return instance.get(`/cuota/ObtenerTodos`)
}


const createCuotas = (numero: number, alumnoId: number, precioCuotaId: number) => {
    return instance.post(`/cuota`,{
        numero,
        alumnoId,
        precioCuotaId
    })
} 


export {
    getCuotas,
    createCuotas,
}