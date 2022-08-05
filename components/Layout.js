import React, { useContext } from 'react';
import Head  from 'next/head';
import { Box, ThemeProvider } from '@mui/system';
import { Container, createTheme, CssBaseline, Toolbar, Typography } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';
import SettingsContext from '../utils/context/SettingsContext';

const Layout = ({ children, title, seo }) => {
    const { settings } = useContext(SettingsContext);
    // //themes chosen from default palette
    
    const companyName = settings[0].title;
    const customColors = settings[0].colorThemes;
    const chosenPalette = JSON.parse(settings[0].defaultThemes);

    const contrastText = (h, dark, light) => {
      //convert hex to rgb
      let r = 0, g = 0, b = 0;
      
      if(!h) {
        return;
      }
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
    

    const defaultTheme = {
      primary: {
        main: "#d4c3e9",
        text: "#000000"
      },
      secondary: {
        main: "#28c3d1",
        text: '#000000'
      },
      error: {
        main: '#f04000',
      },
      background: {
        default: "#f1f3fa",
        text: "#000000"
      },
      text: {
        dark: "#000000",
        light: "#ffffff"  
      }
    }
    const muiChosenPalette = {
      primary: {
        main: chosenPalette?.primary,
        text: contrastText(chosenPalette?.primary, chosenPalette?.dark, chosenPalette?.light)
      },
      secondary: {
        main: chosenPalette?.secondary,
        text: contrastText(chosenPalette?.secondary, chosenPalette?.dark, chosenPalette?.light)
      },
      error: {
        main: '#f04000'
      },
      background: {
        default: chosenPalette?.background,
        text: contrastText(chosenPalette?.background, chosenPalette?.dark, chosenPalette?.light)
      },
      text: {
        light: chosenPalette?.light,
        dark: chosenPalette?.dark
      }
    }

    const muiCustomColors = {
      primary: {
        main: customColors?.primary,
        text: contrastText(customColors?.primary, customColors?.dark, customColors?.light),
        
      },
      secondary: {
        main: customColors?.secondary,
        text: contrastText(customColors?.secondary, customColors?.dark, customColors?.light)
      },
      error: {
        main: '#f04000',
      },
      background: {
        default: customColors?.background,
        text: contrastText(customColors?.background, customColors?.dark, customColors?.light)
      },
      text: {
        light: customColors?.light,
        dark: customColors?.dark
      }
    }
   

    const colorSorter = () => {


        if(!customColors && chosenPalette) {
          console.log('muiChosenPalette');
          return muiChosenPalette;
        
        } else if (customColors) {
          console.log('muiCustomPalette');
          return muiCustomColors;
        } else {
          console.log('defaultTheme');
          return defaultTheme;

        }
      
    }

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
        palette: colorSorter(),
 
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

    

  //console.log(sanityTheme.palette);
  //console.log(settings)
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
