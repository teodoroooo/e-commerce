import { useContext } from 'react'
import  ShoppingIcon  from '../../assets/shopping-cart-simple.svg'
import { CartContext } from '../../context/cartContext'
import './cart-icon.scss'
export function CartIcon() {

  const {isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext)

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <img src={ShoppingIcon} className="shopping-icon" />
      <span className='item-count'>{cartCount}</span>
    </div>
  )
}
