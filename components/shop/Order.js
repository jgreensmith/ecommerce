import React from 'react';

import { Container, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';

import { CenteredDiv, Div, Flex, FlexEnd, FlexStart } from '../../utils/styles';

const Order = ({order, setModalOpen}) => {
    //console.log(order)
  return (
      <Container  >
          <Toolbar disableGutters >
              <FlexEnd>
                  <IconButton onClick={() => setModalOpen(false)}>
                        <CloseIcon />
                  </IconButton>
              </FlexEnd>
          </Toolbar>

        <Div sx={{pl: 2, mb: 2}}>
            <FlexStart>
                <Typography variant='subtitle1' align='left' gutterBottom>Shipping Address</Typography>
            </FlexStart>
            <FlexStart>
                <Typography variant='body1'>{order.session.shipping.address.line1},</Typography>
            </FlexStart>
            <FlexStart>
                <Typography variant='body1'>{order.session.shipping.address.city},</Typography>
            </FlexStart>
            <FlexStart>
                <Typography variant='body1'>{order.session.shipping.address.state}</Typography>
            </FlexStart>     
            <FlexStart>
                <Typography variant='body1'>{order.session.shipping.address.postal_code}</Typography>
            </FlexStart>    
        </Div>
        <hr />
        <TableContainer >
            <Table sx={{ minWidth: { vs: 450 } }} >
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
        <hr />

        <Div sx={{p: 2}}>
            <FlexEnd>

                <Typography variant='subtitle1' > Subtotal: £{parseFloat(order.session.amount_subtotal / 100).toFixed(2)}</Typography>
            </FlexEnd>
            <FlexEnd>

                <Typography variant='subtitle1' align='left'> Shipping: £{parseFloat(order.session.total_details.amount_shipping / 100).toFixed(2)}</Typography>
            </FlexEnd>
            <FlexEnd>

                <Typography variant='subtitle1' align='left'> Taxes: £{parseFloat(order.session.total_details.amount_tax / 100).toFixed(2)}</Typography>
            </FlexEnd>
            <FlexEnd>
              <Typography variant='h6' align='left'> Total: £{parseFloat(order.session.amount_total / 100).toFixed(2)}</Typography>

            </FlexEnd>
        </Div>
        
                          
                          
        


        </Container>

);
}

export default Order;