import React from 'react';
import { useNavigate } from 'react-router';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../css/common/header.css'
import UTNJPG from '../common/img/UTNJPG.jpg'

const Header = () => {
    const navigate = useNavigate();

    const goToPage = page => {
        navigate(page)
    }

    return (
        <>
            <Navbar className='header'>
                <img src={UTNJPG} alt="Logo" />
                <Nav className="me-auto nav nav-pills">
                    <Nav.Link  onClick={() => goToPage('/')}>Home</Nav.Link>
                    <Nav.Link className={({isActive}) => `nav-item nav-link ${isActive ? 'active': ''}`} onClick={() => goToPage('/alumnos')}>Alumnos</Nav.Link>
                    <Nav.Link className={({isActive}) => `nav-link active ${ isActive ? 'active':''}`} onClick={() => goToPage('/carreras')}>Carreras</Nav.Link>
                    <Nav.Link className={({isActive}) => `nav-item nav-link ${isActive ? 'active': ''}`} onClick={() => goToPage('/preciocuota')}>PrecioCuota</Nav.Link>
                    <Nav.Link className={({isActive}) => `nav-item nav-link ${isActive ? 'active': ''}`} onClick={() => goToPage('/cuota')}>Cuotas</Nav.Link>
                    <Nav.Link className={({isActive}) => `nav-item nav-link ${isActive ? 'active': ''}`} onClick={() => goToPage('/pago')}>Pago</Nav.Link>
                </Nav>
            </Navbar>
        </>
    );
};

export default Header;