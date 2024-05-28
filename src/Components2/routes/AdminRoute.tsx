import { RootState } from "@/Components2/toolkit/Store"
import React from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { AdminLogin } from "../ExportPages"

export const AdminRoute = () => {
  const { isLoggedIn, isAdmin } = useSelector((state: RootState) => state.adminR)

  return isLoggedIn && isAdmin ? <Outlet /> : <AdminLogin />
}
