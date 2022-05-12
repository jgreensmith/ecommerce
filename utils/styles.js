import { Button, Card, ImageListItemBar } from '@mui/material';
import { createTheme, styled } from '@mui/material/styles';
import { Box } from '@mui/system';

export const theme = createTheme({
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
      main: '#060728',
      light: '#f1f3fa',
      dark: '#b4004e',
      text: '#fff'
    },
    secondary: {
      main: '#ff0080',
      light: 'rgba(2, 29, 55, 0.7)',
      dark: '#283593',
      text: '#021d37'
    },
    error: {
      main: '#f04000',
    },
    background: {
      default: '#f1f3fa',
      dark: '#021d37'
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      vs: 500,
      sm: 680,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
 
});
//buttons

export const FilterButton = styled(Button)(({ theme }) => ({
  
  fontSize: '1.8rem',
  color: theme.palette.primary.text,
  textTransform: 'none',
  backgroundSize: 'cover',
  backgroundPosition: 'center center !important',
  width: '135px',
  boxSizing: 'border-box',
  position: 'relative',
}));

export const MainButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.text, 
  fontSize: '1.8rem',
  ":hover": { 
    background: 'none',
    color: theme.palette.secondary.main,
  },
  textTransform: 'none',

}));

export const ThumbnailButton = styled(Button)(({ theme }) => ({
  height: '56px',
  width: '48px',
  marginBottom: 3,
  ":hover": { 
    border: '2px solid'
  },
  boxShadow: theme.shadows[2], 
  boxSizing: 'border-box',
}));

//images
export const LogoImg = styled("img")({
  maxWidth: '110px',
});

export const StyledImg = styled("img")({
  width: '100%',
});

export const PortfolioImg = styled("img")({
  width: '100%',
  height: '100%',
  maxWidth: '300px',
  maxHeight: '300px',
});
export const ProfileImg = styled("img")({
  borderRadius: '50%',
});
export const CartImg = styled("img")({
  maxWidth: '80px',
  //minHeight: '100%',

});

//containers

export const FooterBox = styled('div')({
  
});

export const FilterBox = styled(Box)(({ theme }) => ({
  
  background: theme.palette.secondary.main,
  ":hover": {
    background: 'inherit',
  },
  width: 135,
  height: 62,
  boxSizing: 'border-box',
  position: 'absolute',
  boxShadow: theme.shadows[12],
  borderRadius: 7,
  border: '2px solid black',
 
}));
export const Overlay = styled('div')(({theme}) => ({
  opacity: 0,
  ":hover": {
    opacity: 1
  },
  width: '100%',
  //height: '100%',
  float: 'left',
  bottom: 0,
  right: 0,
  zIndex: 1000,
  position: 'absolute',
  textAlign: 'center',
  paddingTop: '100%',
}));

//hero section

export const HeroBox = styled('div')({
  position: 'relative !important'
});

export const HeroSlide = styled('div')({
  minHeight: '90vh',
  backgroundSize: 'cover',
  backgroundPosition: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  backgroundColor: 'inherit',
  paddingTop: '3rem',
  paddingBottom: '3rem',
  width: '100%',
});

