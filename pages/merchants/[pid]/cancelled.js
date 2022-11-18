import React from 'react';
import Link from 'next/link';
import { groq } from "next-sanity";

import { Alert, Button, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Layout from "../../../components/common/Layout";
import { CenteredDiv } from '../../../utils/styles';
import filterDataToSingleItem from '../../../utils/functions';
import { getClient } from "../../../lib/sanity.server";
import { getPidObj, getPids } from '../../../lib/mongoHelpers';



const Cancelled = ({settings}) => {
  return (
    <Layout title="cancelled" settings={settings}>
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
        settings
      }
    }
  } catch (e) {
    console.log(e)

  }
}