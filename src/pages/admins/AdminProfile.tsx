import { CustomerSidebar } from "@/components/layout/sidebars/CustomerSidebar"
import { AppDispatch, RootState } from "@/toolkit/Store"
import { updateAdmin } from "@/toolkit/slices/AdminSlice"
import { updateCustomer } from "@/toolkit/slices/CustomerSlice"
import { UpdateProfileFormData } from "@/types/Types"
import React, { useState, useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"

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
      console.log(data)
      if (!token) {
        throw new Error("Authentication token not found")
      }
      if (!adminData?.adminId) {
        throw new Error("Customer ID not found")
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
  return (
    <div className="container flex-space-around">
      <CustomerSidebar />
      <div className="main-container">
        {adminData && (
          <>
            <img
              src={adminData.image}
              alt={`${adminData.firstName} ${adminData.lastName}`}
              className="round-img"
            />
            <p>{adminData.firstName}</p>
            <p>{adminData.lastName}</p>
            <p>{adminData.email}</p>
            <p>{adminData.mobile}</p>
            <button
              className="btn"
              onClick={() => {
                setIsFormOpen(!isFormOpen)
              }}
            >
              {isFormOpen ? "Close Edit Customer Info" : "Edit Customer Info"}
            </button>
            {isFormOpen && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-field">
                  <label htmlFor="firstName">First Name: </label>
                  <input
                    type="text"
                    defaultValue={adminData.firstName}
                    {...register("firstName", {
                      required: "First name is required",
                      minLength: { value: 2, message: "First name must be at least 2 characters" },
                      maxLength: {
                        value: 100,
                        message: "First name must not exceed 100 characters"
                      }
                    })}
                  />
                  {errors.firstName && <p>{errors.firstName.message}</p>}
                </div>
                <div className="form-field">
                  <label htmlFor="lastName">Last Name: </label>
                  <input
                    type="text"
                    defaultValue={adminData.lastName}
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
                    defaultValue={adminData.email}
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
                  {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div className="form-field">
                  <label htmlFor="mobile">Mobile: </label>
                  <input
                    type="tel"
                    defaultValue={adminData.mobile}
                    {...register("mobile", {
                      required: "Mobile number is required",
                      pattern: { value: /^\d{10}$/, message: "Mobile number is not valid" }
                    })}
                  />
                  {errors.mobile && <p>{errors.mobile.message}</p>}
                </div>
                <button type="submit">Update</button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  )
}
