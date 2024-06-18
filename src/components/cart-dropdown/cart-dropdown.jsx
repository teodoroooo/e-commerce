import { Button } from '../button/button'
import { CartItem } from '../cart-item/cart-item'
import { useContext } from 'react'
import { CartContext } from '../../context/cartContext'
import { useNavigate } from 'react-router-dom'
import './cart-dropdown.scss'

export function CartDropdown() {

  const { cartItems } = useContext(CartContext)
  const navigate = useNavigate()

  const goToCheckout = () => {
    navigate('/checkout')
  }

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
      {
        cartItems.map(item => (
          <CartItem cartItem={item} key={item.id} />
        ))
      }
      </div>
      <Button onClick={goToCheckout}>GO TO CHECKOUT</Button>
    </div>
  )
}