import { AdminLogin } from "@/pages/AdminLogin"
import { Login } from "@/pages/Login"
import { RootState } from "@/toolkit/Store"
import React from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

export const AdminRoute = () => {
  const { isLoggedIn, isAdmin } = useSelector((state: RootState) => state.adminR)
  console.log(isLoggedIn)
  console.log(isAdmin)

  return isLoggedIn && isAdmin ? <Outlet /> : <AdminLogin />
}
