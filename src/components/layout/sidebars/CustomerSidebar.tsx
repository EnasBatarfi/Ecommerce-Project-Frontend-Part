import { RootState } from "@/toolkit/Store"
import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export const CustomerSidebar = () => {
  const { customerData } = useSelector((state: RootState) => state.customerR)

  return (
    <div>
      <aside className="sidebar-container">
        <div>
          <h2>User Profile</h2>
          <p>
            {customerData?.firstName} {customerData?.lastName}
          </p>
          <p>{customerData?.email}</p>
        </div>
        <ul>
          <li>
            <Link to="/dashboard/customer/profile">Profile</Link>
          </li>
          <li>
            <Link to="/dashboard/customer/orders">My Orders</Link>
          </li>
        </ul>
      </aside>
    </div>
  )
}
