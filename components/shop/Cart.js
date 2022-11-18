import React, { useRef } from 'react';
import { Button, Container, Divider, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import dynamic from 'next/dynamic';
import { CartImg, CenteredDiv, FlexStart } from '../../utils/styles';
import Link from 'next/link';
import { Box } from '@mui/system';
import Router, { useRouter } from 'next/router';

import { useStateContext } from '../../utils/context/StateContext';
import { urlFor } from '../../lib/sanity';
import getStripe from '../../lib/getStripe';
import toast from 'react-hot-toast';


function Cart(props) {
    const { handleCartToggle } = props;
    const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove } = useStateContext();
    const router = useRouter()
    const pid = router.query.pid 

    const checkoutHandler = async () => {
        //const stripe = await getStripe();

        await fetch('/api/stripe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({cartItems, pid}),
        })
        .then((res) => res.json)
        .then((data) => {
            if(data.error) {
                console.log(data.error)
            } else {
                router.push(data.url)
            }
        })

        // if(response.statusCode === 500) return;

        // const data = await response.json();

        toast.loading('Redirecting...');

        //stripe.redirectToCheckout({ sessionId: data.id });
    }

    const calcItems = (items) => {
        if(items === 1) {
            return `(${items} Item)`;
        } else {
            return `(${items} Items)`;
        } 
          
      }
    console.log(cartItems)
    return (
        
        <Container fixed  >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <FlexStart >
                    <Typography variant='h3' >Your Cart</Typography>
                    { cartItems.length >= 1 &&<Typography sx={{pl: 2, mt: 2, pt: '3px'}}  variant='subtitle2' gutterBottom >{calcItems(totalQuantities)}</Typography> }
                </FlexStart>
                <IconButton onClick={handleCartToggle} >
                    <CloseIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            { cartItems.length < 1 && 
                <CenteredDiv sx={{m: 10}}>
                    <Typography variant='h6' gutterBottom>Your shopping cart is empty</Typography>
                    <Link href="/products">
                        <Button
                            variant='contained'
                            onClick={() => setShowCart(false)}
                        >
                            Continue Shopping
                        </Button>
                    </Link>
               </CenteredDiv>
            }
            <TableContainer component={Paper} elevation={0} square sx={{ maxHeight: 'calc(100vh - 240px)', overflowY: 'auto' }}>
                <Table >
                    <TableBody >
                        {cartItems.length >= 1 && cartItems.map((cartItem) => (
                            <TableRow  key={cartItem._id}>
                                <TableCell 
                                    align='left' 
                                    sx={{ width: '80px', padding: '5px' }} 
                                >
                                    <CartImg src={urlFor(pid, cartItem?.mainImage)} />
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
                                                    color="error"
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
                                onClick={checkoutHandler}
                                >
                                    Proceed to checkout
                                </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Link href='/products'>
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
