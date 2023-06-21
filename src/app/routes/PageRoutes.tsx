import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Home, AlumnosPage, CarrerasPage, PagoCuotasPage, PagoPage, PrecioCarrerasPage } from '../pages'
import Footer from '../components/GlobalStyles/Footer'
import HeaderOld from '../components/GlobalStyles/HeaderOld'

export const PageRoutes = () => {
    return (
        <>
            <HeaderOld />
            <div>
                <Routes>
                    <Route path='/home' element={<Home />} />
                    <Route path='/carreras' element={<CarrerasPage/>} />
                    <Route path='/alumnos' element={<AlumnosPage />} />
                    <Route path='/cuota' element={<PagoCuotasPage />} />
                    <Route path='/pago' element={<PagoPage />} />
                    <Route path='/precioCuota' element={<PrecioCarrerasPage />} />


                    <Route path="/" element={<Navigate to="/home" />} />
                </Routes>
            </div>
            <Footer />
        </>
    )
}
