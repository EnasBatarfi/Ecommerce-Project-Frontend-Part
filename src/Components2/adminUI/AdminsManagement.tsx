import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/Components2/toolkit/Store"
import { fetchAllAdmins } from "@/Components2/toolkit/slices/AdminSlice"
import { useNavigate } from "react-router-dom"
import { AdminSidebar } from "../layout/sidebars/AdminSidebar"
import styles from "./AdminsManagement.module.css"

export const AdminsManagement = () => {
  const dispatch: AppDispatch = useDispatch()
  const { admins, isLoading, error, totalPages } = useSelector((state: RootState) => state.adminR)
  const { token } = useSelector((state: RootState) => state.adminR)
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(5)
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      dispatch(fetchAllAdmins({ pageNumber, pageSize, token }))
    }
  }, [pageNumber, token, dispatch, pageSize])

  const handleAddAdminClick = () => {
    navigate("/dashboard/admin/admins/add")
  }

  const handleNextPage = () => {
    setPageNumber((currentPage) => currentPage + 1)
  }

  const handlePreviousPage = () => {
    setPageNumber((currentPage) => currentPage - 1)
  }

  return (
    <div className={styles.container}>
      <AdminSidebar />
      <div className={styles.mainContainer}>
        <div className={styles.action}>
          <h2 className={styles.title}>Admin Management</h2>
          <button onClick={handleAddAdminClick} className={styles.addButton}>
            Add Admin
          </button>
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {admins && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.adminId}>
                  <td>
                    {admin.firstName} {admin.lastName}
                  </td>
                  <td>{admin.email}</td>
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
