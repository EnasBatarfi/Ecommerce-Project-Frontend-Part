import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"
import {
  AdminDashboard,
  Admins,
  Categories,
  Contact,
  CustomerDashboard,
  CustomerLogin,
  CustomerOrders,
  CustomerProfile,
  Customers,
  Error,
  Home,
  Orders,
  Register,
  Products
} from "@/pages/ExportPages"
import { ProductDetails } from "@/pages/ProductDetails"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ProtectedRoute } from "./ProtectedRoute"
import { AdminRoute } from "./AdminRoute"

const Index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/customerLogin" element={<CustomerLogin />} />

          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route path="customer" element={<CustomerDashboard />} />
            <Route path="customer/profile" element={<CustomerProfile />} />
            <Route path="customer/orders" element={<CustomerOrders />} />
          </Route>

          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/categories" element={<Categories />} />
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/customers" element={<Customers />} />
            <Route path="admin/admins" element={<Admins />} />
            <Route path="admin/orders" element={<Orders />} />
          </Route>

          <Route path="*" element={<Error />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}

export default Index
