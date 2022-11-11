import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import Layout from '../../../components/common/Layout';
import { CenteredDiv, ShrekImg } from '../../../utils/styles';

const Custom404 = ({settings}) => {
  return (
    <Layout title='404' settings={settings}>
        <Container maxWidth='lg'
        sx={{
            my: 4
        }}
        >
            <Grid container spacing={2} >
                <Grid item xs={12} md={6} >
                <Box 
                        elevation={0}  
                        sx={{ p: 4, mr: 2, mt: 2 }}
                    >
                      <CenteredDiv>

                        <Typography variant='h1'>
                        404
                        </Typography>
                        <Typography gutterBottom variant='subtitle1'>
                        something went horribly wrong
                        </Typography>
                        <Link href="/" passHref>
                          <Button variant='contained' sx={{m:3}}>
                            home
                          </Button>
                        </Link>
                      </CenteredDiv>
                    </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <CenteredDiv>
                      <Box
                      
                      >
                        <ShrekImg
                          sx={{
                            width: { xs: '300px', vs: '100%'}
                          }}
                         src='/shrek1.png' />
                      </Box>
                    </CenteredDiv>
                </Grid>
                
            </Grid>
           
        </Container>
    </Layout>
  )
}

export default Custom404

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