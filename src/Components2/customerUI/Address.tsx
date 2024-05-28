import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/Components2/toolkit/Store"
import { useNavigate } from "react-router-dom"
import { CustomerSidebar } from "../layout/sidebars/CustomerSidebar"
import styles from "./Address.module.css"
import { fetchCustomerAddresses } from "../toolkit/slices/AddressSlice"

export const Address = () => {
  const { addresses, isLoading, error, totalPages } = useSelector(
    (state: RootState) => state.addressR
  )
  const { token, customerData } = useSelector((state: RootState) => state.customerR)
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(3)

  useEffect(() => {
    if (token && customerData?.customerId) {
      dispatch(
        fetchCustomerAddresses({ token, pageNumber, pageSize, customerId: customerData.customerId })
      )
    }
  }, [pageNumber, pageSize, dispatch])

  const handleNextPage = () => {
    setPageNumber((currentPage) => currentPage + 1)
  }

  const handlePreviousPage = () => {
    setPageNumber((currentPage) => currentPage - 1)
  }

  const handleAddAddress = () => {
    navigate("/dashboard/customer/addresses/add")
  }

  return (
    <div className={styles.container}>
      <CustomerSidebar />
      <div className={styles.mainContainer}>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <div className={styles.action}>
          <h2 className={styles.title}>My Addresses</h2>
          <button onClick={handleAddAddress} className={styles.addButton}>
            Add Address
          </button>
        </div>
        <section className={styles.addresses}>
          {addresses &&
            addresses.length > 0 &&
            addresses.map((address) => (
              <div key={address.addressId} className={styles.addressCard}>
                <h3 className={styles.addressName}>{address.name}</h3>
                <p className={styles.addressLine}>{address.addressLine1}</p>
                {address.addressLine2 && (
                  <p className={styles.addressLine}>{address.addressLine2}</p>
                )}
                <p className={styles.addressLine}>
                  {address.city}, {address.province}, {address.country}
                </p>
                <p className={styles.addressLine}>{address.zipCode}</p>
              </div>
            ))}
        </section>
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

export default Address
