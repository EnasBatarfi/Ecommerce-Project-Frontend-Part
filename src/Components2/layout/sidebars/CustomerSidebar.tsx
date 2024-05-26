import { RootState } from "@/Components2/toolkit/Store"
import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styles from "./CustomerSidebar.module.css"

export const CustomerSidebar = () => {
  const { customerData } = useSelector((state: RootState) => state.customerR)

  return (
    <aside className={styles.sidebarContainer}>
      <div className={styles.profileSection}>
        <h2>User Profile</h2>
        <p className={styles.userName}>
          {customerData?.firstName} {customerData?.lastName}
        </p>
        <p className={styles.userEmail}>{customerData?.email}</p>
      </div>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/dashboard/customer/profile" className={styles.navLink}>
            Profile
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/dashboard/customer/orders" className={styles.navLink}>
            My Orders
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/dashboard/customer/addresses" className={styles.navLink}>
            Addresses
          </Link>
        </li>
      </ul>
    </aside>
  )
}
