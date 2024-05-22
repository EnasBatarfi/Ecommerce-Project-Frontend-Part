import { CustomerSidebar } from "@/components/layout/sidebars/CustomerSidebar"
import { AppDispatch, RootState } from "@/toolkit/Store"
import { updateCustomer } from "@/toolkit/slices/CustomerSlice"
import { UpdateCustomerProfileFormData } from "@/types/Types"
import React, { useState, useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"

export const CustomerProfile = () => {
  const dispatch: AppDispatch = useDispatch()
  const { customerData } = useSelector((state: RootState) => state.customerR)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<UpdateCustomerProfileFormData>()

  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    if (customerData) {
      setValue("firstName", customerData.firstName)
      setValue("lastName", customerData.lastName)
      setValue("email", customerData.email)
      setValue("mobile", customerData.mobile)
    }
  }, [customerData, setValue])

  const onSubmit: SubmitHandler<UpdateCustomerProfileFormData> = async (data) => {
    try {
      const token = localStorage.getItem("loginData")
        ? JSON.parse(localStorage.getItem("loginData") as string).token
        : null
      console.log(data)
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
  return (
    <div className="container flex-space-around">
      <CustomerSidebar />
      <div className="main-container">
        {customerData && (
          <>
            <img
              src={customerData.image}
              alt={`${customerData.firstName} ${customerData.lastName}`}
              className="round-img"
            />
            <p>{customerData.firstName}</p>
            <p>{customerData.lastName}</p>
            <p>{customerData.email}</p>
            <p>{customerData.mobile}</p>
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
                    defaultValue={customerData.firstName}
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
                    defaultValue={customerData.lastName}
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
                    defaultValue={customerData.email}
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
                    defaultValue={customerData.mobile}
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
