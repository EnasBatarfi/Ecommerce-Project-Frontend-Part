import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/toolkit/Store"
import { fetchAllCustomers, banCustomer, unbanCustomer } from "@/toolkit/slices/CustomerSlice"
import { toast } from "react-toastify"

export const Customers = () => {
  const dispatch: AppDispatch = useDispatch()
  const { customers, isLoading, error, totalPages } = useSelector(
    (state: RootState) => state.customerR
  )
  const { token } = useSelector((state: RootState) => state.adminR)
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  useEffect(() => {
    console.log("enas")
    if (token) {
      const response = dispatch(fetchAllCustomers({ pageNumber, pageSize, token }))
      console.log(response)
    }
  }, [pageNumber])

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
    <div className="customer-management-page">
      <h2>Customer Management</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {customers && (
        <table>
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
                    <button onClick={() => customer.customerId && handleBan(customer.customerId)}>
                      Ban
                    </button>
                  ) : (
                    <button onClick={() => customer.customerId && handleUnban(customer.customerId)}>
                      Unban
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={pageNumber === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => setPageNumber(index + 1)}>
            {index + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={pageNumber === totalPages}>
          Next
        </button>
      </div>
    </div>
  )
}
//styled code
// import React, { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { AppDispatch, RootState } from "@/toolkit/Store"
// import { fetchAllCustomers, banCustomer, unbanCustomer } from "@/toolkit/slices/CustomerSlice"
// import { toast } from "react-toastify"
// import styles from './Customers.module.css'

// export const Customers = () => {
//   const dispatch: AppDispatch = useDispatch()
//   const { customers, isLoading, error, totalPages } = useSelector(
//     (state: RootState) => state.customerR
//   )
//   const { token } = useSelector((state: RootState) => state.adminR)
//   const [pageNumber, setPageNumber] = useState(1)
//   const [pageSize, setPageSize] = useState(5)

//   useEffect(() => {
//     if (token) {
//       dispatch(fetchAllCustomers({ pageNumber, pageSize, token }))
//     }
//   }, [pageNumber])

//   const handleBan = async (customerId: string) => {
//     if (!token) {
//       toast.error("No token found")
//       return
//     }
//     try {
//       await dispatch(banCustomer({ customerId, token }))
//       toast.success("Customer banned successfully")
//     } catch (error: any) {
//       toast.error("Failed to ban customer")
//     }
//   }

//   const handleUnban = async (customerId: string) => {
//     if (!token) {
//       toast.error("No token found")
//       return
//     }
//     try {
//       await dispatch(unbanCustomer({ customerId, token }))
//       toast.success("Customer unbanned successfully")
//     } catch (error: any) {
//       toast.error("Failed to unban customer")
//     }
//   }
//   const handleNextPage = () => {
//     setPageNumber((currentPage) => currentPage + 1)
//   }
//   const handlePreviousPage = () => {
//     setPageNumber((currentPage) => currentPage - 1)
//   }
//   return (
//     <div className={styles.customerManagementPage}>
//       <h2 className={styles.heading}>Customer Management</h2>
//       {isLoading && <p>Loading...</p>}
//       {error && <p className={styles.errorMessage}>Error: {error}</p>}
//       {customers && (
//         <table className={styles.customerTable}>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {customers.map((customer) => (
//               <tr key={customer.customerId}>
//                 <td>
//                   {customer.firstName} {customer.lastName}
//                 </td>
//                 <td>{customer.email}</td>
//                 <td>{customer.isBanned ? "Banned" : "Active"}</td>
//                 <td>
//                   {!customer.isBanned ? (
//                     <button className={styles.banButton} onClick={() => customer.customerId && handleBan(customer.customerId)}>
//                       Ban
//                     </button>
//                   ) : (
//                     <button className={styles.unbanButton} onClick={() => customer.customerId && handleUnban(customer.customerId)}>
//                       Unban
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//       <div className={styles.pagination}>
//         <button className={styles.paginationButton} onClick={handlePreviousPage} disabled={pageNumber === 1}>
//           Previous
//         </button>
//         {Array.from({ length: totalPages }, (_, index) => (
//           <button key={index} className={styles.paginationButton} onClick={() => setPageNumber(index + 1)}>
//             {index + 1}
//           </button>
//         ))}
//         <button className={styles.paginationButton} onClick={handleNextPage} disabled={pageNumber === totalPages}>
//           Next
//         </button>
//       </div>
//     </div>
//   )
// }
