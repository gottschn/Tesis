import { combineReducers } from "redux" 

import { Reducer as CarreraReducer } from "./carreras"
import { Reducer as PrecioCarrerasReducer} from "./precioCarrera"
import { Reducer as AlumnosReducer }    from "./alumno"
import { Reducer as CuotasReducer }    from "./cuotas"
import { Reducer as PagoCuotasReducer }    from "./PagoCuota"
import { Reducer as ReducerAuth } from './Auth'
import { Reducer as ReducerCiudades } from './ciudad'
import { Reducer as ReducerExtensiones } from './extension'
 /* import { Reducer as ReducerUsuarios } from './usuario'
import { Reducer as ReducerEmpleados } from './empleado' */ 

const RootReducer = combineReducers({

    carreras: CarreraReducer,
    precioCarrera: PrecioCarrerasReducer,
    alumnos: AlumnosReducer,
    cuotas: CuotasReducer,
    pagoCuotas: PagoCuotasReducer,
    auth: ReducerAuth,
    ciudades: ReducerCiudades,
    extensiones: ReducerExtensiones,
    /* usuarios: ReducerUsuarios,
    empleados: ReducerEmpleados, */ 

})

export type RootStateProps = ReturnType<typeof RootReducer>;

export {
    RootReducer
}