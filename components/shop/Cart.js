import React, { useContext, useRef } from 'react';
import { Button, Container, Divider, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import dynamic from 'next/dynamic';
import { CartImg, CenteredDiv, FlexStart } from '../../utils/styles';
import Link from 'next/link';
import { Box } from '@mui/system';
import Router from 'next/router';

import { StateContext } from '../../utils/context/StateContext';
import { urlFor } from '../../lib/client';


function Cart(props) {
    const { handleCartToggle } = props;
    const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove } = useContext(StateContext);
    const cartRef = useRef();


    const procceedToCheckoutHandler = () => {
    }
    const calcItems = (items) => {
        if(items === 1) {
            return `${items} Item`;
        } else {
            return `${items} Items`;
        } 
          
      }

    return (
        
        <Container fixed disableGutters={true} ref={cartRef} >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <Typography variant='h3' >Shopping Cart</Typography>
                    { cartItems.length >= 1 &&<Typography sx={{pl: 1}} variant='subtitle2' gutterBottom >{calcItems(totalQuantities)}</Typography> }
                </div>
                <IconButton onClick={handleCartToggle} >
                    <CloseIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            { cartItems.length < 1 && 
                <CenteredDiv sx={{m: 10}}>
                    <Typography variant='h6' gutterBottom>Your shopping cart is empty</Typography>
                    <Link href="/">
                        <Button
                            variant='contained'
                            onClick={() => setShowCart(false)}
                        >
                            Continue Shopping
                        </Button>
                    </Link>
               </CenteredDiv>
            }
            <TableContainer component={Paper} square sx={{ maxHeight: 'calc(100vh - 240px)', overflowY: 'auto' }}>
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
                                            <Typography variant='subtitle1' gutterBottom>{cartItem.name}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography align='right'>£{cartItem.price}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography align='left'>
                                                <FlexStart >
                                                    <span onClick={() => toggleCartItemQuanitity(cartItem._id, 'dec') }><RemoveIcon /></span>
                                                    <span>{cartItem.quantity}</span>
                                                    <span onClick={() => toggleCartItemQuanitity(cartItem._id, 'inc') }><AddIcon /></span>
                                                </FlexStart>
                                               
                                            </Typography>
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
                            <Typography>Subtotal: £{totalPrice}</Typography>
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
                            <Link href='/shop'>
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="text"
                                    color="secondary"
                                    onClick={handleCartToggle}
                                    >
                                    Continue Shopping
                                </Button> 
                            </Link>
                            
                        </Grid>

                    </Grid>
                    
                </Paper>
            
            </Container>
            

    )
}

export default Cart;
