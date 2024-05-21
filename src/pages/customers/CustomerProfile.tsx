import { CustomerSidebar } from "@/components/layout/sidebars/CustomerSidebar"
import React from "react"

export const CustomerProfile = () => {
  return (
    <div className="container flex-space-around">
      <CustomerSidebar />
      <div className="main-container">customer info goes here</div>
    </div>
  )
}
