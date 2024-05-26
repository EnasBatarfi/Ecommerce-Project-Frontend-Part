import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/Components2/toolkit/Store"
import { fetchAllAdmins } from "@/Components2/toolkit/slices/AdminSlice"
import { useNavigate } from "react-router-dom"
import { AdminSidebar } from "../layout/sidebars/AdminSidebar"
import styles from "./AdminsManagement.module.css"

export const AdminsManagement = () => {
  const dispatch: AppDispatch = useDispatch()
  const { admins, isLoading, error } = useSelector((state: RootState) => state.adminR)
  const { token } = useSelector((state: RootState) => state.adminR)
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      dispatch(fetchAllAdmins({ token }))
    }
  }, [token, dispatch])

  const handleAddAdminClick = () => {
    navigate("/dashboard/admin/admins/add")
  }

  return (
    <div className={styles.container}>
      <AdminSidebar />
      <div className={styles.mainContainer}>
        <div className={styles.action}>
          <h2 className={styles.title}>Admin Management</h2>
          <button onClick={handleAddAdminClick} className={styles.addButton}>
            Add New Admin
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
      </div>
    </div>
  )
}
