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
import { ConstructionOutlined } from '@mui/icons-material';


const ProductDescription = ({props}) => {
    const { product, variantHandler, defaultVariantHandler, childVariantList } = props
    const { onAdd, qty, setQty } = useStateContext();
    const { currencyConverter } = useCurrencyContext();
    const inventory = 13
    const variants = product.variants ? product.variants : []
    //const dimensionVariants = product.dimensionVariants ? product.dimensionVariants : []

    //Aesthetic and Dimension states
    const [anchorElVar, setAnchorElVar] = useState(null);
    const [anchorElVarD, setAnchorElVarD] = useState(null);

    const [varOpen, setVarOpen] = useState(false);
    const [varDiOpen, setVarDiOpen] = useState(false);

    const handleVarClose = () => {
        setAnchorElVar(null);
        setVarOpen(false);
    }
    const handleVarClick = (e) => {
        setAnchorElVar(e.currentTarget);
        setVarOpen(true);
    }
    const handleVarDiClose = () => {
        setAnchorElVarD(null);
        setVarDiOpen(false);
    }
    const handleVarDiClick = (e) => {
        setAnchorElVarD(e.currentTarget);
        setVarDiOpen(true);
    }

    // //Dimension states
    // const [anchorElDim, setAnchorElDim] = useState(null);
    // const [anchorElSecDim, setAnchorElSecDim] = useState(null);

    // const [dimOpen, setDimOpen] = useState(false);
    // const [secDimOpen, setSecDimOpen] = useState(false);
 
    // const handleDimClose = () => {
    //     setAnchorElDim(null);
    //     setDimOpen(false);
    // }
    // const handleDimClick = (e) => {
    //     setAnchorElDim(e.currentTarget);
    //     setDimOpen(true);
    // }
    // const handleSecDimClose = () => {
    //     setAnchorElSecDim(null);
    //     setSecDimOpen(false);
    // }
    // const handleSecDimClick = (e) => {
    //     setAnchorElSecDim(e.currentTarget);
    //     setSecDimOpen(true);
    // }


   //console.log(dimensionVariants)
   //console.log(secondDimensionList)
    
    
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
                            {[...Array(inventory).keys()].map((x) => (
                                <MenuItem key={x + 1} value={x + 1}>
                                    {x + 1}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>     
                </Div>
                { product.variants &&
                    <React.Fragment>
                    <Div sx={{ p: 1}}>
                        <Button 
                            variant="outlined"
                            onClick={handleVarClick}
                            fullWidth
                            aria-controls="basic-menu"
                            aria-haspopup="true"
                            aria-expanded={varOpen ? 'true' : undefined}
                            sx={{color: 'text.dark'}}   
                            endIcon={<ArrowDropDownIcon />}                
                        >
                            {product.parentTitle}
                        </Button>
                        <Menu anchorEl={anchorElVar} open={varOpen} onClose={handleVarClose}  >
                            <Paper elevation={0} sx={{ width: 250, maxWidth: '100%' }}>
                                <MenuList>
                                    <MenuItem  onClick={handleVarClose} sx={{ width: '100%'}} >
                                                
                                        <Button variant='text' sx={{textTransform: 'capitalize', width: '100%', color: 'text.dark', py: 0}} onClick={defaultVariantHandler}>
                                            <Typography sx={{width: '100%'}} align='center' variant='body1'>
                                                {product.defaultParentValue}
                                            </Typography>
                                        </Button>
                                            
                                        
                                    </MenuItem>
                                    {
                                        variants.map((x) => (
                                            <MenuItem key={x._key} onClick={handleVarClose} sx={{ width: '100%'}} >
                                                
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
                    {
                        product.childObj &&
                        <Div sx={{ p: 1}}>
                        <Button 
                            variant="outlined"
                            onClick={handleVarDiClick}
                            fullWidth
                            aria-controls="basic-menu"
                            aria-haspopup="true"
                            aria-expanded={varDiOpen ? 'true' : undefined}
                            sx={{color: 'text.dark'}}   
                            endIcon={<ArrowDropDownIcon />}                
                        >
                            {product.childObj.childTitleA}
                            {product.childObj.childTitleB ? ` & ${product.childObj.childTitleB}` : ""}
                        </Button>
                        <Menu anchorEl={anchorElVarD} open={varDiOpen} onClose={handleVarDiClose}  >
                            <Paper elevation={0} sx={{ width: 350, maxWidth: '100%' }}>
                                <MenuList>
                                    {
                                        childVariantList.map((x) => (
                                            <MenuItem key={x._key} onClick={handleVarDiClose} sx={{ width: '100%'}} >
                                                
                                                <Button variant='text' sx={{textTransform: 'capitalize', width: '100%', color: 'text.dark', py: 0}} onClick={handleVarDiClose} >
                                                    <Typography sx={{width: '100%'}} align='center' variant='body1'>
                                                    {product.childObj.childTitleB ? `${product.childObj.childTitleA}: ` : ""}
                                                    {x.childA}{product.childObj.childTitleB ? " | " : ""}
                                                    {product.childObj.childTitleB ? `${product.childObj.childTitleB}: ` : ""}
                                                    {x.childB ? x.childB : ""}
                                                    {x.price ? ` (${currencyConverter.format(x.price)})` : ""}
                                                    </Typography>
                                                </Button>
                                                   
                                                
                                            </MenuItem>
                                        ))
                                    }
                                
                             </MenuList>
                            </Paper>
                        </Menu>
                                    
     
                        
                        
                    </Div>
                    }
                    
                            
                        
                    </React.Fragment>
                }
                {/* {
                    product.dimensionVariants && 
                        <React.Fragment>
                            <Div sx={{ p: 1}}>
                                <Button 
                                    variant="outlined"
                                    onClick={handleDimClick}
                                    fullWidth
                                    aria-controls="basic-menu"
                                    aria-haspopup="true"
                                    aria-expanded={dimOpen ? 'true' : undefined}
                                    sx={{color: 'text.dark'}}   
                                    endIcon={<ArrowDropDownIcon />}                
                                >
                                    {product.dimensionTitle ? product.dimensionTitle : "Dimension"}
                                </Button>
                                <Menu anchorEl={anchorElDim} open={dimOpen} onClose={handleDimClose}  >
                                    <Paper elevation={0} sx={{ width: 250, maxWidth: '100%' }}>
                                        <MenuList>
                                            <MenuItem  onClick={handleDimClose} sx={{ width: '100%'}} >
                                                        
                                                <Button variant='text' sx={{textTransform: 'capitalize', width: '100%', color: 'text.dark', py: 0}} onClick={defaultDimensionHandler}>
                                                    <Typography sx={{width: '100%'}} align='center' variant='body1'>
                                                        {product.defaultDimension ? product.defaultDimension : "Default Dimension"}
                                                    </Typography>
                                                </Button>
                                                    
                                                
                                            </MenuItem>
                                            {
                                                dimensionVariants.map((x) => (
                                                    <MenuItem key={x._key} onClick={handleDimClose} sx={{ width: '100%'}} >
                                                        
                                                        <Button variant='text' sx={{textTransform: 'capitalize', width: '100%', color: 'text.dark', py: 0}} onClick={() => dimensionHandler(x)}>
                                                            <Typography sx={{width: '100%'}} align='center' variant='body1'>
                                                                {x.dimensionSize}
                                                            </Typography>
                                                        </Button>
                                                        
                                                        
                                                    </MenuItem>
                                                ))
                                            }
                                    </MenuList>
                                    </Paper>
                                </Menu>
                                            

                                
                            </Div>
                            <Div sx={{ p: 1}}>
                                <Button 
                                    variant="outlined"
                                    onClick={handleSecDimClick}
                                    fullWidth
                                    aria-controls="basic-menu"
                                    aria-haspopup="true"
                                    aria-expanded={secDimOpen ? 'true' : undefined}
                                    sx={{color: 'text.dark'}}   
                                    endIcon={<ArrowDropDownIcon />}                
                                >
                                    {product.secondDimensionTitle ? product.secondDimensionTitle : "Second Dimension"}
                                </Button>
                                <Menu anchorEl={anchorElSecDim} open={secDimOpen} onClose={handleSecDimClose}  >
                                    <Paper elevation={0} sx={{ width: 250, maxWidth: '100%' }}>
                                        <MenuList>
                                            
                                            {
                                                secondDimensionList.map((x) => (
                                                    <MenuItem key={x._key} onClick={handleSecDimClose} sx={{ width: '100%'}} >
                                                        
                                                        <Button variant='text' sx={{textTransform: 'capitalize', width: '100%', color: 'text.dark', py: 0}} onClick={handleVarDiClose} >
                                                            <Typography sx={{width: '100%'}} align='center' variant='body1'>
                                                            {x.secondDimension}
                                                            {x.sizePrice ? ` (${currencyConverter.format(x.sizePrice)})` : ""}
                                                            </Typography>
                                                        </Button>
                                                        
                                                        
                                                    </MenuItem>
                                                ))
                                            }
                                    </MenuList>
                                    </Paper>
                                </Menu>
                                            

                                
                            </Div>
                        </React.Fragment>
                } */}
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
            </React.Fragment>
        )}
        <Div sx={{ p: 1}}>
            
                <PortableText
                    value={product.body}
                />
        </Div>

    </Paper>
  )
}

export default ProductDescription;