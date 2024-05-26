import React from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/Components2/toolkit/Store"
import { addCategory } from "@/Components2/toolkit/slices/CategorySlice"
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "react-toastify"
import { Category } from "@/Components2/types/Types"
import { useNavigate } from "react-router-dom"
import styles from "./AddCategory.module.css"

export const AddCategory = () => {
  const dispatch: AppDispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Category>()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<Category> = async (data) => {
    try {
      const adminLoginData = localStorage.getItem("adminLoginData")
      const token = adminLoginData ? JSON.parse(adminLoginData).token : null
      const adminId = adminLoginData ? JSON.parse(adminLoginData).adminData.userId : null

      if (!token) {
        throw new Error("Authentication token not found")
      }
      if (!adminId) {
        throw new Error("Admin ID not found")
      }

      const newCategoryInfo = { ...data, adminId }

      const response = await dispatch(addCategory({ token, newCategoryInfo }))
      if (response.meta.requestStatus === "fulfilled") {
        toast.success("Category added successfully!")
        navigate("/dashboard/admin/categories")
      } else {
        throw new Error("Failed to add category")
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div className={styles.addCategory}>
      <h2>Add New Category</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formField}>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 2, message: "Name must be at least 2 characters" },
              maxLength: { value: 100, message: "Name must not exceed 100 characters" }
            })}
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>
        <div className={styles.formField}>
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            {...register("description", {
              maxLength: { value: 300, message: "Description must not exceed 300 characters" }
            })}
          />
          {errors.description && <p className={styles.error}>{errors.description.message}</p>}
        </div>
        <button type="submit" className={styles.submitButton}>
          Add Category
        </button>
      </form>
    </div>
  )
}
