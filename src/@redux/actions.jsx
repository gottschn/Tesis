// Aca obtenes los get/post/put/delete
import { TypeActions } from "./types"

const getLoading = () => ({
    type: TypeActions.GET_LOADING
})

const getCarreras = (id) => ({
    type: TypeActions.GET_CARRERAS,
    payload: id
})


export {
    getLoading,
    getCarreras
}
