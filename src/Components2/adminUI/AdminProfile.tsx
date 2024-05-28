import { AppDispatch, RootState } from "@/Components2/toolkit/Store"
import { updateAdmin } from "@/Components2/toolkit/slices/AdminSlice"
import { UpdateProfileFormData } from "@/Components2/types/Types"
import React, { useState, useEffect, ChangeEvent } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { AdminSidebar } from "../layout/sidebars/AdminSidebar"
import styles from "./AdminProfile.module.css"
import { UploadImage } from "../helpers/UploadImage"

export const AdminProfile = () => {
  const dispatch: AppDispatch = useDispatch()
  const { adminData } = useSelector((state: RootState) => state.adminR)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<UpdateProfileFormData>()

  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    if (adminData) {
      setValue("firstName", adminData.firstName)
      setValue("lastName", adminData.lastName)
      setValue("email", adminData.email)
      setValue("mobile", adminData.mobile)
    }
  }, [adminData, setValue])

  const onSubmit: SubmitHandler<UpdateProfileFormData> = async (data) => {
    try {
      const token = localStorage.getItem("adminLoginData")
        ? JSON.parse(localStorage.getItem("adminLoginData") as string).token
        : null
      if (!token) {
        throw new Error("Authentication token not found")
      }
      if (!adminData?.adminId) {
        throw new Error("Admin ID not found")
      }

      const response = await dispatch(
        updateAdmin({
          adminId: adminData.adminId,
          token,
          updateAdminInfo: data
        })
      )
      if (response.meta.requestStatus === "fulfilled") {
        setIsFormOpen(false)
        toast.success("Admin info updated successfully!")
      } else {
        throw new Error("Failed to update admin info")
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
        setValue("image", url)
      } catch (error) {
        toast.error("Image upload failed")
      }
    }
  }

  return (
    <div className={styles.container}>
      <AdminSidebar />
      <div className={styles.mainContainer}>
        {adminData && (
          <>
            <div className={styles.profileDetails}>
              <img
                src={adminData.image}
                alt={`${adminData.firstName} ${adminData.lastName}`}
                className={styles.profileImage}
              />
              <div className={styles.profileInfo}>
                <p>
                  <strong>Name:</strong> {adminData.firstName} {adminData.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {adminData.email}
                </p>
                <p>
                  <strong>Mobile:</strong> {adminData.mobile}
                </p>
              </div>
            </div>
            <div className={styles.editButtonContainer}>
              <button className={styles.editButton} onClick={() => setIsFormOpen(!isFormOpen)}>
                {isFormOpen ? "Close Edit Admin Info" : "Edit Admin Info"}
              </button>
            </div>
            {isFormOpen && (
              <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.formField}>
                  <label htmlFor="firstName">First Name: </label>
                  <input
                    type="text"
                    {...register("firstName", {
                      required: "First name is required",
                      minLength: { value: 2, message: "First name must be at least 2 characters" },
                      maxLength: {
                        value: 100,
                        message: "First name must not exceed 100 characters"
                      }
                    })}
                  />
                  {errors.firstName && (
                    <p className={styles.errorMessage}>{errors.firstName.message}</p>
                  )}
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
                  {errors.lastName && (
                    <p className={styles.errorMessage}>{errors.lastName.message}</p>
                  )}
                </div>
                <div className={styles.formField}>
                  <label htmlFor="email">Email: </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      minLength: { value: 6, message: "Email must be at least 6 characters" },
                      maxLength: { value: 100, message: "Email must not exceed 100 characters" },
                      pattern: {
                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                        message: "Email is not valid"
                      }
                    })}
                  />
                  {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
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
                  {errors.mobile && <p className={styles.errorMessage}>{errors.mobile.message}</p>}
                </div>
                <div className={styles.formField}>
                  <label htmlFor="image">Profile Image:</label>
                  <input type="file" accept="image/*" onChange={handleImageUpload} />
                  {errors.image && <p className={styles.error}>{errors.image.message}</p>}
                </div>
                <button type="submit" className={styles.updateButton}>
                  Update
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  )
}
