import React from 'react';

import { Button, Container, Link, Slide, Tooltip, Typography } from '@mui/material';

import { CardActionFooter, CardBanner, CardTitle, CenteredGrid, Overlay, PortfolioCard, PortfolioCardBody, PortfolioImg } from "../../utils/styles";


import Layout from '../../components/Layout';
import { client, urlFor } from '../../lib/client';

import styles from '../../styles/Product.module.css';

const Products = ({products}) => {
  console.log(products)
  return (
    <Layout title='products'>
        <Container maxWidth='lg'>
        <CenteredGrid container spacing={5} sx={{pt: 6}} >
                    {products.map((product, index) => (
                        <CenteredGrid item key={index} xs={12} sm={6} md={4} >
                            <Slide direction="up" in={true}>
                               
                                <PortfolioCard className={styles.card}>
                                    <CardBanner className={styles.cardBanner} sx={{top: '-30px', transform: 'translateY(-20px)'}} >
                                        <Typography 
                                            component="h5" 
                                            sx={{
                                                color: '#fff',
                                                opacity: 0.8
                                            }}
                                        >
                                            {product.title}
                                        </Typography>
                                    </CardBanner>
                                    <PortfolioCardBody>
                                        <PortfolioImg
                                            src={urlFor(product.image && product.image[0]).size(600, 600).quality(90).fit("min").url()}
                                            alt={product.title}
                                            loading="lazy"
                                            />
                                    </PortfolioCardBody>
                                    
                                    <CardBanner
                                        className={styles.cardBanner}
                                        sx={{
                                            justifyContent: 'space-evenly',
                                            bottom: '-20px',
                                            transform: 'translateY(20px)',
                                                
                                        }}
                                    >
                                        
                                        <Tooltip title="Project summary">  
                                            <p>blah blah blah</p>
                                        </Tooltip>
                                        
                                        
                                        <Tooltip title="Visit website">
                                            <Link href={`/products/${product.slug.current}`} target="_blank" rel="noreferrer"  color="primary.light" >
                                                <Button variant='contained'>View Product</Button>
                                            </Link>
                                        </Tooltip>
                                    </CardBanner>
                                </PortfolioCard>
                            </Slide>   
                                          
                        </CenteredGrid>    
                    ))}
                    
                </CenteredGrid>        </Container>
    </Layout>
  )
}
export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  return {
    props: { products }
  }
}

export default Products;