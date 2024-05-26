import { Footer } from "@/Components2/layout/Footer"
import { Navbar } from "@/Components2/layout/Navbar"
import {
  AdminDashboard,
  AdminsManagement,
  Contact,
  CustomerDashboard,
  CustomerLogin,
  CustomerProfile,
  CustomersManagement,
  Error,
  Home,
  OrdersManagement,
  Register,
  ProductsManagement,
  AdminLogin,
  CategoriesManagement
} from "@/Components2/ExportPages"
import { ProductDetails } from "@/Components2/guestUI/ProductDetails"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ProtectedRoute } from "./ProtectedRoute"
import { AdminRoute } from "./AdminRoute"
import { CategoryDetails } from "@/Components2/adminUI/CategoryDetails"
import { AddCategory } from "@/Components2/adminUI/AddCategory"
import { AddProduct } from "@/Components2/adminUI/AddProduct"
import ProductDetailsAdmin from "@/Components2/adminUI/ProductDetails"
import { AdminProfile } from "@/Components2/adminUI/AdminProfile"
import Address from "@/Components2/customerUI/Address"
import AddAddress from "@/Components2/customerUI/AddAddress"
import { AddAdmin } from "@/Components2/adminUI/AddAdmin"
import { Cart } from "../customerUI/Cart"

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
            <Route path="customer/addresses" element={<Address />} />
            <Route path="customer/addresses/add" element={<AddAddress />} />{" "}
            <Route path="customer/cart" element={<Cart />} />
          </Route>

          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/categories" element={<CategoriesManagement />} />
            <Route path="admin/categories/:slug" element={<CategoryDetails />} />
            <Route path="admin/categories/add" element={<AddCategory />} />
            <Route path="admin/profile" element={<AdminProfile />} />
            <Route path="admin/products" element={<ProductsManagement />} />
            <Route path="admin/products/add" element={<AddProduct />} />
            <Route path="admin/products/:slug" element={<ProductDetailsAdmin />} />
            <Route path="admin/customers" element={<CustomersManagement />} />
            <Route path="admin/admins" element={<AdminsManagement />} />
            <Route path="admin/admins/add" element={<AddAdmin />} />
            <Route path="admin/orders" element={<OrdersManagement />} />
          </Route>

          <Route path="*" element={<Error />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}

export default Index
