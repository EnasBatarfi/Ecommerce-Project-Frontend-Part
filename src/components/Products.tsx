import React, { useEffect, useState } from "react"
import { SingleProduct } from "./SingleProduct"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/toolkit/Store"
import { fetchProducts } from "@/toolkit/slices/ProductSlice"

export const Products = () => {
  const { products, isLoading, error, totalPages } = useSelector(
    (state: RootState) => state.productR
  )
  const dispatch: AppDispatch = useDispatch()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(3)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("Name")

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts({ pageNumber, pageSize, searchTerm, sortBy }))
    }
    fetchData()
  }, [pageNumber, searchTerm, sortBy])

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
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="action flex-space-around">
        <div>
          <input
            type="text"
            placeholder="Search Products"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <h2>List of Products</h2>
        <div className="flex-center">
          <select name="" id="" onChange={handleSortChange}>
            <option value="Name">Name</option>
            <option value="Price">Price</option>
            <option value="CreatedAt">Created At</option>
            <option value="UpdatedAt">Updated At</option>
            {/* <option value="StockQuantity">Stock Quantity</option>
          <option value="SKU">SKU</option> */}
            {/* <option value="CategoryId">Category</option> */}
          </select>
        </div>
      </div>
      <section className="products">
        {products &&
          products.length > 0 &&
          products.map((product) => <SingleProduct key={product.productId} product={product} />)}
      </section>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={pageNumber === 1}>
          Previous
        </button>
        <button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => setPageNumber(index + 1)}>
              {index + 1}
            </button>
          ))}
        </button>
        <button onClick={handleNextPage} disabled={pageNumber === totalPages}>
          Next
        </button>
      </div>
    </div>
  )
}
