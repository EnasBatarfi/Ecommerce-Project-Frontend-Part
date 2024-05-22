import { Category } from "@/types/Types"
import { Link } from "react-router-dom"

export const SingleCategory = (props: { category: Category }) => {
  return (
    <article className="category card">
      <div className="category__header">
        <h2 className="category__name">{props.category.name}</h2>
        <p className="category__description">{props.category.description}</p>
      </div>
      <Link to={`/dashboard/admin/categories/${props.category.slug}`}>
        <button className="btn category__btn">
          View Details <i className="fa fa-eye" aria-hidden="true"></i>
        </button>
      </Link>

      {/* <div className="category__products">
        {props.category.products.map((product) => (
          <div key={product.productId} className="product card">
            <img src={product.imgUrl} alt={product.name} className="product__img" />
            <div className="product__body">
              <h3 className="product__name">{product.name}</h3>
              <p>
                Price:
                {product.price.toLocaleString("en-us", {
                  style: "currency",
                  currency: "SAR"
                })}
              </p>
              <p>Quantity: {product.stockQuantity}</p>

              <div>
                <Link to={`/products/${product.slug}`}>
                  <button className="btn product__btn">
                    Show Details <i className="fa fa-eye" aria-hidden="true"></i>
                  </button>
                </Link>
                <button className="btn product__btn">
                  Add To Cart<i className="fa fa-shopping-cart" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </article>
  )
}
