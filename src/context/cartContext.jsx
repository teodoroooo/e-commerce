import { useEffect, useState } from "react";
import { createContext } from "react";


const addCartItem = (cartItems, productToAdd) => {
  //verificar se existe o produto já no carrinho
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  )

  //se encontar incrementa a quantidade
  if (existingCartItem) {
    return cartItems.map((cartItem) => 
      cartItem.id === productToAdd.id 
      ? {...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
    )
  }

  //retorna um novo array com o valor de CartItems modificado
  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, cartItemRemove) => {

  // encontrar o item a ser removido
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemRemove.id
  )


  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemRemove.id)
  }

  return cartItems.map((cartItem) => 
    cartItem.id === cartItemRemove.id
    ? {...cartItem, quantity: cartItem.quantity - 1 }
    : cartItem
  )
}

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter(cartItem => cartItem.id !==  cartItemToClear.id) 

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  clearItemToCart: () => {},
  cartCount: 0,
  cartTotal: 0
})

export const CartProvaider = ({ children }) => {

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, carItem) => total + carItem.quantity, 0)
    setCartCount(newCartCount)
  },[cartItems])

  useEffect(() => {
    const newCartTotal =  cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price ,0)
    setCartTotal(newCartTotal)
  },[cartItems])
 
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems,productToAdd))
  }

  const removeItemToCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems,cartItemToRemove))
  }

  const clearItemToCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems,cartItemToClear))
  }

  const value = { 
    isCartOpen, 
    setIsCartOpen, 
    cartItems,
    addItemToCart,
    cartCount,
    removeItemToCart,
    clearItemToCart,
    cartTotal
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}