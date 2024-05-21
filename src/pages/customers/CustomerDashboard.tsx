import { CustomerSidebar } from "@/components/layout/sidebars/CustomerSidebar"
import { RootState } from "@/toolkit/Store"
import { useSelector } from "react-redux"

export const CustomerDashboard = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.customerR)
  return (
    <div className="container flex-space-around">
      <CustomerSidebar />
      <div className="main-container">main content goes here</div>
    </div>
  )
}
