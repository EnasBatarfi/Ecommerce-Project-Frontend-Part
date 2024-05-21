import { RootState } from "@/toolkit/Store"
import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export const AdminSidebar = () => {
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
            <Link to="/dashboard/admin/profile">Profile</Link>
          </li>
          <li>
            <Link to="/dashboard/admin/categories">categories</Link>
          </li>
          <li>
            <Link to="/dashboard/admin/products">products</Link>
          </li>
          <li>
            <Link to="/dashboard/admin/customers">customers</Link>
          </li>
          <li>
            <Link to="/dashboard/admin/admins">admins</Link>
          </li>
          <li>
            <Link to="/dashboard/admin/orders">orders</Link>
          </li>
        </ul>
      </aside>
    </div>
  )
}
