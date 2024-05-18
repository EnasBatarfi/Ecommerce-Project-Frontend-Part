import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"
import { Contact, Error, Home } from "@/pages/ExportPages"
import { ProductDetails } from "@/pages/ProductDetails"
import { BrowserRouter, Route, Routes } from "react-router-dom"

const Index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default Index
