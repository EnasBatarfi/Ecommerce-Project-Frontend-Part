import React from "react"
import { Product } from "@/Components2/types/Types"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/Components2/toolkit/Store"
import { addItemToCart } from "@/Components2/toolkit/slices/CartSlice"
import { toast } from "react-toastify"
import styles from "./SingleProduct.module.css"

export const SingleProduct = (props: { product: Product }) => {
  const dispatch: AppDispatch = useDispatch()
  const { isLoggedIn } = useSelector((state: RootState) => state.customerR)
  const navigate = useNavigate()

  const handleAddToCart = () => {
    if (isLoggedIn) {
      dispatch(addItemToCart(props.product))
      toast.success("Product added to cart")
    } else {
      navigate("/customerLogin")
    }
  }

  return (
    <article className={styles.productCard}>
      <img src={props.product.imgUrl} alt={props.product.name} className={styles.productImg} />
      <div className={styles.productBody}>
        <h2 className={styles.productName}>{props.product.name}</h2>
        <p className={styles.productPrice}>
          Price:{" "}
          {props.product.price.toLocaleString("en-us", {
            style: "currency",
            currency: "SAR"
          })}
        </p>
        <p className={styles.productQuantity}>Quantity: {props.product.stockQuantity}</p>
        <div className={styles.productActions}>
          <Link to={`/products/${props.product.slug}`}>
            <button className={`${styles.btn} ${styles.productBtn}`}>
              Show Details <i className="fa fa-eye" aria-hidden="true"></i>
            </button>
          </Link>
          <button className={`${styles.btn} ${styles.productBtn}`} onClick={handleAddToCart}>
            Add To Cart <i className="fa fa-shopping-cart" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </article>
  )
}
