import React from 'react';
import UTNJPG from '../../app/components/img/UTNJPG.jpg'
import '../../css/entities/carrera/carrera.css'
export const Home = () => {
    return (
        <>
            <div className='title'>
                <h1>Bienvenido a la Pagina </h1>
            </div>

            <div className='title'>
                <img src={UTNJPG} alt="Logo" />
            </div>
        </>
    );
};

export default Home;