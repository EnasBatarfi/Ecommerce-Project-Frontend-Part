import { AdminSidebar } from "@/components/layout/sidebars/AdminSidebar"
import React from "react"

export const Customers = () => {
  return (
    <div className="container flex-space-around">
      <AdminSidebar />
      <div className="main-container">customers management goes here</div>
    </div>
  )
}
