import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/Components2/toolkit/Store"
import { fetchOrders, updateOrder } from "@/Components2/toolkit/slices/OrderSlice"
import { toast } from "react-toastify"
import { AdminSidebar } from "../layout/sidebars/AdminSidebar"
import styles from "./OrdersManagement.module.css"
import { Order } from "@/Components2/types/Types"

export const OrdersManagement = () => {
  const { orders, isLoading, error, totalPages } = useSelector((state: RootState) => state.orderR)
  const { token } = useSelector((state: RootState) => state.adminR)
  const dispatch: AppDispatch = useDispatch()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(5)
  const [editedPrices, setEditedPrices] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    if (token) {
      dispatch(fetchOrders({ token, pageNumber, pageSize }))
    }
  }, [dispatch, token, pageNumber, pageSize])

  const handleUpdateOrder = async (orderId: string, updateOrderInfo: any) => {
    try {
      if (token && orderId) {
        const response = await dispatch(updateOrder({ orderId, token, updateOrderInfo }))
        if (response.meta.requestStatus === "fulfilled") {
          toast.success("Order updated successfully!")
        } else {
          throw new Error("Failed to update order")
        }
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const confirmAndUpdateOrder = async (orderId: string, updateOrderInfo: any) => {
    const confirmationMessage = updateOrderInfo.status
      ? `Are you sure you want to change the status to "${updateOrderInfo.status}"?`
      : `Are you sure you want to change the price to "${updateOrderInfo.totalPrice}"?`

    if (window.confirm(confirmationMessage)) {
      await handleUpdateOrder(orderId, updateOrderInfo)
    }
  }

  const handlePriceChange = (orderId: string, newPrice: number) => {
    setEditedPrices((prevPrices) => ({
      ...prevPrices,
      [orderId]: newPrice
    }))
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
          <h2 className={styles.title}>Manage Orders</h2>
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {orders && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Status</th>
                <th>Price</th>
                <th>Update Status</th>
                <th>Update Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: Order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.status}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    <select
                      className={styles.select}
                      value={order.status}
                      onChange={(e) =>
                        confirmAndUpdateOrder(order.orderId!, { status: e.target.value })
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <input
                      className={styles.inputNumber}
                      type="number"
                      value={editedPrices[order.orderId!] ?? order.totalPrice}
                      onChange={(e) =>
                        handlePriceChange(order.orderId!, parseFloat(e.target.value))
                      }
                    />
                    <button
                      className={styles.updateButton}
                      onClick={() =>
                        confirmAndUpdateOrder(order.orderId!, {
                          totalPrice: editedPrices[order.orderId!] ?? order.totalPrice
                        })
                      }
                    >
                      Update Price
                    </button>
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
