import { Button } from "../button/button"
import { useContext } from "react"
import { CartContext } from "../../context/cartContext"

import './product-card.scss'

export function ProductCard ({ product }) {

  const { name, price, imageUrl } = product
  const { addItemToCart } = useContext(CartContext)

  const addProductToCart = () => addItemToCart(product)

  return (
    <div className='product-card-container'>
      <img src={imageUrl} alt={`${name}`}/>
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addProductToCart}>Add to Card</Button>
    </div>
  )
}