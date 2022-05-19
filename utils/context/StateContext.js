import React, { createContext, useState } from "react";
import { toast } from "react-hot-toast";


export const StateContext = createContext();

export const StateContextProvider = (props) => {
    //state
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        //check if product is already in cart
        const checkProductInCart = cartItems.find((item) => item._id === product._id)

        //set new price and quantity
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        //if product is in cart, re organise cart items so that one item but increase quantity
        if(checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
              if(cartProduct._id === product._id) return {
                ...cartProduct,
                quantity: cartProduct.quantity + quantity
              }
            })
      
            setCartItems(updatedCartItems);
        } else {
            //add product
            product.quantity = quantity;
            
            setCartItems([...cartItems, { ...product }]);
        }
      
        toast.success(`${qty} ${product.name} added to the cart.`);
    }

    return (
        <StateContext.Provider
          value={{
            showCart,
            setShowCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            setQty,
            onAdd,
            setCartItems,
            setTotalPrice,
            setTotalQuantities 
          }}
        >
          {props.children}
        </StateContext.Provider>
    )

}

export default StateContextProvider;