import { AppDispatch, RootState } from "@/toolkit/Store"
import { customerLogout } from "@/toolkit/slices/CustomerSlice"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

export const Navbar = () => {
  const dispatch: AppDispatch = useDispatch()
  const { isLoggedIn } = useSelector((state: RootState) => state.customerR)
  const handleLogout = () => {
    dispatch(customerLogout())
  }

  return (
    <nav className="flex-center">
      <ul className="nav__lists flex-center">
        <li>
          <Link className="nav__link" to="/">
            Home Page
          </Link>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <Link className="nav__link" to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </>
        )}
        {!isLoggedIn && (
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
