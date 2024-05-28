import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { AppDispatch, RootState } from "@/Components2/toolkit/Store"
import {
  deleteAddress,
  fetchAddress,
  updateAddress
} from "@/Components2/toolkit/slices/AddressSlice"
import { fetchCustomerData } from "@/Components2/toolkit/slices/CustomerSlice"
import { toast } from "react-toastify"
import { useForm, SubmitHandler } from "react-hook-form"
import styles from "./CustomerAddressDetails.module.css"
import { UpdateAddressFormData } from "../types/Types"

export const CustomerAddressDetails = () => {
  const { addressId } = useParams<{ addressId: string }>()
  const { customerData, token, isLoading, error } = useSelector(
    (state: RootState) => state.customerR
  )
  const { address } = useSelector((state: RootState) => state.addressR)
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const [isFormOpen, setIsFormOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UpdateAddressFormData>()

  useEffect(() => {
    const fetchData = async () => {
      if (token && customerData?.customerId) {
        await dispatch(fetchCustomerData({ customerId: customerData.customerId, token }))
      }
      if (addressId && token) {
        await dispatch(fetchAddress({ addressId, token }))
      }
    }
    fetchData()
  }, [dispatch, token, customerData?.customerId, addressId])

  useEffect(() => {
    if (address) {
      reset({
        name: address.name,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        province: address.province,
        country: address.country,
        zipCode: address.zipCode,
        customerId: address.customerId
      })
    }
  }, [address, reset])

  const handleDelete = async () => {
    if (addressId && token) {
      await dispatch(deleteAddress({ addressId, token }))
      toast.success("Address deleted successfully")
      navigate("/dashboard/customer/addresses")
    }
  }

  const handleEdit: SubmitHandler<UpdateAddressFormData> = async (data) => {
    console.log(data)
    if (addressId && token) {
      const response = await dispatch(
        updateAddress({
          addressId,
          token,
          updateAddressInfo: data
        })
      )
      console.log(response)
      setIsFormOpen(false)
      toast.success("Address updated successfully!")
    }
  }

  return (
    <article className={styles.details}>
      <h2>Address Details</h2>
      {!address && isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {address && (
        <div className={styles.addressDetails}>
          <div className={styles.addressDetailsHeader}>
            <h3 className={styles.addressName}>Name: {address.name}</h3>
            <p className={styles.addressLine}>{address.addressLine1}</p>
            {address.addressLine2 && <p className={styles.addressLine}>{address.addressLine2}</p>}
            <p className={styles.addressLine}>
              {address.city}, {address.province}, {address.country}
            </p>
            <p className={styles.addressLine}>{address.zipCode}</p>
          </div>
        </div>
      )}
      <button
        className={styles.btn}
        onClick={() => {
          setIsFormOpen(!isFormOpen)
        }}
      >
        {isFormOpen ? "Close Edit Address Info" : "Edit Address Info"}
      </button>
      <button className={styles.btn} onClick={handleDelete}>
        Delete
      </button>
      {isFormOpen && address && (
        <form onSubmit={handleSubmit(handleEdit)}>
          <div className={styles.formField}>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              defaultValue={address.name}
              {...register("name", {
                required: "Name is required",
                minLength: { value: 2, message: "Name must be at least 2 characters" },
                maxLength: { value: 100, message: "Name must not exceed 100 characters" }
              })}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div className={styles.formField}>
            <label htmlFor="addressLine1">Address Line 1: </label>
            <input
              type="text"
              defaultValue={address.addressLine1}
              {...register("addressLine1", { required: "Address Line 1 is required" })}
            />
            {errors.addressLine1 && <p>{errors.addressLine1.message}</p>}
          </div>
          <div className={styles.formField}>
            <label htmlFor="addressLine2">Address Line 2: </label>
            <input type="text" defaultValue={address.addressLine2} {...register("addressLine2")} />
            {errors.addressLine2 && <p>{errors.addressLine2.message}</p>}
          </div>
          <div className={styles.formField}>
            <label htmlFor="city">City: </label>
            <input
              type="text"
              defaultValue={address.city}
              {...register("city", { required: "City is required" })}
            />
            {errors.city && <p>{errors.city.message}</p>}
          </div>
          <div className={styles.formField}>
            <label htmlFor="province">Province: </label>
            <input
              type="text"
              defaultValue={address.province}
              {...register("province", { required: "Province is required" })}
            />
            {errors.province && <p>{errors.province.message}</p>}
          </div>
          <div className={styles.formField}>
            <label htmlFor="country">Country: </label>
            <input
              type="text"
              defaultValue={address.country}
              {...register("country", { required: "Country is required" })}
            />
            {errors.country && <p>{errors.country.message}</p>}
          </div>
          <div className={styles.formField}>
            <label htmlFor="zipCode">Zip Code: </label>
            <input
              type="text"
              defaultValue={address.zipCode}
              {...register("zipCode", { required: "Zip Code is required" })}
            />
            {errors.zipCode && <p>{errors.zipCode.message}</p>}
          </div>
          <input type="hidden" {...register("customerId")} />
          <button type="submit" className={styles.btn}>
            Update
          </button>
        </form>
      )}
    </article>
  )
}
