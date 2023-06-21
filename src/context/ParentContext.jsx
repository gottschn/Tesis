import React from 'react';
import AlumnoProvider from './alumno/AlumnoProvider';
import CarrerasProvider from './carrera/CarrerasProvider';
import PrecioCuoProvider from './precioCuota/PrecioCuoProvider';
import AlumCarreraProvider from './alumCarrera/AlumCarreraProvider';
import PagoCuotaProvider from './pagoCuota/PagoCuotaProvider';

const ParentContext = ({ children }) => {
    return (
        <PrecioCuoProvider>
            <CarrerasProvider>
                <AlumnoProvider>
                    <AlumCarreraProvider>
                            <PagoCuotaProvider>
                                {children}
                            </PagoCuotaProvider>
                    </AlumCarreraProvider>
                </AlumnoProvider>
            </CarrerasProvider>
        </PrecioCuoProvider>
    );
};

export default ParentContext;