import React from 'react';
import Head  from 'next/head';
import { Box, ThemeProvider } from '@mui/system';
import { Container, CssBaseline, Toolbar, Typography } from '@mui/material';
import Navbar from './Navbar';
import { theme } from '../utils/styles';
import Footer from './Footer';

const Layout = ({ children, title }) => {

    return (
        <React.Fragment>
            <Head>
                <meta charSet="utf-8" />
                <title>{`${title} | MCR Digitass`}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />

                <Navbar />
                <Container maxWidth="100%" disableGutters={true} sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} >
                    <Toolbar />
                        {children}
                    
                    <Footer />
                </Container >

            </ThemeProvider>
        </React.Fragment>
    )
}

export default Layout;
