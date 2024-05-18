import { AppDispatch, RootState } from "@/toolkit/Store"
import { fetchProductBySlug } from "@/toolkit/slices/ProductSlice"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

export const ProductDetails = () => {
  const { slug } = useParams<{ slug: string }>()
  const { product, isLoading, error } = useSelector((state: RootState) => state.productR)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProductBySlug(slug))
      console.log(slug)
    }
    fetchData()
  }, [])
  return (
    <article className="details">
      <h2>Product Details</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {product && (
        <div className="product-details flex-center">
          <div className="product-details__left">
            <img src={product.imgUrl} alt={product.name} className="product-details__img" />
          </div>
          <div className="product-details__body product-details__right">
            <h3 className="product-details__name">Name: {product.name}</h3>
            <p className="product-details__description">Description: {product.description}</p>
            <p className="product-details__quantity">Quantity: {product.stockQuantity}</p>
            {/* sold but its not in our backend */}
            <p className="product-details__price">Price: {product.price}</p>
            <p>Product Added: {new Date(product.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </article>
  )
}
