import React, { useState } from 'react';

import { Button, Container, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, Paper, Slide, Toolbar, Tooltip, Typography, SwipeableDrawer } from '@mui/material';
import { ImFilter } from "react-icons/im";

import { CenteredGrid, ContentContainer } from "../../../../utils/styles";


import Layout from '../../../../components/common/Layout';

import { useStateContext } from '../../../../utils/context/StateContext';
import { getClient } from '../../../../lib/sanity.server';
import { groq } from 'next-sanity';
import ProductCard from '../../../../components/shop/ProductCard';
import filterDataToSingleItem from '../../../../utils/functions';
import { getPidObj, getPids } from '../../../../lib/mongoHelpers';
import Holiday from '../../../../components/shop/Holiday';

const Products = ({currentPid, products, categories, settings}) => {
    const [productList, setProductList] = useState(products);
    const [catOpen, setCatOpen] = useState(false);
    const holidayMode = currentPid.holidayMode
    //add all option to products
    
    //if categories create allcategories array
    const allCategories = categories ? [{"title": 'All'}, ...categories] : null;
    

  
    const catFilter = (cat) => {
        if(cat.title === 'All') {
            setProductList(products);
            return;
        }
        //match product ref (if there is one) with cat id
        const filteredProducts = products.filter(product => product?.categories[0]?._ref === cat._id);
        setProductList(filteredProducts);
    };

    const handleCatToggle = () => {
        setCatOpen(!catOpen)
    };

    const drawCatFilter = (cat) => {
        setCatOpen(false);
        catFilter(cat);
    };


     console.log(products)
    // console.log(categories)
    if(holidayMode) return <Holiday settings={settings}/>

  return (
    <Layout title='shop' settings={settings}>
    {!categories && 
            <ContentContainer maxWidth='xl' sx={{overflow: 'hidden'}} disableGutters>
                <CenteredGrid container spacing={1} sx={{pt: 6, ml: {sm: 4, md: 0}}}  >

                    {productList.map((product) => (
                        <CenteredGrid item key={product._id}  >
                            <ProductCard pid={currentPid.pid} product={product} />
                                          
                        </CenteredGrid>    
                    ))}
                </CenteredGrid>
            </ContentContainer>

    }
   { categories && 
    <React.Fragment>
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
                            <ProductCard pid={currentPid.pid} product={product} />
                                          
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
    </React.Fragment>
    }
    
    </Layout>
  )
}

export default Products;

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

        const query = groq`*[_type == "product"]`
        const catQuery = groq`*[_type == "category"]`
        const settingsQuery = groq`*[_type == "siteSettings"]`

        const data = await getClient(currentPid, preview).fetch(settingsQuery)
        const products = await getClient(currentPid, preview).fetch(query)
        const categories = await getClient(currentPid, preview).fetch(catQuery)

        if (!products) return {notFound: true}

        const settings = filterDataToSingleItem(data, preview)


        return {
            props: { currentPid, products, categories, settings }
        }
        
    } catch (error) {
        console.log(error)
    }
}

