import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { inventoryHandler } from "../functions";


export const Context = createContext();

export const StateContext = (props) => {

    //review state
    const [modalOpen, setModalOpen] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    //cart state
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);
    const router = useRouter()
    const piddy = router.query.pid

    let foundProduct;
    let index;
    let change;

    useEffect(() => {
      if (localStorage.getItem("cart")) {
        const arr = JSON.parse(localStorage.getItem("cart"))
        const filteredArr = arr.filter(x => x.pid === piddy)
        setCartItems(filteredArr);
        setTotalPrice(0);
        setTotalQuantities(0);
        filteredArr.map((item) => {
          setTotalQuantities(
            (prevTotalQuantities) => prevTotalQuantities + item.quantity
          );
          setTotalPrice(
            (prevTotalPrice) => prevTotalPrice + item.price * item.quantity
          );
        });
      }
    }, []);

    const onAdd = async (product, quantity) => {
      //manage inventory
      await inventoryHandler(product, quantity, change="dec")
        //check if product is already in cart
      const checkProductInCart = cartItems.find((item) => item._id === product._id)

      //if product is in cart, re organise cart items so that one item but increase quantity
      //when using map in this way, use const and return
      if(checkProductInCart) {
          const updatedCartItems = cartItems.map((item) => {
            if(item._id === product._id){
              const newQty = item.quantity + quantity;
              return {
              
                ...item,
                quantity: newQty,
                
              };
            } else {
              return {
                ...item,
              };
            } 
          });
    
          setCartItems(updatedCartItems);
          localStorage.setItem("cart", JSON.stringify(updatedCartItems));
          
            
        } else {
            //add product
          product.quantity = quantity;
            
          setCartItems([...cartItems, { ...product }]);
          localStorage.setItem(
            "cart",
            JSON.stringify([...cartItems, { ...product }])
          );

        }
       //set new price and quantity
       setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
       setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
      toast.success(`${qty} ${product.name} added to the cart.`);
    }
    const onRemove = async (product) => {
      foundProduct = cartItems.find((item) => item._id === product._id);
      const newCartItems = cartItems.filter((item) => item._id !== product._id);

      await inventoryHandler(product, foundProduct.quantity, change="inc")
  
      setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
      setCartItems(newCartItems);
      localStorage.setItem("cart", JSON.stringify(newCartItems));
    }
  
    const toggleCartItemQuanitity = async (id, value) => {
      foundProduct = cartItems.find((item) => item._id === id)
      index = cartItems.findIndex((product) => product._id === id);
      const newCartItems = cartItems.filter((item) => item._id !== id)
      const quan = 1
  
      if(value === 'inc') {
        //increase number in cart, decrease number in inventory
        await inventoryHandler(foundProduct, quan, change="dec")
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
        localStorage.setItem("cart", JSON.stringify([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]))
        setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
      } else if(value === 'dec') {
        if (foundProduct.quantity > 1) {
          await inventoryHandler(foundProduct, quan, change="inc")
          setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
          localStorage.setItem("cart", JSON.stringify([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]))
          setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
          setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
        }
      }
    };
  
    const incQty = () => {
      setQty((prevQty) => prevQty + 1);
    }
  
    const decQty = () => {
      setQty((prevQty) => {
        if(prevQty - 1 < 1) return 1;
       
        return prevQty - 1;
      });
    }

    return (
        <Context.Provider
          value={{
            showCart,
            setShowCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            setQty,
            incQty,
            decQty,
            onAdd,
            toggleCartItemQuanitity,
            onRemove,
            setCartItems,
            setTotalPrice,
            setTotalQuantities,
            setCurrentId,
            currentId,
            setModalOpen,
            modalOpen
          }}
        >
          {props.children}
        </Context.Provider>
    )

}

export const useStateContext = () => useContext(Context);
