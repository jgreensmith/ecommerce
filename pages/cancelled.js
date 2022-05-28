import React from 'react';
import Link from 'next/link';

import Layout from "../components/Layout";
import { CenteredDiv } from '../utils/styles';
import { Button, Typography } from '@mui/material';


const Cancelled = () => {
  return (
    <Layout title="cancelled">
        <CenteredDiv sx={{m: 10}}>
          <Typography variant='h2' gutterBottom>Checkout Cancelled</Typography>
          <Typography variant='body1' align='center' gutterBottom>Your basket items would still be available if I had added to them to local storage but i havent yet so get off my back. In my defense you're a moron for going to checkout when you're not ready</Typography>
          <Link href="/products" passHref>
            <Button variant='contained' sx={{m:3}}>
              back to shop
            </Button>
          </Link>
        </CenteredDiv>

    </Layout>
  )
}

export default Cancelled