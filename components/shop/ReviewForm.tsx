import { useContext, useEffect, useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import { Button, DialogActions, DialogContent, DialogTitle, Divider, FormControl, IconButton, InputLabel, MenuItem, Paper, Rating, Select, TextField, Toolbar, Typography } from "@mui/material";

import { useStateContext } from "../../utils/context/StateContext";
import { FormBox, InputContainer } from "../../utils/styles";


export default function ReviewForm ({props}: any) {

    const { items, connectId, sessionId, name } = props
    const [thankyou, setThankyou] = useState(false);
    const [rating, setRating] = useState(2)
    const [review, setReview] = useState('')

    // const [form, setForm] = useState({
    //     rating: 2,
    //     review: ''
    // }); 
    //update posts
    const { setModalOpen, currentId, setCurrentId } = useStateContext();

    //const currentReview = users.find((rev: any) => user._id === currentId)
    const item = items.find((item: any) => item.price.product.metadata.product_id === currentId)

    // useEffect(() => {
    //     setForm({
            
    //     })
    // }, [])
 

    

    const clear = () => {
        setCurrentId(null);
        setModalOpen(false);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch('/api/add-review', {
            method: 'POST',
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({connectId, sessionId, review, rating, name, prodId: item.price.product.metadata.product_id })
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.error) {
                console.log(data.error)
            } else {
                setThankyou(true)
            }
        })
        
    }

    return(
        <Paper  sx={{minWidth: "373px"}}>
            <DialogTitle sx={{m: 0, p: 2, display: "flex", justifyContent: "space-between"}}>
                <Typography variant="h6" align="center">{item?.price.product.name}</Typography>
                <IconButton
                    aria-label="close"
                    onClick={clear}
                    sx={{ml: 2}}
                >
                    <VscChromeClose />
                </IconButton>
            </DialogTitle>

            {thankyou ? 
            <Typography component='h6'>Thankyou for your feedback</Typography>
            :
                <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <DialogContent dividers>
                    <InputContainer>
                    <Rating
                        name="rating"
                        value={rating}
                        onChange={(e, newValue) => {
                            setRating(newValue)}
                        }
                    />
                    </InputContainer>
                    <InputContainer>
                        <TextField
                            name="review"
                            value={review}
                            variant="outlined"
                            label="Review"
                            multiline
                            fullWidth
                            sx={{m:2, pr:3}}
                            onChange={(e) => setReview(e.target.value)}
                            />
                    </InputContainer>
                    
                  
                </DialogContent>
                <DialogActions>
                    <Button  variant="contained" color="primary" size="large" type="submit" fullWidth sx={{p:2}}>Submit</Button>
                    <Button onClick={clear} variant="text" color="secondary" size="small"  fullWidth sx={{p:2}}>Clear</Button>
                </DialogActions>
                </form>
            }
        </Paper>
    )
}