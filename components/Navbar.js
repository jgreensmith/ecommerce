import React, { useContext, useState } from 'react';
import NextLink from 'next/link';

import {
    AppBar,
    Badge,
    Button,
    CircularProgress,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Slide,
    Toolbar,
    Tooltip,
    Typography,
    useScrollTrigger
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box } from '@mui/system';

import { LogoImg, MainButton } from '../utils/styles';
import Cart from './shop/Cart';
import { useStateContext } from '../utils/context/StateContext';
import TitleContext from '../utils/context/TitleContext';



function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}



const drawerWidth = 250;
const cartWidth = 500;

const Navbar = (props) => {

    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const { totalQuantities } = useStateContext();
    const { companyName } = useContext(TitleContext);


    //console.log(totalQuantities);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    
    const handleCartToggle = () => {
        setCartOpen(!cartOpen)
    }

    const links = {
        about: "About",
        products: "Shop",
    }


    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {Object.keys(links).map((link) => (
                    <NextLink key={link} href={`/${link}`} >
                        <ListItemButton href={`/${link}`}>
                            <ListItemText primary={links[link]} />
                        </ListItemButton>
                    </NextLink>
                ))}
            </List>
        </div>
    );
    

    const container = window !== undefined ? () => window().document.body : undefined;


    return (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar sx={{ bgcolor: 'primary.main' }}>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <IconButton
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' }, color: 'primary.text' }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <NextLink href="/">
                            <MainButton >
                                {companyName}
                                
                            </MainButton>
                        </NextLink>
                        <List sx={{ display: { sm: "flex", xs: "none" }, ml: 'auto', mr: 3 }}>
                            {Object.keys(links).map((link) => (
                                <NextLink key={link} href={`/${link}`}>
                                    <ListItemButton href={`/${link}`} >
                                        <ListItemText 
                                            primary={links[link]} 
                                            disableTypography={true} 
                                            sx={{ 
                                                fontSize: '1.2rem', 
                                                color: 'primary.text',
                                                ":hover": { 
                                                    background: 'none',
                                                    color: 'secondary.main',
                                                }, 
                                            }}
                                        />
                                    </ListItemButton>
                                </NextLink>
                            ))}
                        </List>
                        { totalQuantities > 0 ? (
                            <Badge badgeContent={totalQuantities} >
                                <Tooltip title="View Cart">
                                    <IconButton                         
                                        onClick={handleCartToggle}
                                    >
                                        <ShoppingCartIcon sx={{ color: 'primary.text' }} />
                                    </IconButton>
                                </Tooltip>
                            </Badge>   
                        ) : (
                            <Tooltip title="View Cart">
                                <IconButton                         
                                    onClick={handleCartToggle}
                                >
                                    <ShoppingCartIcon sx={{ color: 'primary.text' }} />
                                </IconButton>
                            </Tooltip>
                        )}

                        </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                        disableScrollLock: true
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="nav"
                sx={{ width: { xs: '80%', sm: cartWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    anchor='right'
                    variant="temporary"
                    open={cartOpen}
                    onClose={handleCartToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                        disableScrollLock: true,
                    }}
                    sx={{
                        display: { xs: 'block'},
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: { xs: '100%', vs: '80%', sm: cartWidth } },
                    }}
                >
                    <Cart 
                        handleCartToggle={handleCartToggle}
                    />
                </Drawer>
            </Box>
        </React.Fragment>

    )
}

export default Navbar;
