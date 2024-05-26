import { UploadImage } from "@/Components2/helpers/UploadImage"
import { AppDispatch } from "@/Components2/toolkit/Store"
import { customerRegister } from "@/Components2/toolkit/slices/CustomerSlice"
import { RegisterFormData } from "@/Components2/types/Types"
import React, { ChangeEvent, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import styles from "./Register.module.css"

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
    <div className={styles.register}>
      <h2>Customer Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.imagePreview}>
          {imagePreview && <img src={imagePreview} alt="Preview" />}
        </div>
        <div className={styles.formField}>
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            {...register("firstName", {
              required: "First name is required",
              minLength: { value: 2, message: "First name must be at least 2 characters" },
              maxLength: { value: 100, message: "First name must not exceed 100 characters" }
            })}
          />
          {errors.firstName && <p className={styles.error}>{errors.firstName.message}</p>}
        </div>
        <div className={styles.formField}>
          <label htmlFor="lastName">Last Name: </label>
          <input
            type="text"
            {...register("lastName", {
              required: "Last name is required",
              minLength: { value: 2, message: "Last name must be at least 2 characters" },
              maxLength: { value: 100, message: "Last name must not exceed 100 characters" }
            })}
          />
          {errors.lastName && <p className={styles.error}>{errors.lastName.message}</p>}
        </div>
        <div className={styles.formField}>
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
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </div>
        <div className={styles.formField}>
          <label htmlFor="mobile">Mobile: </label>
          <input
            type="tel"
            {...register("mobile", {
              required: "Mobile number is required",
              pattern: { value: /^\d{10}$/, message: "Mobile number is not valid" }
            })}
          />
          {errors.mobile && <p className={styles.error}>{errors.mobile.message}</p>}
        </div>
        <div className={styles.formField}>
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
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        </div>
        <div className={styles.formField}>
          <label htmlFor="image">Profile Image:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {errors.image && <p className={styles.error}>{errors.image.message}</p>}
        </div>
        <button type="submit" className={styles.submitButton}>
          Register
        </button>
      </form>
    </div>
  )
}
