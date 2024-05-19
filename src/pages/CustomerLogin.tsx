import { AppDispatch } from "@/toolkit/Store"
import { customerLogin } from "@/toolkit/slices/CustomerSlice"
import { fetchProductBySlug } from "@/toolkit/slices/ProductSlice"
import { LoginFormData } from "@/types/Types"
import React, { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const CustomerLogin = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>()

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const response = await dispatch(customerLogin(data))
      toast.success(response.payload.message)
      //    navigate("/login")
    } catch (error: any) {
      toast.error(error.message || "Login failed")
    }
  }

  return (
    <div className="login">
      <h2>Customer Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-field">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              minLength: { value: 6, message: "Email must be at least 6 characters" },
              maxLength: { value: 100, message: "Email must not exceed 100 characters" },
              pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "Email is not valid" }
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="form-field">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Password must be at least 8 characters" },
              maxLength: { value: 100, message: "Password must not exceed 100 characters" },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                message:
                  "Password must contain at least one uppercase letter, one number, and one special character"
              }
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
