import { CustomerLogin } from "@/pages/ExportPages"
import { RootState } from "@/toolkit/Store"
import React from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

export const AdminRoute = () => {
  const { isLoggedIn, customerData } = useSelector((state: RootState) => state.customerR)

  return isLoggedIn && customerData?.isAdmin ? <Outlet /> : <p>Unauthorized</p>
}
