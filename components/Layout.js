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
    const textBack = sanityColors.textBackground;
    const light = !textBack.light ? '#ffffff' : textBack.light;
    const dark = !textBack.dark ? '#000000' : textBack.dark;
    const background = !sanityColors.background ? '#f1f3fa' : sanityColors.background;

    const contrastText = (h) => {
      //convert hex to rgb
      let r = 0, g = 0, b = 0;
        // 3 digits
      if (h.length == 4) {
        r = "0x" + h[1] + h[1];
        g = "0x" + h[2] + h[2];
        b = "0x" + h[3] + h[3];

      // 6 digits
      } else if (h.length == 7) {
        r = "0x" + h[1] + h[2];
        g = "0x" + h[3] + h[4];
        b = "0x" + h[5] + h[6];
      } 
      //choose dark or light based on brightness of rgb
      if ((r*0.299 + g*0.587 + b*0.114) > 186) {
        return dark;
      } else {
        return light;
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
            text: contrastText(sanityColors.primary),
            
          },
          secondary: {
            main: !sanityColors.secondary ? '#ff0080' : sanityColors.secondary,
            text: contrastText(sanityColors.secondary)
          },
          error: {
            main: '#f04000',
          },
          background: {
            default: background,
            text: contrastText(background)
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

    

    console.log(sanityTheme.palette.primary.text);
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
