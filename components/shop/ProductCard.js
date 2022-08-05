import React from 'react'
import { useCurrencyContext } from '../../utils/context/CurrencyContext';

import { Button, IconButton, Slide, Tooltip, Typography } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { CardBanner, FlexSpace, PortfolioCard, PortfolioCardBody, PortfolioImg } from '../../utils/styles'
import styles from '../../styles/Product.module.css';
import { urlFor } from '../../lib/sanity';
import { useStateContext } from '../../utils/context/StateContext';


const ProductCard = ({product}) => {
    const { currencyConverter } = useCurrencyContext();
    const { onAdd, setQty, qty } = useStateContext();

    const addOne = (x) => {
        setQty(1);
        onAdd(x, qty);
    };

  return (
    <Slide
     direction="up" in={true}>
                               
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
                    src={urlFor(product.mainImage).size(600, 600).quality(90).fit("min").url()}
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
  )
}

export default ProductCard