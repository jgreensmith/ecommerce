import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";

import { Alert, Button, Dialog, Typography, useMediaQuery, useTheme } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import Layout from "../../../components/common/Layout";
import { CenteredDiv } from '../../../utils/styles';
import { getConnectId, getPidObj, getPids } from "../../../lib/mongoHelpers";
import Order from '../../../components/shop/Order';
import { useStateContext } from '../../../utils/context/StateContext';
import filterDataToSingleItem from '../../../utils/functions';
import { groq } from 'next-sanity';
import { getClient } from '../../../lib/sanity.server';

const Success = ({settings, connectId}) => {
    const [order, setOrder] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();


    const router = useRouter();
    const sessionId = router.query.session_id;

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const getOrder = async (id, x) => {
       if (id) {
            const data = await fetch(`/api/success?session_id=${id}&account_id=${x}`, {
                method: 'GET'
            })
            .then((res) => res.json())
            .then((json) => json);

            const newDataArr = [data];
            setOrder(newDataArr[0]);
            //updateInventory(newDataArr[0])
        } 


    }

    //update inventory with every item in cart
    // const updateInventory = async (order) => {

    //  const updated = await Promise.all(
    //     order?.items?.data.map(async (item) => {
    //       let id
    //       let key
    //       const fullId = item.price.product.metadata.product_id
    //       if (fullId.includes("_")) {
    //         const idArr = fullId.split('_')
    //         id = idArr[0]
    //         key = idArr[1]
    //       } else {
    //         id = fullId
    //         key = ""
    //       }
    //       const quantity = item.quantity
    //       await fetch('/api/manage-inventory', {
    //         method: 'POST',
    //         body: JSON.stringify({id, key, quantity})
    //       })
          
    //     }) 
    //   )
      
    //    return updated 
      
    // }
    

    useEffect(() => {
      localStorage.clear();
      setCartItems([]);
      setTotalPrice(0);
      setTotalQuantities(0);
      getOrder(sessionId, connectId);
    }, [sessionId, connectId]);

    
    

    console.log(order)
  return (
    <Layout title="success" settings={settings}>

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
          <Typography sx={{mt: 2}} variant='body1' align='center' gutterBottom> Thankyou {order.session.shipping_details.name} for your order! You will receive an email confirmation soon.</Typography>
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

export const getStaticPaths = async () => {
  try {

    const pids = await getPids()   

    const paths = pids.map((proj) => {
      return {params: { pid: proj.pid }}
    })
      
    return {
      paths,
      fallback: 'blocking'
    }
    
  } catch (e) {
    console.log(e)

  }
  

}

export const getStaticProps = async ({ params: { pid }, preview = false }) => {

  try {
   
    const currentPid = await getPidObj(pid)
    const connectId = await getConnectId(pid)


    const query = groq`*[_type == "siteSettings"]`
    const data = await getClient(currentPid, preview).fetch(query)

    if (!data) return {notFound: true}

    const settings = filterDataToSingleItem(data, preview)


    return { 
      props: { 
        settings,
        connectId: connectId.connectedAccount
      }
    }
  } catch (e) {
    console.log(e)

  }
}