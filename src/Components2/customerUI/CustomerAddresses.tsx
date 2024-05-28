import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { AppDispatch, RootState } from "@/Components2/toolkit/Store"
import { fetchCustomerData } from "../toolkit/slices/CustomerSlice"
import { CustomerSidebar } from "../layout/sidebars/CustomerSidebar"
import styles from "./CustomerAddresses.module.css"

export const CustomerAddresses = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const { customerData, token, isLoading, error } = useSelector(
    (state: RootState) => state.customerR
  )
  const [pageNumber, setPageNumber] = useState(1)
  const pageSize = 5

  useEffect(() => {
    if (token && customerData?.customerId) {
      dispatch(fetchCustomerData({ customerId: customerData.customerId, token }))
    }
  }, [dispatch, token, customerData?.customerId])

  if (!customerData) {
    return <p>No customer data found.</p>
  }

  const { addresses } = customerData
  const totalAddresses = addresses.length
  const totalPages = Math.ceil(totalAddresses / pageSize)

  const handleNextPage = () => {
    setPageNumber((currentPage) => Math.min(currentPage + 1, totalPages))
  }

  const handlePreviousPage = () => {
    setPageNumber((currentPage) => Math.max(currentPage - 1, 1))
  }

  const handleAddAddress = () => {
    navigate("/dashboard/customer/addresses/add")
  }

  const paginatedAddresses = addresses.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)

  return (
    <div className={styles.container}>
      <CustomerSidebar />
      <div className={styles.mainContainer}>
        <div className={styles.action}>
          <h2 className={styles.title}>Customer Addresses</h2>
          <button onClick={handleAddAddress} className={styles.addButton}>
            Add Address
          </button>
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {addresses && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAddresses.map((address) => (
                <tr key={address.addressId}>
                  <td>{address.name}</td>
                  <td>
                    {address.addressLine1}, {address.city}, {address.province}, {address.country},{" "}
                    {address.zipCode}
                  </td>
                  <td>
                    <Link to={`/dashboard/customer/addresses/${address.addressId}`}>
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
