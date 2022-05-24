import React, { useContext, useRef } from 'react';
import { Button, Container, Divider, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import dynamic from 'next/dynamic';
import { CartImg } from '../../utils/styles';
import NextLink from 'next/link';
import { Box } from '@mui/system';
import Router from 'next/router';

import { StateContext } from '../../utils/context/StateContext';
import { urlFor } from '../../lib/client';


function Cart(props) {
    const { handleCartToggle } = props;
    const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove } = useContext(StateContext);
    const cartRef = useRef();

    const removeFromCartHandler = async () => {
        
    };

    const procceedToCheckoutHandler = () => {
    }

    return (
        
        <Container fixed disableGutters={true} ref={cartRef} >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Shopping Cart</Typography>
                <IconButton onClick={handleCartToggle} >
                    <CloseIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 240px)', overflowY: 'auto', paddingBottom: 1 }}>
                <Table >
                    <TableBody >
                        {cartItems.length >= 1 && cartItems.map((cartItem) => (
                            <TableRow key={cartItem._id}>
                                <TableCell 
                                    align='left' 
                                    sx={{ width: '80px', padding: '5px' }} 
                                >
                                    <CartImg src={urlFor(cartItem?.image[0])} />
                                </TableCell>
                                <TableCell>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography>{cartItem.name}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography align='right'>£{cartItem.price}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography>Quantity: {cartItem.quantity}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography align='right'>
                                                <Button
                                                    onClick={() => onRemove(cartItem)}
                                                    variant="text"
                                                    color="secondary"
                                                    sx={{padding: 0}}
                                                >
                                                    Remove
                                                </Button>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        ))}
                        
                    </TableBody>
                </Table>
            </TableContainer>
                
            
            
                <Paper sx={{ position: 'absolute', bottom: 0, right: 0, left: 0, padding: '50px 30px' }} elevation={3}>
                    
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography>Subtotal: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                                <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                onClick={procceedToCheckoutHandler}
                                >
                                    Proceed to checkout
                                </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <NextLink href='/shop'>
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="text"
                                    color="secondary"
                                    onClick={handleCartToggle}
                                    >
                                    Continue Shopping
                                </Button> 
                            </NextLink>
                            
                        </Grid>

                    </Grid>
                    
                </Paper>
            
            </Container>
            

    )
}

export default Cart;
