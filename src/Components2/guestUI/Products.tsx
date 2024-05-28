import React, { useEffect, useState } from "react"
import { SingleProduct } from "./SingleProduct"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/Components2/toolkit/Store"
import { fetchProducts, fetchProductsByCategory } from "@/Components2/toolkit/slices/ProductSlice"
import styles from "./Products.module.css"

interface ProductsProps {
  filter: { category: string; minPrice: number | null; maxPrice: number | null }
}

export const Products: React.FC<ProductsProps> = ({ filter }) => {
  const { products, isLoading, error, totalPages } = useSelector(
    (state: RootState) => state.productR
  )

  const dispatch: AppDispatch = useDispatch()
  const { category, minPrice, maxPrice } = filter

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(6)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")

  useEffect(() => {
    if (category === "all") {
      dispatch(
        fetchProducts({
          pageNumber,
          pageSize,
          searchTerm,
          sortBy,
          minPrice: minPrice ?? 0,
          maxPrice: maxPrice ?? Number.MAX_SAFE_INTEGER
        })
      )
    } else {
      dispatch(
        fetchProductsByCategory({
          categorySlug: category,
          pageNumber,
          pageSize,
          searchTerm,
          sortBy,
          minPrice: minPrice ?? 0,
          maxPrice: maxPrice ?? Number.MAX_SAFE_INTEGER
        })
      )
    }
  }, [dispatch, category, minPrice, maxPrice, pageNumber, pageSize, searchTerm, sortBy])

  const handleNextPage = () => {
    setPageNumber((currentPage) => currentPage + 1)
  }

  const handlePreviousPage = () => {
    setPageNumber((currentPage) => currentPage - 1)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value)
  }

  return (
    <div className={styles.container}>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className={styles.action}>
        <div>
          <input
            type="text"
            placeholder="Search Products"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <h2>List of Products</h2>
        <div>
          <select name="sort" id="sort" onChange={handleSortChange}>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="createdAt">Created At</option>
            <option value="updatedAt">Updated At</option>
          </select>
        </div>
      </div>
      <section className={styles.products}>
        {products &&
          products.length > 0 &&
          products.map((product) => (
            <div key={product.productId} className={styles.productCard}>
              <SingleProduct product={product} />
            </div>
          ))}
      </section>
      <div className={styles.pagination}>
        <button onClick={handlePreviousPage} disabled={pageNumber === 1}>
          Previous
        </button>
        <div className={styles.pageButtons}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setPageNumber(index + 1)}
              disabled={index + 1 === pageNumber}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button onClick={handleNextPage} disabled={pageNumber === totalPages}>
          Next
        </button>
      </div>
    </div>
  )
}
