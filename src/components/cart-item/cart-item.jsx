import './cart-item.scss'

export function CartItem( { cartItem } ) {

  const { name, quantity, imageUrl, price } = cartItem

  return (
    <div className="cart-item-container">
      <div>
        <img src={imageUrl}/>
        <div className="item-datails">
          <span className="name">{name}</span>
          <span className="price">{quantity} x ${price}</span>
        </div>
      </div>
    </div>
  )
}