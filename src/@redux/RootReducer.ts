import { combineReducers } from "redux" 

import { Reducer as CarreraReducer } from "./carreras"
import { Reducer as PrecioCuotaReducer} from "./precioCuotas"
import { Reducer as AlumnosReducer }    from "./alumno"
import { Reducer as CuotasReducer }    from "./cuotas"
import { Reducer as PagoCuotasReducer }    from "./PagoCuota"
import { Reducer as ReducerAuth } from './Auth'

const RootReducer = combineReducers({

    carreras: CarreraReducer,
    precioCuota: PrecioCuotaReducer,
    alumnos: AlumnosReducer,
    cuotas: CuotasReducer,
    pagoCuotas: PagoCuotasReducer,
    auth: ReducerAuth,

})

export type RootStateProps = ReturnType<typeof RootReducer>;

export {
    RootReducer
}