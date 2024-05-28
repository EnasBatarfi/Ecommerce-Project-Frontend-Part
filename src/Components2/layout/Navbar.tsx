import { AppDispatch, RootState } from "@/Components2/toolkit/Store"
import { adminLogout } from "@/Components2/toolkit/slices/AdminSlice"
import { customerLogout } from "@/Components2/toolkit/slices/CustomerSlice"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styles from "./Navbar.module.css"

export const Navbar = () => {
  const dispatch: AppDispatch = useDispatch()
  const { isLoggedIn: isLoggedInCustomer } = useSelector((state: RootState) => state.customerR)
  const { isLoggedIn: isLoggedInAdmin } = useSelector((state: RootState) => state.adminR)

  const handleLogout = () => {
    dispatch(customerLogout())
    dispatch(adminLogout())
  }

  return (
    <nav className={styles.nav}>
      <ul className={styles.navLists}>
        <li>
          <Link className={styles.navLink} to="/">
            Home
          </Link>
        </li>
        {isLoggedInCustomer && (
          <>
            <li>
              <Link className={styles.navLink} to="/dashboard/customer">
                Dashboard
              </Link>
            </li>
            <li>
              <Link className={styles.navLink} to="/dashboard/customer/cart">
                Cart
              </Link>
            </li>
          </>
        )}
        {isLoggedInAdmin && (
          <>
            <li>
              <Link className={styles.navLink} to="/dashboard/admin">
                Admin Dashboard
              </Link>
            </li>
            <li>
              <Link className={styles.navLink} to="/dashboard/admin/products">
                Manage Products
              </Link>
            </li>
            <li>
              <Link className={styles.navLink} to="/dashboard/admin/categories">
                Manage Categories
              </Link>
            </li>
          </>
        )}
        {(isLoggedInCustomer || isLoggedInAdmin) && (
          <li>
            <button className={styles.navButton} onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
        {!isLoggedInCustomer && !isLoggedInAdmin && (
          <>
            <li>
              <Link className={styles.navLink} to="/register">
                Register
              </Link>
            </li>
            <li className={styles.dropdown}>
              <Link className={styles.navLink} to="/customerLogin">
                Login
              </Link>
              <div className={styles.dropdownContent}>
                <Link className={styles.dropdownLink} to="/adminLogin">
                  Admin Login
                </Link>
              </div>
            </li>
          </>
        )}
        <li>
          <Link className={styles.navLink} to="/contact">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  )
}
