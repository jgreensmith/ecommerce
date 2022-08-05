import React, { useState } from 'react';

import { Button, Container, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, Paper, Slide, Toolbar, Tooltip, Typography, SwipeableDrawer } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { ImFilter } from "react-icons/im";

import { CardActionFooter, CardBanner, CardTitle, CenteredGrid, ContentContainer, Div, FlexSpace, Overlay, PortfolioCard, PortfolioCardBody, PortfolioImg } from "../../utils/styles";


import Layout from '../../components/Layout';
import { urlFor } from '../../lib/sanity';

import styles from '../../styles/Product.module.css';
import { useStateContext } from '../../utils/context/StateContext';
import { useCurrencyContext } from '../../utils/context/CurrencyContext';
import { getClient } from '../../lib/sanity.server';
import { groq } from 'next-sanity';

const Products = ({products, categories}) => {
    const { onAdd, setQty, qty } = useStateContext();
    const { currencyConverter } = useCurrencyContext();
    const [productList, setProductList] = useState(products);
    const [catOpen, setCatOpen] = useState(false);
    //add all option to products
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
        //match product ref with cat id
        const filteredProducts = products.filter(product => product.categories[0]._ref === cat._id);
        setProductList(filteredProducts);
    };

    const handleCatToggle = () => {
        setCatOpen(!catOpen)
    };

    const drawCatFilter = (cat) => {
        setCatOpen(false);
        catFilter(cat);
    };


    // console.log(products)
    // console.log(categories)

  return (
    <Layout title='Products'>
        <ContentContainer maxWidth='xl' sx={{overflow: 'hidden'}} disableGutters>
       <Grid container spacing={1} >        
        <Grid item xs={12} sm={3} sx={{display: {xs: 'none', sm: 'block'}}}>
            <Paper sx={{ width: 260, p: 1, m: 1, mt: 7, position: 'fixed'}}>
                <Toolbar>
                    <Typography variant='h6'>
                        Filter by Catergory
                    </Typography>
                </Toolbar>
                <Divider />
                <List>
                    {allCategories.map((cat, index) => (
                        <ListItemButton onClick={() => catFilter(cat)} key={index}>
                            {cat.title}
                        </ListItemButton>
                    ))}                
                </List>
            </Paper>
        </Grid>
        <Grid item xs={12} sm={9} >

        <CenteredGrid container spacing={1} sx={{pt: 6, ml: {sm: 4, md: 0}}}  >
                    {productList.map((product) => (
                        <CenteredGrid item key={product._id}  >
                            <Slide direction="up" in={true}>
                               
                                <PortfolioCard className={styles.card}>
                                    <CardBanner className={styles.cardBanner} sx={{top: '-10px', transform: 'translateY(-15px)', px: '10px'  }} >
                                        <FlexSpace sx={{p: 1}}>
                                            <Typography 
                                                variant='h6' 
                                                // sx={{
                                                //     color: 'secondary.main',
                                                // }}
                                                >
                                                {product.name}
                                            </Typography>
                                            <Typography 
                                                variant='subtitle1' 
                                                align='right'
                                                sx={{
                                                    color: 'primary.text',
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
                                            bottom: '-10px',
                                            transform: 'translateY(10px)',
                                            p: '7px 13px'                                         
                                        }}
                                        >
                                        <FlexSpace sx={{p: 1}}>                                      
                                            <Tooltip title="Add to Basket">  
                                                <IconButton color='secondary' onClick={() => addOne(product)}>
                                                    <AddShoppingCartIcon />
                                                </IconButton>
                                            </Tooltip>
                                            
                                            
                                                <Button disableElevation color='secondary' href={`/products/${product.slug.current}`} variant='contained'>View Product</Button>
                                        </FlexSpace>
                                    </CardBanner>
                                </PortfolioCard>
                            </Slide>   
                                          
                        </CenteredGrid>    
                    ))}
                    
                </CenteredGrid>  
                        <IconButton
                            sx={{ 
                                opacity: 1,
                                backgroundColor: 'secondary.main',
                                position: 'fixed',
                                bottom: 80,
                                right: 30,
                                zIndex: 10,
                                width: 55,
                                height: 55,
                                pt: '14px',
                                display: {
                                    xs: 'block',
                                    sm: 'none'
                                }
                            }} 
                            variant='contained' 
                            size='large' 
                            onClick={handleCatToggle}
                        >
                            <ImFilter sx={{m: 'auto'}} />
                        </IconButton>
                    
                </Grid>
      
            </Grid>
        </ContentContainer>
        
        <SwipeableDrawer
        anchor='bottom'
        open={catOpen}
        onClose={handleCatToggle}
        >
            <Paper sx={{ width: '100%', p: 3, m: 0, textAlign: 'center'}}>
                <Toolbar>
                    <Typography variant='h6'>
                        Filter by Catergory
                    </Typography>
                </Toolbar>
                <Divider />
                <List >
                    {allCategories.map((cat, index) => (
                        <ListItemButton onClick={() => drawCatFilter(cat)} key={index}>
                            <Typography  >

                                {cat.title}
                            </Typography>
                        </ListItemButton>
                    ))}                
                </List>
            </Paper>
        </SwipeableDrawer>
     
    </Layout>
  )
}
export const getStaticProps = async ({ preview = false }) => {
    const query = groq`*[_type == "product"]`
    const catQuery = groq`*[_type == "category"]`

  const products = await getClient(preview).fetch(query)
  const categories = await getClient(preview).fetch(catQuery)

  if (!products) return {notFound: true}


  return {
    props: { products, categories }
  }
}

export default Products;