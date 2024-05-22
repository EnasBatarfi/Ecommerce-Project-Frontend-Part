import { UploadImage } from "@/components/UploadImage"
import { AppDispatch } from "@/toolkit/Store"
import { customerRegister } from "@/toolkit/slices/CustomerSlice"
import { RegisterFormData } from "@/types/Types"
import React, { ChangeEvent, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const Register: React.FC = () => {
  const navigate = useNavigate()
  const [imagePreview, setImagePreview] = useState<string | null>("")
  const dispatch: AppDispatch = useDispatch()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<RegisterFormData>()

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      const response = await dispatch(customerRegister(data))
      toast.success(response.payload.message)
      navigate("/customerLogin")
    } catch (error: any) {
      toast.error(error.message || "Registration failed")
    }
  }
  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        const url = await UploadImage(file)
        setImagePreview(url)
        setValue("image", url)
      } catch (error) {
        toast.error("Image upload failed")
      }
    }
  }

  return (
    <div className="register">
      <h2>Customer Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="image-preview">
          {imagePreview && <img src={imagePreview} alt="Preview" />}
        </div>
        <div className="form-field">
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            {...register("firstName", {
              required: "First name is required",
              minLength: { value: 2, message: "First name must be at least 2 characters" },
              maxLength: { value: 100, message: "First name must not exceed 100 characters" }
            })}
          />
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>
        <div className="form-field">
          <label htmlFor="lastName">Last Name: </label>
          <input
            type="text"
            {...register("lastName", {
              required: "Last name is required",
              minLength: { value: 2, message: "Last name must be at least 2 characters" },
              maxLength: { value: 100, message: "Last name must not exceed 100 characters" }
            })}
          />
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>
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
          <label htmlFor="mobile">Mobile: </label>
          <input
            type="tel"
            {...register("mobile", {
              required: "Mobile number is required",
              pattern: { value: /^\d{10}$/, message: "Mobile number is not valid" }
            })}
          />
          {errors.mobile && <p>{errors.mobile.message}</p>}
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
        <div className="form-field">
          <label htmlFor="image">Profile Image:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {errors.image && <p>{errors.image.message}</p>}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
