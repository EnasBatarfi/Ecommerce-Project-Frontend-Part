import React from "react"
import { Product } from "@/Components2/types/Types"
import { Link } from "react-router-dom"

export const SingleProduct = (props: { product: Product }) => {
  return (
    <article className="product card">
      <div className="product__header">
        <h2 className="product__name">{props.product.name}</h2>
        <p className="product__description">{props.product.description}</p>
      </div>
      <Link to={`/dashboard/admin/products/${props.product.slug}`}>
        <button className="btn product__btn">
          View Details <i className="fa fa-eye" aria-hidden="true"></i>
        </button>
      </Link>
    </article>
  )
}
