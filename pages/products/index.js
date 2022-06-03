import React from 'react';
import Link from 'next/link';

import { Button, Container, IconButton, Slide, Tooltip, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { CardActionFooter, CardBanner, CardTitle, CenteredGrid, FlexSpace, Overlay, PortfolioCard, PortfolioCardBody, PortfolioImg } from "../../utils/styles";


import Layout from '../../components/Layout';
import { client, urlFor } from '../../lib/client';

import styles from '../../styles/Product.module.css';
import { useStateContext } from '../../utils/context/StateContext';
import { useCurrencyContext } from '../../utils/context/CurrencyContext';


const Products = ({products}) => {
    const { onAdd, setQty, qty } = useStateContext();
    const { currencyConverter } = useCurrencyContext();

    const addOne = (x) => {
        setQty(1);
        onAdd(x, qty);
    };

    console.log(products)
  return (
    <Layout title='products'>
        <Container maxWidth='lg'>
        <CenteredGrid container spacing={5} sx={{pt: 6}} >
                    {products.map((product) => (
                        <CenteredGrid item key={product._id} xs={12} sm={6} md={4} >
                            <Slide direction="up" in={true}>
                               
                                <PortfolioCard className={styles.card}>
                                    <CardBanner className={styles.cardBanner} sx={{top: '-30px', transform: 'translateY(-20px)'}} >
                                        <FlexSpace sx={{p: 1}}>
                                            <Typography 
                                                variant='h6' 
                                                sx={{
                                                    color: '#fff',
                                                    opacity: 0.8
                                                }}
                                                >
                                                {product.name}
                                            </Typography>
                                            <Typography 
                                                variant='subtitle1' 
                                                align='right'
                                                sx={{
                                                    color: '#fff',
                                                    opacity: 0.8,
                                                    pt: '3px'
                                                }}
                                                >
                                                {currencyConverter.format(product.price)}
                                            </Typography>
                                        </FlexSpace>
                                    </CardBanner>
                                    <PortfolioCardBody>
                                        <PortfolioImg
                                            src={urlFor(product.image && product.image[0]).size(600, 600).quality(90).fit("min").url()}
                                            alt={product.name}
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
                                        <FlexSpace sx={{p: 1}}>                                      
                                            <Tooltip title="Add to Basket">  
                                                <IconButton color='secondary' onClick={() => addOne(product)}>
                                                    <AddShoppingCartIcon />
                                                </IconButton>
                                            </Tooltip>
                                            
                                            
                                            <Tooltip title="Visit website">
                                                <Link href={`/products/${product.slug.current}`} color="primary.light" >
                                                    <Button variant='contained'>View Product</Button>
                                                </Link>
                                            </Tooltip>
                                        </FlexSpace>
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