import { Grid, Typography } from '@mui/material';
import React from 'react';
import './css/GlobalStyle.css'
import UTNLOGO from '../../components/img/logoutnwhite.png'

const Footer = () => {
    return (
        <footer className='footerStyle'>
            <Grid container className='footerNames'>
                <Grid item>
                    <a href="https://utn.edu.ar/es/">
                        <img
                            width={120}
                            src={UTNLOGO}
                            alt="Logo UTN"
                        />
                    </a>
                </Grid>
                <Grid item>
                    <Typography variant='caption'>
                        {`Copyright © ${new Date().getFullYear()} Universidad Tecnológica Nacional`}
                    </Typography>
                </Grid>
            </Grid>
        </footer>
    );
};

export default Footer;
