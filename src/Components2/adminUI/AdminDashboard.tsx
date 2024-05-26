import React from "react"
import { AdminSidebar } from "../layout/sidebars/AdminSidebar"
import styles from "./AdminDashboard.module.css"

export const AdminDashboard = () => {
  return (
    <div className={styles.container}>
      <AdminSidebar />
      <div className={styles.mainContainer}>Main content goes here</div>
    </div>
  )
}
