import { Typography } from '@mui/material';
import React from 'react';
import { CenteredDiv } from '../../utils/styles';

const Order = ({order}) => {
    console.log(order)
  return (
    <CenteredDiv>
       {order && (
            <div>
              {order.items.data.map((item) => (
                    <CenteredDiv sx={{ m: 2, }} key={item.id}>
                        <Typography variant='subtitle1' align='left' gutterBottom>{item.description}</Typography>
                        <span>Qty: {item.quantity}</span>
                    </CenteredDiv>
              ))}
            </div>
          )}
    </CenteredDiv>
  )
}

export default Order;