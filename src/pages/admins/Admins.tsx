import { AdminSidebar } from "@/components/layout/sidebars/AdminSidebar"
import React from "react"

export const Admins = () => {
  return (
    <div className="container flex-space-around">
      <AdminSidebar />
      <div className="main-container">admins management goes here</div>
    </div>
  )
}
