import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/Components2/toolkit/Store"
import { fetchProducts } from "@/Components2/toolkit/slices/ProductSlice"
import { useNavigate } from "react-router-dom"
import { AdminSidebar } from "../layout/sidebars/AdminSidebar"
import styles from "./ProductsManagement.module.css"

export const ProductsManagement = () => {
  const { products, isLoading, error, totalPages } = useSelector(
    (state: RootState) => state.productR
  )
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(5)

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts({ pageNumber, pageSize, searchTerm: "", sortBy: "name" }))
    }
    fetchData()
  }, [dispatch, pageNumber, pageSize])

  const handleNextPage = () => {
    setPageNumber((currentPage) => currentPage + 1)
  }

  const handlePreviousPage = () => {
    setPageNumber((currentPage) => currentPage - 1)
  }

  const handleAddProduct = () => {
    navigate("/dashboard/admin/products/add")
  }

  return (
    <div className={styles.container}>
      <AdminSidebar />
      <div className={styles.mainContainer}>
        <div className={styles.action}>
          <h2 className={styles.title}>Products Management</h2>
          <button onClick={handleAddProduct} className={styles.addButton}>
            Add Product
          </button>
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {products && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.productId}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>${product.price}</td>
                  <td>{product.categoryId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className={styles.pagination}>
          <button
            onClick={handlePreviousPage}
            disabled={pageNumber === 1}
            className={styles.pageButton}
          >
            Previous
          </button>
          <div className={styles.pageButtons}>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setPageNumber(index + 1)}
                disabled={index + 1 === pageNumber}
                className={styles.pageButton}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            onClick={handleNextPage}
            disabled={pageNumber === totalPages}
            className={styles.pageButton}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
