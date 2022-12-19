import { Container, Grid, Grow, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import { groq } from 'next-sanity';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useEffect } from 'react';
import Layout from '../../../../components/common/Layout';
import ProductDescription from '../../../../components/shop/ProductDescription';
import { getPidObj, getPids } from '../../../../lib/mongoHelpers';
import { urlFor, usePreviewSubscription } from '../../../../lib/sanity';
import { getClient, sanityClient } from '../../../../lib/sanity.server';
import filterDataToSingleItem from '../../../../utils/functions';
import { ContentContainer, Div, StyledImg, ThumbnailButton } from '../../../../utils/styles';




const Product = ({ currentPid, data, preview, settings  }) => {
    
  const slug = data?.product?.slug
  //const product = data?.product
  
  const {data: previewProduct } = usePreviewSubscription(currentPid)(data?.query, {
    params: { slug },
    initialData: data?.product,
    enabled: preview && slug
  })
  const product = filterDataToSingleItem(previewProduct, preview)
  
  //reviews array
  const reviews = currentPid.reviews.filter((r) => r.prodId === product._id)

  console.log({reviews});
  const { images, name, seoDescription, mainImage  } = product;
  const [newProduct, setNewProduct] = useState(product)

 //create new variants array that parses the varSelect and includes inventory, key and price
  const variantsNew = !product?.variantComboList ? [] : product.variantComboList.map((x) => {
    const parsedObj = JSON.parse(x.varSelect)
    return {...parsedObj, price: x.price, inventory: x.inventory, key: x._key }
})

// default value for primary variant (item dragged to top of array in sanity)
  const defaultVariantValue = product?.primaryVariants ? product.primaryVariants[0].variantValue : ''
  const secondaryVariants = product?.secondaryVariants ? product.secondaryVariants : []

//filter variantsNew with default primary variant
  const defaultVariantObjectList = variantsNew.filter((obj) => obj.priVar === defaultVariantValue)

  //filter secondary variants to avoid duplicates in selection list
  const defaultSecondaryVariantList = secondaryVariants.filter((x) => {
    return defaultVariantObjectList.some((obj) => {
      return obj.secVar === x
    })
  })
  //state for primary variant handler
  const [imageIndex, setImageIndex] = useState(0);
  const [allImages, setAllImages] = useState([mainImage, ...images])
  const [cartImage, setCartImage] = useState(mainImage)
  const [secondaryVariantList, setSecondaryVariantList] = useState(defaultSecondaryVariantList);
  const [tertiaryVariantList, setTertiaryVariantList] = useState([]);
  const [primaryValue, setPrimaryValue] = useState(defaultVariantValue)
  const [secondaryValue, setSecondaryValue] = useState('')
  const [tertiaryValue, setTertiaryValue] = useState('')
  

  //filter for variant handler

  const filterVariants = (v) => {
    const filteredObjects = variantsNew.filter((obj) => obj.priVar === v)
    const newSecondaryVariantList = secondaryVariants.filter((x) => {
      return filteredObjects.some((obj) => {
        return obj.secVar === x
      })
    })
    setSecondaryVariantList(newSecondaryVariantList) 
  }

  //handles primary variant if only one variant, creates a new product, else makes new secondary list
  const variantHandler = (v) => {
    const newImage = v.variantMainImage
    const newImages = v.variantImages
    const value = v.variantValue

    if (!newImage && !newImages) {
      setAllImages([mainImage, ...images])
      setCartImage(mainImage)

    } else {
      setAllImages([newImage, ...newImages]);
      setCartImage(newImage)
    }
    if(!product?.boolObj?.oneVarBool) {
      if(value === defaultVariantValue) {
        setSecondaryVariantList(defaultSecondaryVariantList)
      } else {
        filterVariants(value)
      }
      setTertiaryVariantList([])
      setNewProduct(product)
    } else {
      const selectedSingleVariant = {
        name: `${product.name} - ${product.variantTitle}: ${value}`,
        _id: product._id.concat(`_${v._key}`),
        price: v.price ? v.price : product.price,
        mainImage: newImage ? newImage : mainImage,
        inventory: v.inventory,
        ...(newProduct.personalMessage && {personalMessage: newProduct.personalMessage})

      }
      setNewProduct(selectedSingleVariant)
    }
    setPrimaryValue(value)
    setSecondaryValue('')
    setTertiaryValue('')
  }
  //secondary variant handler logic - if onl 2 variants, selects variant, else creates tertiary list

  const tertiaryVariants = product?.tertiaryVariants ? product.tertiaryVariants : []

  const secondaryVariantHandler = (v) => {
    if(product?.boolObj?.twoVarBool) {
      selectVariant(v)
    } else {

      const filteredObjects = variantsNew.filter((obj) => obj.secVar === v && obj.priVar === primaryValue)
      const newTertiaryVariantList = tertiaryVariants.filter((x) => {
        return filteredObjects.some((obj) => {
          return obj.tertVar === x
        })
      })
      setTertiaryVariantList(newTertiaryVariantList)
    }
    setSecondaryValue(v)
    setTertiaryValue('')
  }
  // select variant logic - find object depending on 2 or 3 variants
  const selectVariant = (v) => {
    let foundObject
    if(product?.boolObj?.twoVarBool) {
      foundObject = variantsNew.find((obj) => obj.secVar === v && obj.priVar === primaryValue)     
    } else {
      foundObject = variantsNew.find((obj) => obj.tertVar === v && obj.secVar === secondaryValue && obj.priVar === primaryValue)
      setTertiaryValue(v)
    }
    const selectedVariant = {
      name: `${product.name} - ${product.primaryVarTitle}: ${foundObject.priVar}, ${product.secondaryVarTitle}: ${foundObject.secVar}${product?.tertiaryVariants ? `, ${product.tertiaryVarTitle}: ${foundObject.tertVar}` : ''}`,
      _id: product._id.concat(`_${foundObject.key}`),
      price: foundObject.price ? foundObject.price : product.price,
      mainImage: cartImage,
      inventory: foundObject.inventory,
      ...(newProduct.personalMessage && {personalMessage: newProduct.personalMessage})

    }
    setNewProduct(selectedVariant)
    console.log(selectedVariant)
  }
  
  

  console.log(newProduct)
  //console.log(product.variants)

  return (
    <Layout title={name} seo={seoDescription} settings={settings}>
      <Toolbar />
      <ContentContainer maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} vs={2} md={1} >
            {allImages?.map((item, i) => (
              <ThumbnailButton 
                key={i}
                sx={{
                    background: `url("${urlFor(currentPid.pid, item).size(100, 100).quality(90).fit("min").url()}") center center/cover`,
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
                  src={urlFor(currentPid.pid, allImages && allImages[imageIndex]).size(600, 600).quality(90).fit("min").url()}
                  alt={name}
                  sx={{ display: { xs: 'none', vs: 'block' } }}
                />
                 <Box sx={{ display: { xs: 'flex', vs: 'none' }, overflowX: 'scroll' }} >
                    {allImages?.map((item, i) => (
                        <StyledImg
                          key={i}
                          src={urlFor(currentPid.pid, item).size(600, 600).quality(90).fit("min").url()}
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
                secondaryVariantHandler,
                tertiaryVariantList,
                selectVariant,
                newProduct,
                setNewProduct,
                primaryValue,
                secondaryValue,
                tertiaryValue,
                currentPid
                
              }}
                
                /> 
            </Div>
          </Grid>
        </Grid>
      </ContentContainer>
    </Layout>
  )
}

export default Product;
//adds path to params
export const getStaticPaths = async () => {

  const pids = await getPids()

  const newArr = await Promise.all(
    pids.map(async(x) => {

    const query = groq`*[_type == "product"] {
      slug {
        current
      }
    }`;
    
    const products = await sanityClient(x.pid).fetch(query)

    return products.map((product) => {
      return {
        pid: x.pid,
        product: product
      }
    })
    
  }))
  const finArr = newArr.flat(1)

  const paths = finArr.map((obj) => {
    return {
      params: {
        pid: obj.pid,
        slug: obj.product.slug.current
      }
    }
  })
  
  return {
    paths,
    fallback: 'blocking'
  }

}
//groq filter slug that matches current slug

export const getStaticProps = async ({ params: { pid, slug }, preview = false }) => {

  const currentPid = await getPidObj(pid)

  const query = groq`*[_type == "product" && slug.current == '${slug}'][0]`;
  const settingsQuery = groq`*[_type == "siteSettings"]`

  const settingsData = await getClient(currentPid, preview).fetch(settingsQuery)
  const data = await getClient(currentPid, preview).fetch(query);

  if (!data) return {notFound: true}

  const product = filterDataToSingleItem(data, preview)
  const settings = filterDataToSingleItem(settingsData, preview)



  return {
    props: { 
      currentPid,
      settings,
      preview,
      data: {product, query} 
    }
  }
}

