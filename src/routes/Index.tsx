import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"
import {
  AdminDashboard,
  Admins,
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
  Products,
  AdminLogin,
  Categories
} from "@/pages/ExportPages"
import { ProductDetails } from "@/pages/ProductDetails"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ProtectedRoute } from "./ProtectedRoute"
import { AdminRoute } from "./AdminRoute"
import { CategoryDetails } from "@/pages/CategoryDetails"
import { AddCategory } from "@/pages/AddCategory"
import { AddProductPage } from "@/pages/admins/AddProduct"
import ProductDetailsAdmin from "@/pages/admins/ProductDetails"
import { Cart } from "@/pages/customers/Cart"
import { AdminProfile } from "@/pages/admins/AdminProfile"

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
          <Route path="/adminLogin" element={<AdminLogin />} />

          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route path="customer" element={<CustomerDashboard />} />
            <Route path="customer/profile" element={<CustomerProfile />} />
            <Route path="customer/cart" element={<Cart />} />
            <Route path="customer/orders" element={<CustomerOrders />} />
          </Route>

          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/categories" element={<Categories />} />
            <Route path="admin/categories/:slug" element={<CategoryDetails />} />
            <Route path="admin/categories/add" element={<AddCategory />} />
            <Route path="admin/profile" element={<AdminProfile />} />
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/products/add" element={<AddProductPage />} />
            <Route path="admin/products/:slug" element={<ProductDetailsAdmin />} />
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
