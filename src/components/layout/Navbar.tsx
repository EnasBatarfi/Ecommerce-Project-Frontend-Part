import { AppDispatch, RootState } from "@/toolkit/Store"
import { adminLogout } from "@/toolkit/slices/AdminSlice"
import { customerLogout } from "@/toolkit/slices/CustomerSlice"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

export const Navbar = () => {
  const dispatch: AppDispatch = useDispatch()
  const { isLoggedIn: isLoggedInCustomer } = useSelector((state: RootState) => state.customerR)
  const { isLoggedIn: isLoggedInAdmin } = useSelector((state: RootState) => state.adminR)

  const handleLogout = () => {
    dispatch(customerLogout())
    dispatch(adminLogout())
  }

  return (
    <nav className="flex-center">
      <ul className="nav__lists flex-center">
        <li>
          <Link className="nav__link" to="/">
            Home Page
          </Link>
        </li>
        {(isLoggedInCustomer || isLoggedInAdmin) && (
          <>
            <li>
              <Link className="nav__link" to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
            {isLoggedInCustomer && (
              <li>
                <Link className="nav__link" to="/dashboard/customer">
                  customer dashboard
                </Link>
              </li>
            )}

            {isLoggedInAdmin && (
              <li>
                <Link className="nav__link" to="/dashboard/admin">
                  admin dashboard
                </Link>
              </li>
            )}
          </>
        )}
        {!isLoggedInCustomer && !isLoggedInAdmin && (
          <>
            <li>
              <Link className="nav__link" to="/register">
                Register
              </Link>
            </li>
            <li>
              <Link className="nav__link" to="/customerLogin">
                Login
              </Link>
            </li>
            <li>
              <Link className="nav__link" to="/adminLogin">
                Admin Login
              </Link>
            </li>
          </>
        )}
        <li>
          <Link className="nav__link" to="/contact">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  )
}
