import { Dialog, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { groq } from 'next-sanity';
import { useRouter } from 'next/router';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

import Layout from "../../../components/common/Layout";
import ReviewForm from "../../../components/shop/ReviewForm";
import Loader from '../../../components/svg/Loader';
import { getPidObj, getPids } from '../../../lib/mongoHelpers';
import { urlFor } from '../../../lib/sanity';
import { getClient } from '../../../lib/sanity.server';
import { useStateContext } from '../../../utils/context/StateContext';
import filterDataToSingleItem from '../../../utils/functions';
import { CartImg, CenteredDiv } from '../../../utils/styles';


const AddReviews = ({settings, currentPid}) => {
  const router = useRouter()
  const sessionId = router.query.session_id
  const connectId = router.query.connect_id
  const [order, setOrder] = useState(null)
  const { setModalOpen, modalOpen, setCurrentId } = useStateContext();

  const getOrder = async (id, x) => {
    if (id) {
      const data = await fetch(`/api/success?session_id=${id}&account_id=${x}`, {
          method: 'GET'
      })
      .then((res) => res.json())
      .then((json) => json);

      const newDataArr = [data];
      setOrder(newDataArr[0]);
    } 
  }

  useEffect(() => {
    getOrder(sessionId, connectId)
  }, [sessionId, connectId])

  const handleClick = (id) => {
    setModalOpen(true)
    setCurrentId(id)
  }

  console.log(order)
  if(!order) return <Loader message='loading order'/>
  return (
    <Layout title="Add Reviews" settings={settings}>
      <CenteredDiv sx={{flexDirection: 'column'}}>
      <TableContainer component={Paper} elevation={0} square sx={{ maxWidth: '800px', width: '80%' }}>
                <Table >
                    <TableBody >
                        {order.items.data.map((item) => {
                          const product = item.price.product
                          return (
                            <TableRow  key={product.id}>
                                <TableCell 
                                    align='left' 
                                    sx={{ width: '80px', padding: '5px' }} 
                                >
                                    <CartImg src={urlFor(currentPid.pid, product.images[0])} />
                                </TableCell>
                                <TableCell>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography variant='subtitle1' gutterBottom>{product.name}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography align='right'>
                                              <button onClick={() => handleClick(product.metadata.product_id)}>
                                                Please Leave a review
                                              </button>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        )})}
                        
                    </TableBody>
                </Table>
            </TableContainer>
      </CenteredDiv>
      <Dialog 
        open={modalOpen}
        //fullScreen={fullScreen}
        onClose={() => setModalOpen(false)}
       
        >
          <ReviewForm  items={order.items.data} props={{
            items: order.items.data,
            sessionId,
            connectId,
            name: order.session.customer_details.name
          }} />
        </Dialog>    
    </Layout>
  )
}

export default AddReviews

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

    const query = groq`*[_type == "siteSettings"]`
    const data = await getClient(currentPid, preview).fetch(query)

    if (!data) return {notFound: true}

    const settings = filterDataToSingleItem(data, preview)


    return { 
      props: { 
        settings,
        currentPid
      }
    }
  } catch (e) {
    console.log(e)

  }
}