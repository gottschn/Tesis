import React from 'react';
import CarreraList from '../../components/carrera/base/CarreraList';
import '../../app/components/GlobalStyles/css/basePage.css'

export const CarrerasPage = ({...props})=> {
    return (
        <>
            <div className='app'>
                <CarreraList />
            </div>
        </>

    );
};

export default CarrerasPage;