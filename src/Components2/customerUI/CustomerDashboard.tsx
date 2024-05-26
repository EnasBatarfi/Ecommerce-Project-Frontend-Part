import { RootState } from "@/Components2/toolkit/Store"
import React from "react"
import { useSelector } from "react-redux"
import { CustomerSidebar } from "../layout/sidebars/CustomerSidebar"
import styles from "./CustomerDashboard.module.css"

export const CustomerDashboard = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.customerR)
  return (
    <div className={styles.container}>
      <CustomerSidebar />
      <div className={styles.mainContainer}>
        <h2>Customer Dashboard</h2>
        <p>Main content goes here</p>
      </div>
    </div>
  )
}
