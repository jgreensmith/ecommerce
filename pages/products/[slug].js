import { Container, Grid, Grow, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import { groq } from 'next-sanity';
import React, { useState } from 'react'
import { useEffect } from 'react';
import Layout from '../../components/common/Layout';
import ProductDescription from '../../components/shop/ProductDescription';
import { urlFor } from '../../lib/sanity';
import { getClient, sanityClient } from '../../lib/sanity.server';
import { ContentContainer, Div, StyledImg, ThumbnailButton } from '../../utils/styles';

const Product = ({ product, products }) => {

  //console.log({product, products});
  const { images, name, seoDescription, mainImage  } = product;

 //create new variants array that parses the varSelect and includes inventory, key and price
  const variantsNew = !product.variantComboList ? [] : product.variantComboList.map((x) => {
    const parsedObj = JSON.parse(x.varSelect)
    return {...parsedObj, price: x.price, inventory: x.inventory, key: x._key}
})

// default value for primary variant (item dragged to top of array in sanity)
  const defaultVariantValue = product?.primaryVariants ? product.primaryVariants[0].variantValue : {}
  const secondaryVariants = product?.secondaryVariants ? product.secondaryVariants : []

//filter variantsNew with default primary variant
  const defaultVariantObjectList = variantsNew.filter((obj) => obj.priVar === defaultVariantValue)

  //filter secondary variants to avoid duplicates in selection list
  const defaultSecondaryVariantList = secondaryVariants.filter((x) => {
    return defaultVariantObjectList.some((obj) => {
      return obj.secVar === x
    })
  })

  const [imageIndex, setImageIndex] = useState(0);
  const [allImages, setAllImages] = useState([mainImage, ...images])
  const [secondaryVariantList, setSecondaryVariantList] = useState(defaultSecondaryVariantList);

  const filterVariants = (v) => {
    const filteredObjects = variantsNew.filter((obj) => obj.priVar === v)
    const newSecondaryVariantList = secondaryVariants.filter((x) => {
      return filteredObjects.some((obj) => {
        return obj.secVar === x
      })
    })
    setSecondaryVariantList(newSecondaryVariantList) 
  }

    
  const variantHandler = (v) => {
    const newImage = v.variantMainImage
    const newImages = v.variantImages
    const value = v.variantValue

    if (!newImage && !newImages) {
      setAllImages([mainImage, ...images])
    } else {

      setAllImages([newImage, ...newImages]);
    }
    if(value === defaultVariantValue) {
      setSecondaryVariantList(defaultSecondaryVariantList)
    } else {
      filterVariants(value)
    }
  }
  const defaultVariantHandler = () => {
    setAllImages([mainImage, ...images])
    //setChildVariantList(defaultChildVariantList)
  }
  
  

  //console.log(defaultVariantObjectList)
  console.log(secondaryVariantList)

  return (
    <Layout title={name} seo={seoDescription}>
      <Toolbar />
      <ContentContainer maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} vs={2} md={1} >
            {allImages?.map((item, i) => (
              <ThumbnailButton 
                key={i}
                sx={{
                    background: `url("${urlFor(item).size(100, 100).quality(90).fit("min").url()}") center center/cover`,
                    display: { xs: 'none', vs: 'block' },
                }}
                onClick={ () => setImageIndex(i)} 
              />
            ))}

          </Grid>
          <Grid item xs={12} vs={10} md={7} >
            <Grow in>
              <Container maxWidth="sm" >
                <StyledImg 
                  src={urlFor(allImages && allImages[imageIndex]).size(600, 600).quality(90).fit("min").url()}
                  alt={name}
                  sx={{ display: { xs: 'none', vs: 'block' } }}
                />
                 <Box sx={{ display: { xs: 'flex', vs: 'none' }, overflowX: 'scroll' }} >
                    {allImages?.map((item, i) => (
                        <StyledImg
                          key={i}
                          src={urlFor(item).size(600, 600).quality(90).fit("min").url()}
                          alt={name}
                          sx={{ marginRight: 5 }}
                        />  
                    ))} 
                </Box>
              </Container>
            </Grow>
          </Grid>
          <Grid item xs={12} md={4}>
            <Div sx={{m: 'auto'}}>
              <ProductDescription 
              props={{
                product,
                variantHandler,
                secondaryVariantList,
                defaultVariantHandler
                
              }}
                
                /> 
            </Div>
          </Grid>
        </Grid>
      </ContentContainer>
    </Layout>
  )
}
//adds path to params
export const getStaticPaths = async () => {
  const query = groq`*[_type == "product"] {
    slug {
      current
    }
  }`;
  const products = await sanityClient.fetch(query);
  //put current product slug in params

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current
    }
  }));
  return {
    paths,
    fallback: 'blocking'
  }

}
//groq filter slug that matches current slug

export const getStaticProps = async ({ params: { slug }, preview = false }) => {
  const query = groq`*[_type == "product" && slug.current == '${slug}'][0]`;
  const product = await getClient(preview).fetch(query);

  const productsQuery = groq`*[_type == "product" ]`;
  const products = await getClient(preview).fetch(productsQuery);


  //console.log(product);

  return {
    props: { product, products }
  }
}

export default Product;