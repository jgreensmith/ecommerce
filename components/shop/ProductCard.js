import React from 'react'
import { useCurrencyContext } from '../../utils/context/CurrencyContext';

import { Button, IconButton, Rating, Slide, Tooltip, Typography } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { CardBanner, FlexStart, FlexSpace, PortfolioCard, PortfolioCardBody, PortfolioImg } from '../../utils/styles'
import styles from '../../styles/Product.module.css';
import { urlFor } from '../../lib/sanity';
import { useStateContext } from '../../utils/context/StateContext';


const ProductCard = ({props}) => {
    const {product, pid, allReviews} = props
    const { currencyConverter } = useCurrencyContext();
    const { onAdd, setQty, qty, getReviewAverage } = useStateContext();
    const oneVarArr = !product?.variants ? [] : product.variants.map((x) =>  x.price)
    const twoThreeVarArr = !product?.variantComboList ? [] : product.variantComboList.map((x) => x.price)
    const oneVarLowest = Math.min(...oneVarArr)
    const twoThreeVarLowest = Math.min(...twoThreeVarArr)

    const reviews = allReviews.filter((r) => r.prodId === product._id)


    const addOne = (x) => {
        const plop = {
            ...x,
            pid: pid
        }
        setQty(1);
        onAdd(plop, qty);
    };
    //console.log(oneVarLowest)
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
                    
                    {
                        product.price ? 
                            <Typography variant='subtitle1' align='right'sx={{color: 'primary.text',pt: '3px'}}>
                                {currencyConverter.format(product.price)}
                            </Typography>
                        : product?.variants ?
                            <Typography variant='subtitle1' align='right'sx={{color: 'primary.text',pt: '3px'}}>
                                From {currencyConverter.format(oneVarLowest)}
                            </Typography>
                        :
                            <Typography variant='subtitle1' align='right'sx={{color: 'primary.text',pt: '3px'}}>
                                From {currencyConverter.format(twoThreeVarLowest)}
                            </Typography>
                    }
                </FlexSpace>
            </CardBanner>
            <PortfolioCardBody>
                <PortfolioImg
                    src={urlFor(pid, product.mainImage).size(600, 600).quality(90).fit("min").url()}
                    alt={product.name}
                    loading="lazy"
                    />
            </PortfolioCardBody>
            
            <CardBanner
                className={styles.cardBanner}
                sx={{
                    justifyContent: 'space-evenly',
                    flexDirection: 'column',
                    bottom: '-10px',
                    transform: 'translateY(10px)',
                    p: '7px 13px'                                         
                }}
                >
                { reviews.length > 0 &&
                    <FlexStart sx={{width: '100%', pl: 1, pb: 1}}>
                        <Rating precision={0.5} value={getReviewAverage(reviews).average} readOnly />
                        <Typography variant='body1'>{`(${getReviewAverage(reviews).total})`}</Typography>
                    </FlexStart>
                }
                <FlexSpace sx={{p: 1}}>                                      
                    { product.inventory ?
                    
                        product.inventory > 0 ? 
                        <Tooltip title="Add to Basket">  
                            <IconButton color='secondary' onClick={() => addOne(product)}>
                            <AddShoppingCartIcon />
                            </IconButton>
                            </Tooltip>
                        : 
                        <Typography component='body1' color='red' >Sold out</Typography>
                    
                    : 
                    null
                    }
                    
                    
                        <Button disableElevation color='secondary' href={`/merchants/${pid}/products/${product.slug.current}`} variant='contained'>View Product</Button>
                </FlexSpace>
            </CardBanner>
        </PortfolioCard>
    </Slide>   
  )
}

export default ProductCard