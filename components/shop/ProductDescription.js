import React from 'react';
import { PortableText } from '@portabletext/react';

import { Alert, Button, FormControl, Grid, InputLabel, Menu, MenuItem, MenuList, Paper, Select, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { useStateContext } from '../../utils/context/StateContext';
import { useCurrencyContext } from '../../utils/context/CurrencyContext';
import { useState } from 'react';
import Link from 'next/link';
import { Div, StyledList, StyledUnList } from '../../utils/styles';
import { urlFor } from '../../lib/sanity';


const ProductDescription = ({ product, colorProducts, colorBool, variants, variantHandler }) => {
    const { onAdd, qty, setQty } = useStateContext();
    const { currencyConverter } = useCurrencyContext();
    const inventory = 13

    //color dropdown menu
    const [anchorElm, setAnchorElm] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setAnchorElm(null);
        setOpen(false)
    }
    const handleClick = (e) => {
        setAnchorElm(e.currentTarget);
        setOpen(true);
    }
    
    console.log(colorProducts)
    
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
                        {currencyConverter.format(product.price) }
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    {inventory > 0 ? (
                        <Alert icon={false} severity="success">
                            In Stock
                        </Alert>
                    ) : (
                        <Alert icon={false} severity="error">
                            Unavailable
                        </Alert>
                    )}
                </Grid>
            </Grid>
        </Div>
        {inventory > 0 && (
            <>
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
                            {[...Array(inventory).keys()].map((x) => (
                                <MenuItem key={x + 1} value={x + 1}>
                                    {x + 1}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>     
                </Div>
                {
                    <>
                    <Div sx={{ p: 1}}>
                        <Button 
                            variant="outlined"
                            onClick={handleClick}
                            fullWidth
                            aria-controls="basic-menu"
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            sx={{color: 'text.dark'}}   
                            endIcon={<ArrowDropDownIcon />}                
                        >
                            Colour Options
                        </Button>
                        <Menu anchorEl={anchorElm} open={open} onClose={handleClose}  >
                            <Paper elevation={0} sx={{ width: 250, maxWidth: '100%' }}>
                                <MenuList>
                                    {
                                        variants.map((x) => (
                                            <MenuItem key={x._key} onClick={handleClose} sx={{ width: '100%'}} >
                                                
                                                <Button variant='text' sx={{textTransform: 'capitalize', width: '100%', color: 'text.dark', py: 0}} onClick={() => variantHandler(x)}>
                                                    <Typography sx={{width: '100%'}} align='center' variant='body1'>
                                                        {x.title}
                                                    </Typography>
                                                </Button>
                                                   
                                                
                                            </MenuItem>
                                        ))
                                    }
                             </MenuList>
                            </Paper>
                        </Menu>
                                    

                            

                           
                        
                        
                    </Div>
                            
                        
                    </>
                }
                <Div sx={{ p: 1}}>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={() => onAdd(product, qty)}
                    >
                        Add to cart
                    </Button>
                </Div>
            </>
        )}
        <Div sx={{ p: 1}}>
            {/* <Typography
                gutterBottom
                variant='body2'
                sx={{overflowWrap: 'normal', width: '100%', overflow: 'hidden'}}
            > */}
                <PortableText
                    value={product.body}
                />
            {/* </Typography> */}
        </Div>

    </Paper>
  )
}

export default ProductDescription;