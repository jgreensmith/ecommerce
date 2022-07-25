import React, { useState } from 'react';
import Link from 'next/link';

import { Button, Container, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, Paper, Slide, Toolbar, Tooltip, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { CardActionFooter, CardBanner, CardTitle, CenteredGrid, FlexSpace, Overlay, PortfolioCard, PortfolioCardBody, PortfolioImg } from "../../utils/styles";


import Layout from '../../components/Layout';
import { client, urlFor } from '../../lib/client';

import styles from '../../styles/Product.module.css';
import { useStateContext } from '../../utils/context/StateContext';
import { useCurrencyContext } from '../../utils/context/CurrencyContext';


const Products = ({products, categories}) => {
    const { onAdd, setQty, qty } = useStateContext();
    const { currencyConverter } = useCurrencyContext();
    const [productList, setProductList] = useState(products);
    const allCategories = [{"title": 'All'}, ...categories];

    const addOne = (x) => {
        setQty(1);
        onAdd(x, qty);
    };
    
    const catFilter = (cat) => {
        if(cat.title === 'All') {
            setProductList(products);
            return;
        }
        const filteredProducts = products.filter(product => product.categories[0]._ref === cat._id);
        setProductList(filteredProducts);
    };

    console.log(products)
    console.log(categories)

  return (
    <Layout title='Products'>
        <Container maxWidth='xl' disableGutters>
       <Grid container spacing={1} >        
        <Grid item xs={3} >
            <Paper sx={{ width: 260, p: 1, m: 1, mt: 7}}>
                <Toolbar>
                    <Typography variant='h6'>
                        Filter by Catergory
                    </Typography>
                </Toolbar>
                <List>
                    {allCategories.map((cat, index) => (
                        <ListItemButton onClick={() => catFilter(cat)} key={index}>
                            {cat.title}
                        </ListItemButton>
                    ))}                
                </List>
            </Paper>
        </Grid>
        <Grid item xs={9}  >

        <CenteredGrid container spacing={1} sx={{pt: 6, ml: {sm: 4, md: 0}}}  >
                    {productList.map((product) => (
                        <CenteredGrid item key={product._id}  >
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
                                                <Button href={`/products/${product.slug.current}`} variant='contained'>View Product</Button>
                                            </Tooltip>
                                        </FlexSpace>
                                    </CardBanner>
                                </PortfolioCard>
                            </Slide>   
                                          
                        </CenteredGrid>    
                    ))}
                    
                </CenteredGrid>  
                </Grid>
      
            </Grid>
            </Container>
    </Layout>
  )
}
export const getStaticProps = async () => {
  const query = '*[_type == "product"]';
  const catQuery = '*[_type == "category"]';
  const products = await client.fetch(query);
  const categories = await client.fetch(catQuery)

  return {
    props: { products, categories }
  }
}

export default Products;