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
  const { images, name, seoDescription, mainImage, defaultDimensions, defaultSecondDimensions } = product;


  const defaultDimensionsList = defaultDimensions ? defaultDimensions : []

  const [allImages, setAllImages] = useState([mainImage, ...images])
  const [dimensionList, setDimensionList] = useState(defaultDimensionsList);

  //Dimensions only
  const defaultSecondDimensionList = defaultSecondDimensions ? defaultSecondDimensions : []
  const [secondDimensionList, setSecondDimensionList] = useState(defaultSecondDimensionList);

   

  const variantHandler = (v) => {
    const newImage = v.variantMainImage
    const newImages = v.variantImages
    const newDimensions = v.dimensions
    setAllImages([newImage, ...newImages]);
    setDimensionList(newDimensions);
  }
  const defaultAesthetic = () => {
    setAllImages([mainImage, ...images])
    setDimensionList(defaultDimensionsList)
  }
  const dimensionHandler = (d) => {
    const newSecondDimensions = d.secondDimensions
    setSecondDimensionList(newSecondDimensions)
  }
  const defaultDimensionHandler = () => {
    setSecondDimensionList(defaultSecondDimensionList)
  }

  //compare the two arrays and return elements which _id in products matches _ref in colorRef (if present)
  // const colorProducts = products.filter((el) => {
  //   return colorRef?.some((r) => {
  //     return r._ref === el._id
  //   })
  // })

  const [imageIndex, setImageIndex] = useState(0);
  console.log(dimensionList)
  //console.log(() => variantHandler(variants[0]))

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
                product={product}
                variantHandler={variantHandler}
                dimensionList={dimensionList}
                defaultAesthetic={defaultAesthetic}
                dimensionHandler={dimensionHandler}
                defaultDimensionHandler={defaultDimensionHandler}
                secondDimensionList={secondDimensionList}
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