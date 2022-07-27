import React from 'react';
import { PortableText } from '@portabletext/react';

import { Alert, Button, FormControl, Grid, InputLabel, ListItem, MenuItem, Paper, Select, Typography } from '@mui/material';

import { useStateContext } from '../../utils/context/StateContext';
import { useCurrencyContext } from '../../utils/context/CurrencyContext';


const ProductDescription = ({ product }) => {
    const { onAdd, qty, setQty } = useStateContext();
    const { currencyConverter } = useCurrencyContext();
    const inventory = 13
    


    
  return (
    <Paper elevation={3} sx={{ p: 1 }}>
        <ListItem>
            <Typography
                gutterBottom
                variant='h6'
                component='h1'
            >
                {product.name}
            </Typography>
        </ListItem>
        <ListItem>
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
        </ListItem>
        {inventory > 0 && (
            <>
                <ListItem>
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
                </ListItem>
                <ListItem>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => onAdd(product, qty)}
                    >
                        Add to cart
                    </Button>
                </ListItem>
            </>
        )}
        <ListItem>
            {/* <Typography
                gutterBottom
                variant='body2'
                sx={{overflowWrap: 'normal', width: '100%', overflow: 'hidden'}}
            > */}
                <PortableText
                    value={product.body}
                />
            {/* </Typography> */}
        </ListItem>

    </Paper>
  )
}

export default ProductDescription;