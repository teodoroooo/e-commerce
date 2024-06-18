import { useParams } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { ProductCard } from "../../components/product-card/product-card"
import { CategoryContainer, TitleCategoryShop } from "./style"
import { CategoriesContext } from '../../context/categoriesContext'

export function CategoryShop(){

  const { category } = useParams()

  const { categoriesMap } = useContext(CategoriesContext)
  const [products, setProducts] = useState(categoriesMap[category])

  useEffect(() =>  {
    setProducts(categoriesMap[category])
  },[category, categoriesMap])

  return (
    <>
      <TitleCategoryShop>{category.toUpperCase()}</TitleCategoryShop>
      <CategoryContainer>
        {
          products && products.map((product) => <ProductCard key={product.id} product={product} />)
        }
      </CategoryContainer>
        
     
    </>
  )
}