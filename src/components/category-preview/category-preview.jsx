import { Link } from "react-router-dom";
import { ProductCard } from "../product-card/product-card";
import './category-preview.scss'

export function CategoryPreview({ title, products }){
  return (
    <div className='category-preview-container'>
      <h2>
        <Link to={title}>{title.toUpperCase()}</Link>
      </h2>
      <div className='preview'>
        {
          products.filter((_, idx) => idx  < 4)
          .map((product) => <ProductCard key={product.id} product={product}/>)
        }
      </div>
    </div>
  )
}