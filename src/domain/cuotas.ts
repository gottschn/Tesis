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

const updateCuotas = (id: number, numero:number, alumnoId:number,  precioCuotaId: number) => {
    return instance.put(`/cuota`, {
        id,
        numero,
        alumnoId,
        precioCuotaId,
    })
}

const deleteCuotas = (id: number) => {
    return instance.delete(`/cuota/${id}`)
} 


export {
    getCuotas,
    createCuotas,
    updateCuotas,
    deleteCuotas

}