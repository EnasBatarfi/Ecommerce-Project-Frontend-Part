import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { AppDispatch, RootState } from "@/Components2/toolkit/Store"
import { fetchProductBySlug } from "@/Components2/toolkit/slices/ProductSlice"
import styles from "./ProductDetails.module.css"

export const ProductDetails = () => {
  const { slug } = useParams<{ slug: string }>()
  const { product, isLoading, error } = useSelector((state: RootState) => state.productR)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProductBySlug(slug))
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

      {product?.reviews && (
        <div className={styles.reviews}>
          <h3>Customer Reviews</h3>
          {product.reviews.length > 0 ? (
            product.reviews.map((review) => (
              <div key={review.reviewId} className={styles.review}>
                <p className={styles.reviewRating}>Rating: {review.rating}</p>
                <p className={styles.reviewComment}>{review.comment}</p>
                <p className={styles.reviewDate}>{new Date(review.reviewDate).toLocaleString()}</p>
                {review.isAnonymous && <p className={styles.reviewAnonymous}>Anonymous</p>}
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      )}
    </article>
  )
}
