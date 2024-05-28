import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/Components2/toolkit/Store"
import styles from "./CustomerOrders.module.css"
import { Order } from "../types/Types"
import { CustomerSidebar } from "../layout/sidebars/CustomerSidebar"

export const CustomerOrders = () => {
  const dispatch: AppDispatch = useDispatch()
  const { customerData, token, isLoading, error } = useSelector(
    (state: RootState) => state.customerR
  )
  const [pageNumber, setPageNumber] = useState(1)
  const pageSize = 5

  if (!customerData) {
    return <p>No customer data found.</p>
  }

  const { orders } = customerData
  const totalOrders = orders.length
  const totalPages = Math.ceil(totalOrders / pageSize)

  const handleNextPage = () => {
    setPageNumber((currentPage) => Math.min(currentPage + 1, totalPages))
  }

  const handlePreviousPage = () => {
    setPageNumber((currentPage) => Math.max(currentPage - 1, 1))
  }

  const paginatedOrders = orders.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)

  return (
    <div className={styles.container}>
      <CustomerSidebar />
      <div className={styles.mainContainer}>
        <h2 className={styles.title}>Customer Orders</h2>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {orders && orders.length > 0 ? (
          <>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Status</th>
                  <th>Total Price</th>
                  <th>Order Date</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order: Order) => (
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{order.status}</td>
                    <td>${order.totalPrice.toFixed(2)}</td>
                    <td>
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.pagination}>
              <button
                className={styles.pageButton}
                onClick={handlePreviousPage}
                disabled={pageNumber === 1}
              >
                Previous
              </button>
              <div className={styles.pageButtons}>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    className={styles.pageButton}
                    onClick={() => setPageNumber(index + 1)}
                    disabled={index + 1 === pageNumber}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <button
                className={styles.pageButton}
                onClick={handleNextPage}
                disabled={pageNumber === totalPages}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  )
}
