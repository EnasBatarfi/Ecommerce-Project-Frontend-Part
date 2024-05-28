import { RootState } from "@/Components2/toolkit/Store"
import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styles from "./AdminSidebar.module.css"

export const AdminSidebar = () => {
  const { adminData } = useSelector((state: RootState) => state.adminR)
  return (
    <aside className={styles.sidebarContainer}>
      <div className={styles.profileSection}>
        <h2>Admin Dashboard</h2>
        <p className={styles.userName}>
          {adminData?.firstName} {adminData?.lastName}
        </p>
        <p className={styles.userEmail}>{adminData?.email}</p>
      </div>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/dashboard/admin/profile" className={styles.navLink}>
            Profile
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/dashboard/admin/categories" className={styles.navLink}>
            Categories
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/dashboard/admin/products" className={styles.navLink}>
            Products
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/dashboard/admin/customers" className={styles.navLink}>
            Customers
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/dashboard/admin/admins" className={styles.navLink}>
            Admins
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/dashboard/admin/orders" className={styles.navLink}>
            Orders
          </Link>
        </li>
      </ul>
    </aside>
  )
}
