import { CustomerLogin } from "@/Components2/ExportPages"
import { RootState } from "@/Components2/toolkit/Store"
import React from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

export const ProtectedRoute = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.customerR)

  return isLoggedIn ? <Outlet /> : <CustomerLogin />
}
