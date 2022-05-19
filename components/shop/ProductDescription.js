import React from 'react';
import { PortableText } from '@portabletext/react';

import { Paper, Typography } from '@mui/material';

const ProductDescription = ({name, body, price}) => {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
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
                <PortableText
                    value={body}
                />
            </Typography>
        </div>

    </Paper>
  )
}

export default ProductDescription;