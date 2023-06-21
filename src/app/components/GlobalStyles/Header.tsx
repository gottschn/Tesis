import * as React from 'react';
import { NavLink } from 'react-router-dom';
/* Component */
import UTNJPG from '../../../app/components/img/UTNJPG.jpg'
/* Mui */
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import './css/GlobalStyle.css'

const Header = () =>  {
    return (
        <Box className='header'  sx={{ flexGrow: 1 }}>
        <AppBar className='header' position="static">
          <Toolbar >
            {<img src={UTNJPG} alt="Logo" />}
            <Typography variant="subtitle1" component="div" >
              <NavLink className={({isActive}) => `nav-link active ${ isActive ? 'active':''}`} to={'/home'}>Home</NavLink>
            </Typography>
            <Typography variant="subtitle1" component="div" >
              <NavLink className={({isActive}) => `nav-link active ${ isActive ? 'active':''}`} to={'/alumnos'}>Alumnos</NavLink>
            </Typography>
            <Typography variant="subtitle1" component="div" >
              <NavLink className={({isActive}) => `nav-link active ${ isActive ? 'active':''}`} to={'/carreras'}>Carreras</NavLink>
            </Typography>
            <Typography variant="subtitle1" component="div" >
              <NavLink className={({isActive}) => `nav-link active ${ isActive ? 'active':''}`} to={'/preciocuota'}>Precio Carrera</NavLink>
            </Typography>
            <Typography variant="subtitle1" component="div" >
              <NavLink className={({isActive}) => `nav-link active ${ isActive ? 'active':''}`} to={'/cuota'}>Cuotas</NavLink>
            </Typography>
            <Typography variant="subtitle1" component="div" >
              <NavLink className={({isActive}) => `nav-link active ${ isActive ? 'active':''}`} to={'/pago'}>Pago</NavLink>
            </Typography>
            <Typography variant="subtitle1" component="div" className=''>
              <Button color="inherit" component = "div">Login</Button>
            </Typography>
            
          </Toolbar>
        </AppBar>
      </Box>
    );
}
export default Header;