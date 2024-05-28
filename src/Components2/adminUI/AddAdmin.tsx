import React, { ChangeEvent, useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/Components2/toolkit/Store"
import { addNewAdmin } from "@/Components2/toolkit/slices/AdminSlice"
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "react-toastify"
import { Admin } from "@/Components2/types/Types"
import { useNavigate } from "react-router-dom"
import { UploadImage } from "@/Components2/helpers/UploadImage"
import styles from "./AddAdmin.module.css"

export const AddAdmin: React.FC = () => {
  const navigate = useNavigate()
  const [imagePreview, setImagePreview] = useState<string | null>("")
  const dispatch: AppDispatch = useDispatch()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<Admin>()

  const onSubmit: SubmitHandler<Admin> = async (data) => {
    try {
      const adminLoginData = localStorage.getItem("adminLoginData")
      const token = adminLoginData ? JSON.parse(adminLoginData).token : null
      const adminId = adminLoginData ? JSON.parse(adminLoginData).adminData.userId : null

      if (!token) {
        throw new Error("Authentication token not found")
      }

      const newAdminInfo = { ...data, adminId }

      const response = await dispatch(addNewAdmin({ token, newAdmin: newAdminInfo }))
      if (response.meta.requestStatus === "fulfilled") {
        toast.success("Admin added successfully!")
        navigate("/dashboard/admin/admins")
      } else {
        throw new Error("Failed to add admin")
      }
    } catch (error: any) {
      toast.error(error.message)
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
    <div className={styles.addAdmin}>
      <h2>Add New Admin</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address"
              },
              minLength: { value: 2, message: "Last name must be at least 2 characters" },
              maxLength: { value: 100, message: "Last name must not exceed 100 characters" }
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
          Add Admin
        </button>
      </form>
    </div>
  )
}
