import instance from "../config/axios/axios"


const getFiltros = (fechaDeCorte: Date) => {
    return instance.get(`/filtros/?fechaDeCorte=${fechaDeCorte}`)
}
export {
    getFiltros,
}