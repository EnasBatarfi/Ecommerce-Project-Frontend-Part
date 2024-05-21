import { AdminSidebar } from "@/components/layout/sidebars/AdminSidebar"
import React from "react"

export const AdminDashboard = () => {
  return (
    <div className="container flex-space-around">
      <AdminSidebar />
      <div className="main-container">main content goes here</div>
    </div>
  )
}
