import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";

import { Alert, Button, Dialog, Typography, useMediaQuery, useTheme } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import Layout from "../components/Layout";
import { CenteredDiv } from '../utils/styles';
import Order from '../components/shop/Order';
import { useStateContext } from '../utils/context/StateContext';

const Success = () => {
    const [order, setOrder] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();


    const router = useRouter();
    const sessionId = router.query.session_id;

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


    const getOrder = async (id) => {
       if (id) {
            const data = await fetch(`/api/success?session_id=${id}`, {
                method: 'GET'
            })
            .then((res) => res.json())
            .then((json) => json);

            const newDataArr = [data];
            setOrder(newDataArr[0]);
        } 


    }
    

    useEffect(() => {
      localStorage.clear();
      setCartItems([]);
      setTotalPrice(0);
      setTotalQuantities(0);
      getOrder(sessionId);
    }, [sessionId]);

    //console.log(order);
  return (
    <Layout title="success">

      { !order && (
        <CenteredDiv>
          <Typography variant='h2' gutterBottom>Loading...</Typography>
        </CenteredDiv>
        )}
      { order && (

      <React.Fragment>
        <CenteredDiv sx={{m: 10}}>
          <Alert sx={{ display: 'flex', justifyContent: 'center', border: '1px solid green', p: {vs: '0 40px', sm: '0 70px'}}} icon={<CheckCircleOutlineIcon sx={{m: 'auto'}} />} severity='success'>
            <Typography variant='h2' align='center' sx={{width: '100%'}} >Payment Successful</Typography>
          </Alert>
          <Typography sx={{mt: 2}} variant='body1' align='center' gutterBottom> Thankyou {order.customer.name} for your order! You will receive an email confirmation soon.</Typography>
          <Button variant='contained' sx={{m:3}} onClick={() => setModalOpen(true)}>
              view order details
          </Button>
          
          
          <Link href="/products" passHref>
            <Button variant='text' sx={{m:3}}>
              continue shopping
            </Button>
          </Link>
        </CenteredDiv>
        <Dialog 
        open={modalOpen}
        fullScreen={fullScreen}
        onClose={() => setModalOpen(false)}
        >
            <Order order={order} setModalOpen={setModalOpen}/>
            
        </Dialog>
    </React.Fragment>
)}
    </Layout>
  )
}

export default Success