import { useContext } from "react"
import { CartContext } from "../../context/cartContext"
import { CheckoutItem } from "../../components/checkout-item"
import './style.scss'

export function Checkout() {

  const {cartItems, cartTotal} = useContext(CartContext)

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div>
          <span>Produto</span>
        </div>
        <div>
          <span>Descrição</span>
        </div>
        <div>
          <span>Quantidade</span>
        </div>
        <div>
          <span>Preço</span>
        </div>
        <div>
          <span>Remover</span>
        </div>
      </div>
      {
        cartItems.map((cartItem) => <CheckoutItem cartItem={cartItem} key={cartItem.id} />)
      }
      <span className="total">Total: ${cartTotal}</span>
    </div>
  )
}