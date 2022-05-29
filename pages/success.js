import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";


import Layout from "../components/Layout";
import { CenteredDiv } from '../utils/styles';
import { Button, Typography } from '@mui/material';

const Success = () => {
    const [order, setOrder] = useState(null);

    const router = useRouter();
    const sessionId = router.query.session_id;


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
        getOrder(sessionId);
    }, [sessionId]);

    console.log(order);
  return (
    <Layout title="success">
        <CenteredDiv sx={{m: 10}}>
          <Typography variant='h2' gutterBottom>Success</Typography>
          <Typography variant='body1' align='center' gutterBottom></Typography>
          <Link href="/products" passHref>
            <Button variant='contained' sx={{m:3}}>
              continue shopping
            </Button>
          </Link>
        </CenteredDiv>

    </Layout>
  )
}

export default Success