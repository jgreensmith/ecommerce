import React from 'react';

import { Grid, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CenteredDiv, Flex } from '../../utils/styles';

const Order = ({order}) => {
    console.log(order)
  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: { vs: 450 } }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Item</TableCell>
          <TableCell align="right">Qty</TableCell>
          <TableCell align="right">Price</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {order.items.data.map((item) => (
          <TableRow
            key={item.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {item.description}
            </TableCell>
            <TableCell align="right">{item.quantity}</TableCell>
            <TableCell align="right">£{parseFloat(item.amount_total / 100).toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
    // <CenteredDiv>
    //    {order && (
    //         <div>
    //           {order.items.data.map((item) => (
                 
                    
    //                     <Flex key={item.id}  sx={{ m: 2, p: 2, justifyContent: 'space-between', width: '100%' }} >
    //                         <div>
    //                             <Typography variant='subtitle1' align='left' gutterBottom>{item.description}</Typography>
    //                             <span>Qty: {item.quantity}</span>
    //                         </div>
                            
    //                             <Typography sx={{m: 3}} align='right'>£{parseFloat(item.amount_total / 100).toFixed(2)}</Typography>
                            



    //                     </Flex>
                      
    //           ))}
    //         </div>
    //       )}
    // </CenteredDiv>
//   )
 }

export default Order;