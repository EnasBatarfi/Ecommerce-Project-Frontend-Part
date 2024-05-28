import { AppDispatch, RootState } from "@/Components2/toolkit/Store"
import { updateCustomer } from "@/Components2/toolkit/slices/CustomerSlice"
import { UpdateProfileFormData } from "@/Components2/types/Types"
import React, { useState, useEffect, ChangeEvent } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { CustomerSidebar } from "../layout/sidebars/CustomerSidebar"
import styles from "./CustomerProfile.module.css"
import { UploadImage } from "../helpers/UploadImage"

export const CustomerProfile = () => {
  const dispatch: AppDispatch = useDispatch()
  const { customerData } = useSelector((state: RootState) => state.customerR)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<UpdateProfileFormData>()

  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    if (customerData) {
      setValue("firstName", customerData.firstName)
      setValue("lastName", customerData.lastName)
      setValue("email", customerData.email)
      setValue("mobile", customerData.mobile)
    }
  }, [customerData, setValue])

  const onSubmit: SubmitHandler<UpdateProfileFormData> = async (data) => {
    try {
      const token = localStorage.getItem("loginData")
        ? JSON.parse(localStorage.getItem("loginData") as string).token
        : null
      if (!token) {
        throw new Error("Authentication token not found")
      }
      if (!customerData?.customerId) {
        throw new Error("Customer ID not found")
      }

      const response = await dispatch(
        updateCustomer({
          customerId: customerData.customerId,
          token,
          updateCustomerInfo: data
        })
      )
      if (response.meta.requestStatus === "fulfilled") {
        setIsFormOpen(false)
        toast.success("Customer info updated successfully!")
      } else {
        throw new Error("Failed to update customer info")
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
      <CustomerSidebar />
      <div className={styles.mainContainer}>
        {customerData && (
          <>
            <div className={styles.profileDetails}>
              <img
                src={customerData.image}
                alt={`${customerData.firstName} ${customerData.lastName}`}
                className={styles.profileImage}
              />
              <div className={styles.profileInfo}>
                <p>
                  <strong>Name:</strong> {customerData.firstName} {customerData.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {customerData.email}
                </p>
                <p>
                  <strong>Mobile:</strong> {customerData.mobile}
                </p>
              </div>
            </div>
            <div>
              <button className={styles.editButton} onClick={() => setIsFormOpen(!isFormOpen)}>
                {isFormOpen ? "Close Edit Customer Info" : "Edit Customer Info"}
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
