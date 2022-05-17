import React from 'react'
import Layout from '../../components/Layout';
import { client } from '../../lib/client';

const Product = ({ image, name, price, details }) => {
  console.log({ image, name, price, details })
  return (
    <Layout title={name}>
      <h1>Butt </h1>
    </Layout>
  )
}

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;

  const query = `*[ _type == "product" && slug.current == $pageSlug ][0] {
    image,
    name,
    price,
    details
  }`
  const product = await client.fetch(query, { pageSlug });

  if (!product) {
    return {
      props: null,
      notFound: true
    }
  } else {
    return {
      props: {
        image: product.image,
        name: product.name,
        price: product.price,
        details: product.details
      }
    }
  }
}

export default Product;