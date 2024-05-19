import "./App.css"
import Index from "./routes/Index"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <div>
      <ToastContainer />
      <Index />
    </div>
  )
}

export default App
