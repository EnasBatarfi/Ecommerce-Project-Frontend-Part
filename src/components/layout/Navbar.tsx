import React from "react"
import { Link } from "react-router-dom"

export const Navbar = () => {
  return (
    <nav className="flex-center">
      <ul className="nav__lists flex-center">
        <li>
          <Link className="nav__link" to="/">
            Home Page
          </Link>
        </li>
        <li>
          <Link className="nav__link" to="/contact">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  )
}
