import { Category } from "@/Components2/types/Types"
import { Link } from "react-router-dom"

export const SingleCategory = (props: { category: Category }) => {
  return (
    <article className="category card">
      <div className="category__body">
        <h2 className="category__name">{props.category.name}</h2>
        <p>{props.category.description}</p>
        <div>
          <Link to={`/dashboard/admin/categories/${props.category.slug}`}>
            <button className="btn category__btn">Show Details</button>
          </Link>
        </div>
      </div>
    </article>
  )
}
