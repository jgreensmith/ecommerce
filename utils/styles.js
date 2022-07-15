import { Button, Card, ImageListItemBar, Grid } from '@mui/material';
import { createTheme, styled } from '@mui/material/styles';
import { Box } from '@mui/system';


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
export const ShrekImg = styled("img")({
  
});

export const StyledImg = styled("img")({
  width: '100%',
  borderRadius: '15px',
  backgroundColor: '#ebebeb',
});

export const PortfolioImg = styled("img")({
  width: '100%',
  height: '100%',
  maxWidth: '300px',
  maxHeight: '300px',
  borderRadius: '7px',

});
export const ProfileImg = styled("img")({
  borderRadius: '50%',
});
export const CartImg = styled("img")({
  maxWidth: '80px',
  //minHeight: '100%',

});

//containers
export const Div = styled('div')({
  
});
export const CenteredDiv = styled('div')({
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center',
  flexDirection: 'column'
});
export const FlexEnd = styled('div')({
  display: 'flex',
  justifyContent: 'end',
  paddingRight: 2,
  width: '100%'
});
export const FlexStart = styled('div')({
  display: 'flex', 
  justifyContent: 'start'
});
export const FlexSpace = styled('div')({
  display: 'flex', 
  justifyContent: 'space-between',
  width: '100%'
});


export const CenteredGrid = styled(Grid)({
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center'
});

export const PortfolioCard = styled('div')(({theme}) => ({
  width: '300px',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  margin: '10px',
}));
export const PortfolioCardBody = styled('div')(({theme}) => ({
  width: '300px'
}));
export const CardBanner = styled('div')(({theme}) => ({
  width: '95%',
  position: 'absolute',
  marginBottom:  '5px',
  padding: '7px 10px',
  display: 'flex',
  alignItems: 'center',
  background: theme.palette.background.dark,
  backdropFilter: 'blur(10px)',
  borderRadius: '10px',
  
  opacity: 0,
  transition: 'all 0.4s'
}));

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

