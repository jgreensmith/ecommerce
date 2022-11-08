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

const Products = ({currentPid, products, categories, settings}) => {
    const [productList, setProductList] = useState(products);
    const [catOpen, setCatOpen] = useState(false);
    //const categories = null
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


    // console.log(products)
    // console.log(categories)

  return (
    <Layout title='Products' settings={settings}>
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

export const getStaticPaths = async () => {
    const paths = [
      {params: { pid: "smq0a814" }},
      {params: { pid: "2uh6xbh5" }}
    ]
      
    return {
      paths,
      fallback: 'blocking'
    }
  
  }

export const getStaticProps = async ({ params: { pid }, preview = false }) => {

    const merchantArr = [
        {
            pid: "smq0a814",
            manage_inventory: "skfPeWq0M7kraPIOqR6zDBFOy4dxKcCFCFUygNo6mRRv8o07EANR4EHj8YzEPPGymEAYI3jPnOOTXHbE9nv4F4YpzTwpygzOHWf8PjT5zCZC1hlX7L32ERcjyKZMD2DT8MBEDHFq74wz6uJJAZqhS8GyB9j0XEl8j1gWm0Ku2E41gtVjnNri",
            preview_mode: "sk5nbekTGsBdlroyOVxCozaLgttmT8l4zhzf8XNaQfix96HYtyWg7bJ5vYqgcdC3eVQpRDgpHGNEsDM4Ar6lZnplmA227GVmMKIvuOFOeSydIeh7mrePnZDBj0hqFLJFsh7Fto3RxZlMAGd7jBFa22rZ5pNSiOPSVkobxcdAsQmP3KuaFWTD"
        },
        {
            pid: "2uh6xbh5",
            manage_inventory: "skjMhFSaHSzLAmLDSwOaGTCzy5WvVRWV3GkIJKCcX40gfmFCxBcnXB296X9NHqMegx0GtMGfbNPBw8ctGNYR8JMmEXFa1rFxoSi7b34H92EnnXwN6HQylqkjwH0VPDqTQu5L0XTatSoPHK589qZXKxwbl8HJpUsQCU0NdDxB94hxMGtlgziP",
            preview_mode: "skpQhwhL8a9CIEz8vLuPmnnwSgLlB2WQGeHbAzCBFR61z8UolZjGsSdtmMJUjqQ3aoIDki1oicmqoJg3M1yWPfW0ZvtVA6bykm3mQBNWUJHVSX2aAbkjbRu1cAIKiNK0EwDozDjcJtLHaQHwlZse8nkmN0uCoabXro9D4NK0RCLJSxgCEWke"
        }
    ]

    const currentPid = merchantArr.find(x => x.pid === pid)
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
}

export default Products;