import React from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/Components2/toolkit/Store"
import { addAddress } from "@/Components2/toolkit/slices/AddressSlice"
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "react-toastify"
import { Address } from "@/Components2/types/Types"
import { useNavigate } from "react-router-dom"
import styles from "./AddAddress.module.css"

export const AddAddress = () => {
  const dispatch: AppDispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Address>()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<Address> = async (data) => {
    try {
      const userLoginData = localStorage.getItem("loginData")
      const token = userLoginData ? JSON.parse(userLoginData).token : null
      const customerId = userLoginData ? JSON.parse(userLoginData).customerData.customerId : null

      if (!token) {
        throw new Error("Authentication token not found")
      }
      if (!customerId) {
        throw new Error("Customer ID not found")
      }

      const newAddressInfo = { ...data, customerId }

      const response = await dispatch(addAddress({ token, newAddress: newAddressInfo }))
      if (response.meta.requestStatus === "fulfilled") {
        toast.success("Address added successfully!")
        navigate("/dashboard/customer/addresses")
      } else {
        throw new Error("Failed to add address")
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add New Address</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formField}>
          <label htmlFor="name" className={styles.label}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 2, message: "Name must be at least 2 characters" },
              maxLength: { value: 100, message: "Name must not exceed 100 characters" }
            })}
            className={styles.input}
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>
        <div className={styles.formField}>
          <label htmlFor="addressLine1" className={styles.label}>
            Address Line 1:
          </label>
          <input
            type="text"
            id="addressLine1"
            {...register("addressLine1", {
              required: "Address Line 1 is required",
              minLength: { value: 2, message: "Address Line 1 must be at least 2 characters" },
              maxLength: { value: 100, message: "Address Line 1 must not exceed 100 characters" }
            })}
            className={styles.input}
          />
          {errors.addressLine1 && <p className={styles.error}>{errors.addressLine1.message}</p>}
        </div>
        <div className={styles.formField}>
          <label htmlFor="addressLine2" className={styles.label}>
            Address Line 2:
          </label>
          <input
            type="text"
            id="addressLine2"
            {...register("addressLine2", {
              maxLength: { value: 100, message: "Address Line 2 must not exceed 100 characters" }
            })}
            className={styles.input}
          />
          {errors.addressLine2 && <p className={styles.error}>{errors.addressLine2.message}</p>}
        </div>
        <div className={styles.formField}>
          <label htmlFor="country" className={styles.label}>
            Country:
          </label>
          <input
            type="text"
            id="country"
            {...register("country", {
              required: "Country is required",
              minLength: { value: 2, message: "Country must be at least 2 characters" },
              maxLength: { value: 100, message: "Country must not exceed 100 characters" }
            })}
            className={styles.input}
          />
          {errors.country && <p className={styles.error}>{errors.country.message}</p>}
        </div>
        <div className={styles.formField}>
          <label htmlFor="province" className={styles.label}>
            Province:
          </label>
          <input
            type="text"
            id="province"
            {...register("province", {
              required: "Province is required",
              minLength: { value: 2, message: "Province must be at least 2 characters" },
              maxLength: { value: 100, message: "Province must not exceed 100 characters" }
            })}
            className={styles.input}
          />
          {errors.province && <p className={styles.error}>{errors.province.message}</p>}
        </div>
        <div className={styles.formField}>
          <label htmlFor="city" className={styles.label}>
            City:
          </label>
          <input
            type="text"
            id="city"
            {...register("city", {
              required: "City is required",
              minLength: { value: 2, message: "City must be at least 2 characters" },
              maxLength: { value: 100, message: "City must not exceed 100 characters" }
            })}
            className={styles.input}
          />
          {errors.city && <p className={styles.error}>{errors.city.message}</p>}
        </div>
        <div className={styles.formField}>
          <label htmlFor="zipCode" className={styles.label}>
            Zip Code:
          </label>
          <input
            type="text"
            id="zipCode"
            {...register("zipCode", {
              minLength: { value: 2, message: "Zip Code must be at least 2 characters" },
              maxLength: { value: 20, message: "Zip Code must not exceed 20 characters" }
            })}
            className={styles.input}
          />
          {errors.zipCode && <p className={styles.error}>{errors.zipCode.message}</p>}
        </div>
        <button type="submit" className={styles.submitButton}>
          Add Address
        </button>
      </form>
    </div>
  )
}

export default AddAddress
