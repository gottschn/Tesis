import React from 'react';
import { useNavigate } from 'react-router';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './css/GlobalStyle.css'
import UTNJPG from '../../../app/components/img/UTNJPG.jpg'

const Header = () => {
    const navigate = useNavigate();

    const goToPage = page  => {
        navigate(page)
    }

    return (
        <>
            <Navbar className='header'>
                <img src={UTNJPG} alt="Logo" />
                <Nav className="me-auto nav nav-pills">
                    <Nav.Link  onClick={() => goToPage('/home')}>Home</Nav.Link>
                    <Nav.Link className={({isActive}) => `nav-item nav-link ${isActive ? 'active': ''}`}
                     onClick={() => goToPage('/alumnos')}>Alumnos</Nav.Link>
                    <Nav.Link className={({isActive}) => `nav-link active ${ isActive ? 'active':''}`} 
                    onClick={() => goToPage('/carreras')}>Carreras</Nav.Link>
                    <Nav.Link className={({isActive}) => `nav-item nav-link ${isActive ? 'active': ''}`}
                     onClick={() => goToPage('/preciocarrera')}>Precio Carreras</Nav.Link>
                    <Nav.Link className={({isActive}) => `nav-item nav-link ${isActive ? 'active': ''}`}
                     onClick={() => goToPage('/pago')}>Pagos</Nav.Link>
                    <Nav.Link className={({isActive}) => `nav-item nav-link ${isActive ? 'active': ''}`}
                     onClick={() => goToPage('/ciudad')}>Ciudades</Nav.Link>
                    <Nav.Link className={({isActive}) => `nav-item nav-link ${isActive ? 'active': ''}`}
                     onClick={() => goToPage('/extension')}>Extensiones</Nav.Link>
                    <Nav.Link className={({isActive}) => `nav-item nav-link ${isActive ? 'active': ''}`} 
                    onClick={() => goToPage('/usuarios')}>Usuarios</Nav.Link>
                    <Nav.Link className={({isActive}) => `nav-item nav-link ${isActive ? 'active': ''}`}
                     onClick={() => goToPage('/empleados')}>Empleados</Nav.Link> 
                </Nav>
            </Navbar>
        </>
    );
};

export default Header;