import { Paper, Typography } from '@mui/material';
import React from 'react';

const ProductDescription = ({name, details, price}) => {
  return (
    <Paper>
        <div>
            <Typography
                gutterBottom
                variant='h6'
                component='h1'
            >
                {name}
            </Typography>
        </div>
        <div>
            <Typography 
                sx={{
                    fontWeight: 700,
                    fontSize: "1.7rem", 
                }}
            >
                {price}
            </Typography>
        </div>
        <div>
            <Typography
                gutterBottom
                variant='body2'
            >
                {details}
            </Typography>
        </div>

    </Paper>
  )
}

export default ProductDescription;