import { Product } from "@/types/ProductType"
import { Link } from "react-router-dom"

export const SingleProduct = (props: { product: Product }) => {
  return (
    <article className="product card">
      <img src={props.product.imgUrl} alt={props.product.name} className="product__img" />
      <div className="product__body">
        <h2 className="product__name">{props.product.name}</h2>
        {/* <p>{props.product.description}</p> */}
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
              Sow Details <i className="fa fa-eye" aria-hidden="true"></i>
            </button>
          </Link>
          <button className="btn product__btn">
            Add To Cart<i className="fa fa-shopping-cart" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </article>
  )
}
