// Aca obtenes los get/post/put/delete
import { TypeActions } from "./types"

const getLoading = () => ({
    type: TypeActions.GET_LOADING
})

const getCarreras = (id,descripcion,cantCuotas) => ({
    type: TypeActions.GET_CARRERAS,
    payload: id,descripcion,cantCuotas
})


export {
    getLoading,
    getCarreras
}
