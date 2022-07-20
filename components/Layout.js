import React, { useContext, useEffect, useState } from 'react';
import Head  from 'next/head';
import { Box, ThemeProvider } from '@mui/system';
import { Container, createTheme, CssBaseline, Toolbar, Typography } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';
import SettingsContext from '../utils/context/SettingsContext';

const Layout = ({ children, title, seo }) => {
    const { settings } = useContext(SettingsContext);
    const sanityColors = settings[0].colorThemes;
    const companyName = settings[0].title;


    const contrastText = () => {
      const darkText = sanityColors.primaryText.contrastTextDark;
      const lightText = sanityColors.primaryText.contrastTextLight;
      const custom = sanityColors.primaryText.customContrastText;

      if(darkText === true) {
        return '#3b454e';
      } else if (lightText === true) {
        return '#ffffff';
      } else if (!custom) {
        return '#b2bac2';
      } else {
        return custom;
      }

    };

    const sanityTheme = createTheme({
        typography: {
          h1: {
            fontSize: '2.2rem',
            fontWeight: 400,
            margin: '2rem 0',
          },
          h2: {
            fontSize: '1.8rem',
            fontWeight: 400,
            margin: '1rem 0',
          },
          h3: {
            fontSize: '1.4rem',
            fontWeight: 400,
            margin: '1rem 0',
          },
        },
        palette: {
          primary: {
            main: !sanityColors.primary ? '#7d3c98' : sanityColors.primary,
            light: '#f1f3fa',
            dark: '#b4004e',
            text: contrastText()
          },
          secondary: {
            main: !sanityColors.secondary ? '#ff0080' : sanityColors.secondary,
            light: 'rgba(2, 29, 55, 0.7)',
            dark: '#283593',
            text: '#021d37'
          },
          error: {
            main: '#f04000',
          },
          background: {
            default: !sanityColors.background ? '#f1f3fa' : sanityColors.background,
            dark: '#021d37'
          },
        },
        breakpoints: {
          values: {
            xs: 0,
            vs: 500,
            sm: 680,
            md: 920,
            lg: 1200,
            xl: 1536,
          },
        },
       
      });

    

    console.log(contrastText());
    return (
        <React.Fragment>
            <Head>
              <meta charSet="utf-8" />
              <title>{`${title} | ${companyName}`}</title>
              <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1, shrink-to-fit=no"
              />
              <meta name="title" property="og:title" content={`${title} ${companyName}`} />
              <meta name="description" property="og:description" content={seo} />
            </Head>
            <ThemeProvider theme={sanityTheme}>


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
