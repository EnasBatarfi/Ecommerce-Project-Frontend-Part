import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/Components2/toolkit/Store"
import { fetchCategories } from "@/Components2/toolkit/slices/CategorySlice"
import { Link, useNavigate } from "react-router-dom"
import { AdminSidebar } from "../layout/sidebars/AdminSidebar"
import styles from "./CategoriesManagement.module.css"

export const CategoriesManagement = () => {
  const { categories, isLoading, error, totalPages } = useSelector(
    (state: RootState) => state.categoryR
  )
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(5)

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategories({ pageNumber, pageSize }))
    }
    fetchData()
  }, [dispatch, pageNumber, pageSize])

  const handleNextPage = () => {
    setPageNumber((currentPage) => currentPage + 1)
  }
  const handlePreviousPage = () => {
    setPageNumber((currentPage) => currentPage - 1)
  }

  const handleAddCategory = () => {
    navigate("/dashboard/admin/categories/add")
  }

  return (
    <div className={styles.container}>
      <AdminSidebar />
      <div className={styles.mainContainer}>
        <div className={styles.action}>
          <h2 className={styles.title}>Categories Management</h2>
          <button onClick={handleAddCategory} className={styles.addButton}>
            Add Category
          </button>
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {categories && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.categoryId}>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    <Link to={`/dashboard/admin/categories/${category.slug}`}>
                      <button className={styles.btn}>View Details</button>
                    </Link>
                  </td>
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
