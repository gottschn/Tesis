import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
/* Components */
import Footer from '../components/GlobalStyles/Footer'
import HeaderOld from '../components/GlobalStyles/HeaderOld'
/* Pages */
import {
    Home, AlumnosPage, CarrerasPage,
    PagoPage, PrecioCarrerasPage, CiudadesPage,
    UsuariosPage, EmpleadosPage, ExtensionesPage
} from '../pages'

export const PageRoutes = () => {
    return (
        <>
            <HeaderOld />
            <div>
                <Routes>
                    <Route path='/home' element={<Home />} />
                    <Route path='/carreras' element={<CarrerasPage />} />
                    <Route path='/alumnos' element={<AlumnosPage />} />
                    <Route path='/pago' element={<PagoPage />} />
                    <Route path='/preciocarrera' element={<PrecioCarrerasPage />} />
                    <Route path='/ciudad' element={<CiudadesPage />} />
                    <Route path='/usuarios' element={<UsuariosPage />} />
                    <Route path='/empleados' element={<EmpleadosPage />} />
                    <Route path='/extension' element={<ExtensionesPage />} />

                    <Route path="/" element={<Navigate to="/home" />} />
                </Routes>
            </div>
            <Footer />
        </>
    )
}
