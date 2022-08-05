import React from 'react';
import Link from 'next/link';

import { Alert, Button, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Layout from "../components/common/Layout";
import { CenteredDiv } from '../utils/styles';


const Cancelled = () => {
  return (
    <Layout title="cancelled">
        <CenteredDiv sx={{m: 10}}>
          <Alert sx={{ display: 'flex', justifyContent: 'center', border: '1px solid red', p: {vs: '0 40px', sm: '0 70px'}}} icon={<ErrorOutlineIcon sx={{m: 'auto'}} />} severity="error" >
            <Typography variant='h2' align='center' sx={{width: '100%'}} >Checkout Cancelled</Typography>
          </Alert>
          <Typography variant='body1' align='center' sx={{mt: 2}} gutterBottom>Your items are still available in your basket.</Typography>
          <Link href="/products" passHref>
            <Button variant='contained' sx={{m:3}}>
              continue shopping
            </Button>
          </Link>
        </CenteredDiv>

    </Layout>
  )
}

export default Cancelled