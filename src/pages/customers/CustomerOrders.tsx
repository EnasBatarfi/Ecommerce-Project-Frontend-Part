import { CustomerSidebar } from "@/components/layout/sidebars/CustomerSidebar"
import React from "react"

export const CustomerOrders = () => {
  return (
    <div className="container flex-space-around">
      <CustomerSidebar />
      <div className="main-container">all the customer orders goes here</div>
    </div>
  )
}
