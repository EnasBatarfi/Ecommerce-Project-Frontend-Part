import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { AppDispatch, RootState } from "@/Components2/toolkit/Store"
import {
  deleteCategory,
  fetchCategoryBySlug,
  updateCategory
} from "@/Components2/toolkit/slices/CategorySlice"
import { toast } from "react-toastify"
import { useForm, SubmitHandler } from "react-hook-form"
import styles from "./CategoryDetails.module.css"

type UpdateCategoryFormData = {
  name: string
  description: string
}

export const CategoryDetails = () => {
  const { slug } = useParams<{ slug: string }>()
  const { category, isLoading, error } = useSelector((state: RootState) => state.categoryR)
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const [isFormOpen, setIsFormOpen] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<UpdateCategoryFormData>()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategoryBySlug(slug))
    }
    fetchData()
  }, [dispatch, slug])

  useEffect(() => {
    if (category) {
      setValue("name", category.name)
      setValue("description", category.description)
    }
  }, [category, setValue])

  const handleDelete = async (): Promise<void> => {
    try {
      const token = localStorage.getItem("adminLoginData")
        ? JSON.parse(localStorage.getItem("adminLoginData") as string).token
        : null
      if (!token) {
        throw new Error("Authentication token not found")
      }
      if (!category?.categoryId) {
        throw new Error("Category ID not found")
      }

      const confirmDelete = window.confirm(
        `Are you sure you want to delete the category "${category.name}" and all associated products?`
      )

      if (confirmDelete) {
        await dispatch(deleteCategory({ categoryId: category.categoryId, token }))
        toast.success("Category deleted successfully")
        navigate("/dashboard/admin/categories")
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleEdit: SubmitHandler<UpdateCategoryFormData> = async (data) => {
    try {
      const token = localStorage.getItem("adminLoginData")
        ? JSON.parse(localStorage.getItem("adminLoginData") as string).token
        : null
      if (!token) {
        throw new Error("Authentication token not found")
      }
      if (!category?.categoryId) {
        throw new Error("Category ID not found")
      }

      const response = await dispatch(
        updateCategory({
          categoryId: category.categoryId,
          token,
          updateCategoryInfo: data
        })
      )
      if (response.meta.requestStatus === "fulfilled") {
        setIsFormOpen(false)
        toast.success("Category info updated successfully!")
      } else {
        throw new Error("Failed to update category info")
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <article className={styles.details}>
      <h2>Category Details</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {category && (
        <div className={styles.categoryDetails}>
          <div className={styles.categoryDetailsHeader}>
            <h3 className={styles.categoryName}>Name: {category.name}</h3>
            <p className={styles.categoryDescription}>Description: {category.description}</p>
          </div>
        </div>
      )}
      <button
        className={styles.btn}
        onClick={() => {
          setIsFormOpen(!isFormOpen)
        }}
      >
        {isFormOpen ? "Close Edit Category Info" : "Edit Category Info"}
      </button>
      <button className={styles.btn} onClick={handleDelete}>
        Delete
      </button>
      {isFormOpen && (
        <form onSubmit={handleSubmit(handleEdit)}>
          <div className={styles.formField}>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              defaultValue={category?.name}
              {...register("name", {
                required: "Name is required",
                minLength: { value: 2, message: "Name must be at least 2 characters" },
                maxLength: { value: 100, message: "Name must not exceed 100 characters" }
              })}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div className={styles.formField}>
            <label htmlFor="description">Description: </label>
            <input
              type="text"
              defaultValue={category?.description}
              {...register("description", {
                required: "Description is required",
                maxLength: { value: 300, message: "Description must not exceed 300 characters" }
              })}
            />
            {errors.description && <p>{errors.description.message}</p>}
          </div>
          <button type="submit" className={styles.btn}>
            Update
          </button>
        </form>
      )}
    </article>
  )
}
