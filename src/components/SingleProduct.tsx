import { Product } from "@/types/Types"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/toolkit/Store"
import { addItemToCart } from "@/toolkit/slices/CartSlice"
import { toast } from "react-toastify"

export const SingleProduct = (props: { product: Product }) => {
  const dispatch: AppDispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addItemToCart(props.product))
    toast.success("Product added to cart")
  }

  return (
    <article className="product card">
      <img src={props.product.imgUrl} alt={props.product.name} className="product__img" />
      <div className="product__body">
        <h2 className="product__name">{props.product.name}</h2>
        <p>
          Price:
          {props.product.price.toLocaleString("en-us", {
            style: "currency",
            currency: "SAR"
          })}
        </p>
        <p>Quantity: {props.product.stockQuantity}</p>
        <div>
          <Link to={`/products/${props.product.slug}`}>
            <button className="btn product__btn">
              Show Details <i className="fa fa-eye" aria-hidden="true"></i>
            </button>
          </Link>
          <button className="btn product__btn" onClick={handleAddToCart}>
            Add To Cart<i className="fa fa-shopping-cart" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </article>
  )
}
