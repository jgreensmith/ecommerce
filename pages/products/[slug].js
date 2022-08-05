import { Container, Grid, Grow, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import { groq } from 'next-sanity';
import React, { useState } from 'react'
import Layout from '../../components/Layout';
import ProductDescription from '../../components/shop/ProductDescription';
import { urlFor } from '../../lib/sanity';
import { getClient, sanityClient } from '../../lib/sanity.server';
import { ContentContainer, Div, StyledImg, ThumbnailButton } from '../../utils/styles';

const Product = ({ product }) => {

  console.log(product);
  const { image, name, seoDescription } = product;

  const [imageIndex, setImageIndex] = useState(0);

  return (
    <Layout title={name} seo={seoDescription}>
      <Toolbar />
      <ContentContainer maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} vs={2} md={1} >
            {image?.map((item, i) => (
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
                  src={urlFor(image && image[imageIndex]).size(600, 600).quality(90).fit("min").url()}
                  alt={name}
                  sx={{ display: { xs: 'none', vs: 'block' } }}
                />
                 <Box sx={{ display: { xs: 'flex', vs: 'none' }, overflowX: 'scroll' }} >
                    {image?.map((item, i) => (
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

  //console.log(product);

  return {
    props: { product }
  }
}

export default Product;