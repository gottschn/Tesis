import '../../app/components/GlobalStyles/css/basePage.css'
import React from 'react';
import AlumnoMasivoList from '../../components/alumno/base/AlumnoMasivoList';

export const AlumnosMasivoPage = () => {
    return (
        <div className='app'>
            <AlumnoMasivoList />
        </div>
    );
};

export default AlumnosMasivoPage;