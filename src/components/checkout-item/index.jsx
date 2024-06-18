import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import './style.scss'

export function CheckoutItem( { cartItem }) {
  const { removeItemToCart, addItemToCart, clearItemToCart } = useContext(CartContext)
  const { name, imageUrl, price, quantity } = cartItem

  const clearItem = () => clearItemToCart(cartItem)
  const addItem = () => addItemToCart(cartItem)
  const removeItem = () => removeItemToCart(cartItem)

  return (
    <div className="checkout-item-container ">
      <div className="image-container">
        <img src={imageUrl} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div onClick={removeItem} className="arrow">
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div onClick={addItem} className="arrow">
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div onClick={clearItem} className="remove">
        &#10005;
      </div>
    </div>
  )
}