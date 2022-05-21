import { Container, Grid, Grow, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import Layout from '../../components/Layout';
import ProductDescription from '../../components/shop/ProductDescription';
import { client, urlFor } from '../../lib/client';
import { StyledImg, ThumbnailButton } from '../../utils/styles';

const Product = ({ product }) => {

  console.log(product);
  const { image, name, body, price } = product;

  const [imageIndex, setImageIndex] = useState(0);

  return (
    <Layout title={name}>
      <Toolbar />
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={1}>
            {image?.map((item, i) => (
              <ThumbnailButton 
                key={i}
                sx={{
                    background: `url("${urlFor(item)}") center center/cover`,
                    display: { xs: 'none', sm: 'block' },
                }}
                onClick={ () => setImageIndex(i)} 
              />
            ))}
          </Grid>
          <Grid item xs={12} sm={7}>
            <Grow in>
              <Container maxWidth="sm">
                <StyledImg 
                  src={urlFor(image && image[imageIndex])}
                  alt={name}
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                />
                 <Box sx={{ display: { xs: 'flex', sm: 'none' }, overflowX: 'scroll' }} >
                    {image?.map((item, i) => (
                        <StyledImg
                          key={i}
                          src={urlFor(item)}
                          alt={name}
                          sx={{ marginRight: 5 }}
                        />  
                    ))} 
                </Box>
              </Container>
            </Grow>
          </Grid>
          <Grid item xs={12} sm={4}>
            <ProductDescription 
              product={product}
            /> 
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}
//adds path to params
export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;
  const products = await client.fetch(query);

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

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const product = await client.fetch(query);

  console.log(product);

  return {
    props: { product }
  }
}

export default Product;