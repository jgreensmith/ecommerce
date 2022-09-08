import React from 'react';
import { PortableText } from '@portabletext/react';

import { Alert, Button, FormControl, Grid, InputLabel, Menu, MenuItem, MenuList, Paper, Select, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { useStateContext } from '../../utils/context/StateContext';
import { useCurrencyContext } from '../../utils/context/CurrencyContext';
import { useState } from 'react';
import Link from 'next/link';
import { Div, FlexEven, StyledList, StyledUnList } from '../../utils/styles';
import { urlFor } from '../../lib/sanity';
import { ConstructionOutlined } from '@mui/icons-material';


const ProductDescription = ({props}) => {
    const { product, variantHandler, selectVariant, secondaryVariantList, secondaryVariantHandler, tertiaryVariantList, newProduct } = props
    const { onAdd, qty, setQty } = useStateContext();
    const { currencyConverter } = useCurrencyContext();
    //const inventory = 13
    const variants = product?.variants ? product.variants : []
    const oneVarBool = product?.boolObj?.oneVarBool
    const twoVarBool = product?.boolObj?.twoVarBool
    const primaryVariants = product?.primaryVariants ? product.primaryVariants : []
    
    
    
  return (
    <Paper elevation={3} sx={{ p: 1 }}>
        <Div sx={{ p: 1}}>
            <Typography
                gutterBottom
                variant='h6'
                component='h1'
            >
                {product.name}
            </Typography>
        </Div>
        <Div sx={{ p: 1}}>
            <Grid container>
                <Grid item xs={6}>
                    <Typography 
                        sx={{
                        fontWeight: 700,
                        fontSize: "1.7rem", 
                        pr: 1
                        }}
                    >
                        {currencyConverter.format(newProduct.price) }
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    {
                        !product.inventory && newProduct === product ? (
                            <Alert icon={false} severity="info">
                                Select Variant
                            </Alert>
                        ) : 
                        newProduct.inventory > 0 ? (
                            <Alert icon={false} severity="success">
                                In Stock
                            </Alert>
                        ) : (
                            <Alert icon={false} severity="error">
                                Unavailable
                            </Alert>
                        )
                    }
                </Grid>
            </Grid>
        </Div>
        {newProduct.inventory > 0 && (
            <React.Fragment>
                <Div sx={{ p: 1}}>
                    <FormControl fullWidth>
                        <InputLabel>Quantity</InputLabel>
                        <Select
                            labelId="quanitity-label"
                            label="Quantity"
                            id="quanitity"
                            fullWidth
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            inputProps={{MenuProps: {disableScrollLock: true}}}
                        >
                            {[...Array(newProduct.inventory).keys()].map((x) => (
                                <MenuItem key={x + 1} value={x + 1}>
                                    {x + 1}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>     
                </Div>
            </React.Fragment>
        )}
        <Div sx={{ p: 1}}>
                <Div sx={{ p: 1}}>
                {oneVarBool ? 
                    <Paper elevation={0} sx={{ width: 350, maxWidth: '100%' }}>
                    <Typography variant='subtitle1' sx={{textTransform: 'capitalize'}}> {product.variantTitle}</Typography>
                        <FlexEven >
                            {variants.map((x) => (
                                <Button color='inherit' key={x._key} size='small' variant='outlined' sx={{m: 1}} onClick={() => variantHandler(x)} >
                                    <Typography variant='subtitle1' sx={{textTransform: 'capitalize'}}> {x.variantValue}</Typography>
                                </Button>
                            ))}
                        </FlexEven>
                    </Paper>
                :
                    <Paper elevation={0} sx={{ width: 350, maxWidth: '100%' }}>
                        <Typography variant='subtitle1' sx={{textTransform: 'capitalize'}}> {product.primaryVarTitle}</Typography>
                        <FlexEven >
                            {primaryVariants.map((x) => (
                                <Button color='inherit' key={x._key} size='small' variant='outlined' sx={{m: 1}} onClick={() => variantHandler(x)} >
                                    <Typography variant='subtitle1' sx={{textTransform: 'capitalize'}}> {x.variantValue}</Typography>
                                </Button>
                            ))}
                        </FlexEven>
                        <Typography variant='subtitle1' sx={{textTransform: 'capitalize'}}> {product.secondaryVarTitle}</Typography>
                        <FlexEven >
                            {secondaryVariantList.map((x, i) => (
                                <Button color='inherit' key={i} size='small' variant='outlined' sx={{m: 1}} onClick={() => secondaryVariantHandler(x)}>
                                    <Typography variant='subtitle1' sx={{textTransform: 'capitalize'}}> {x}</Typography>

                                </Button>
                            ))}
                        </FlexEven>
                        {
                            !twoVarBool &&
                            <React.Fragment>
                                <Typography variant='subtitle1' sx={{textTransform: 'capitalize'}}> {product.tertiaryVarTitle}</Typography>
                                {!tertiaryVariantList.length ? 
                                    <Button color='inherit' size='small' variant='text' sx={{m: 1}} disabled={true}>
                                        <Typography variant='subtitle1' sx={{textTransform: 'capitalize'}}> * Select {product.secondaryVarTitle} *</Typography>
                                    </Button>
                                :
                                
                                <FlexEven >
                                        {tertiaryVariantList.map((x, i) => (
                                            <Button color='inherit' key={i} size='small' variant='outlined' sx={{m: 1}} onClick={() => selectVariant(x)} >
                                                <Typography variant='subtitle1' sx={{textTransform: 'capitalize'}}> {x}</Typography>

                                            </Button>
                                        ))}
                                    </FlexEven>
                                }
                            </React.Fragment>
                        }

                    </Paper>
                }

                </Div>


                {
                    newProduct.inventory > 0 &&
               
                        <Div sx={{ p: 1}}>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                onClick={() => onAdd(newProduct, qty)}
                            >
                                Add to cart
                            </Button>
                        </Div>
                }
          
            
                <PortableText
                    value={product.body}
                />
        </Div>

    </Paper>
  )
}

export default ProductDescription;