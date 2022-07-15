import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';
import { CenteredDiv, ShrekImg } from '../utils/styles';

const Custom404 = () => {
  return (
    <Layout title='404'>
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