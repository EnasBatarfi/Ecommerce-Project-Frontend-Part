import { AppDispatch, RootState } from "@/Components2/toolkit/Store"
import { fetchProductBySlug } from "@/Components2/toolkit/slices/ProductSlice"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import styles from "./ProductDetails.module.css"

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
  }, [dispatch, slug])

  return (
    <article className={styles.details}>
      <h2>Product Details</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {product && (
        <div className={`${styles["product-details"]} flex-center`}>
          <div className={styles["product-details__left"]}>
            <img
              src={product.imgUrl}
              alt={product.name}
              className={styles["product-details__img"]}
            />
          </div>
          <div className={`${styles["product-details__body"]} ${styles["product-details__right"]}`}>
            <h3 className={styles["product-details__name"]}>Name: {product.name}</h3>
            <p className={styles["product-details__description"]}>
              Description: {product.description}
            </p>
            <p className={styles["product-details__quantity"]}>Quantity: {product.stockQuantity}</p>
            <p className={styles["product-details__price"]}>Price: {product.price}</p>
            <p>Product Added: {new Date(product.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </article>
  )
}
