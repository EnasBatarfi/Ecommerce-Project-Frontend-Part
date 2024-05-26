import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/Components2/toolkit/Store"
import {
  fetchAllCustomers,
  banCustomer,
  unbanCustomer
} from "@/Components2/toolkit/slices/CustomerSlice"
import { toast } from "react-toastify"
import { AdminSidebar } from "../layout/sidebars/AdminSidebar"
import styles from "./CustomersManagement.module.css"

export const CustomersManagement = () => {
  const dispatch: AppDispatch = useDispatch()
  const { customers, isLoading, error, totalPages } = useSelector(
    (state: RootState) => state.customerR
  )
  const { token } = useSelector((state: RootState) => state.adminR)
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(5)

  useEffect(() => {
    if (token) {
      dispatch(fetchAllCustomers({ pageNumber, pageSize, token }))
    }
  }, [pageNumber, token, dispatch, pageSize])

  const handleBan = async (customerId: string) => {
    if (!token) {
      toast.error("No token found")
      return
    }
    try {
      await dispatch(banCustomer({ customerId, token }))
      toast.success("Customer banned successfully")
    } catch (error: any) {
      toast.error("Failed to ban customer")
    }
  }

  const handleUnban = async (customerId: string) => {
    if (!token) {
      toast.error("No token found")
      return
    }
    try {
      await dispatch(unbanCustomer({ customerId, token }))
      toast.success("Customer unbanned successfully")
    } catch (error: any) {
      toast.error("Failed to unban customer")
    }
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
          <h2 className={styles.title}>Customer Management</h2>
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {customers && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.customerId}>
                  <td>
                    {customer.firstName} {customer.lastName}
                  </td>
                  <td>{customer.email}</td>
                  <td>{customer.isBanned ? "Banned" : "Active"}</td>
                  <td>
                    {!customer.isBanned ? (
                      <button
                        className={styles.banButton}
                        onClick={() => customer.customerId && handleBan(customer.customerId)}
                      >
                        Ban
                      </button>
                    ) : (
                      <button
                        className={styles.unbanButton}
                        onClick={() => customer.customerId && handleUnban(customer.customerId)}
                      >
                        Unban
                      </button>
                    )}
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
