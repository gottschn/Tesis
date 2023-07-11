// Aca obtenes los get/post/put/delete
import { TypeActions } from "./types"

const getStart = () => ({
    type: TypeActions.GET_START
})
const getComplete = () => ({
    type: TypeActions.GET_COMPLETE
})

const getFiltros = (fechaDeCorte: Date, 
) => ({
    type: TypeActions.GET_FILTROS,
    fechaDeCorte,
})

export const Actions = {
    getStart,
    getComplete,
    getFiltros,

}
