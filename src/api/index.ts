import axios from "axios"

const isDevelopment = import.meta.env.MODE === "development"
let baseURL = "https://ecommerce-project-backend-part.onrender.com/api/"

if (!isDevelopment) {
  // Update this later when you have a working backend server
  baseURL = "https://ecommerce-project-backend-part.onrender.com/api/"
}

const api = axios.create({
  baseURL
})

// use this to handle errors gracefully
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 500) {
//       throw new Error(error.response.data)
//     }
//   }
// )

export default api
