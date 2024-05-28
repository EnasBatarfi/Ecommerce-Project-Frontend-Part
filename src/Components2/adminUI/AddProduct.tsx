import React, { useState, useEffect, ChangeEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/Components2/toolkit/Store"
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "react-toastify"
import { Product } from "@/Components2/types/Types"
import { useNavigate } from "react-router-dom"
import { addProduct } from "@/Components2/toolkit/slices/ProductSlice"
import { fetchCategories } from "@/Components2/toolkit/slices/CategorySlice"
import { UploadImage } from "@/Components2/helpers/UploadImage"
import styles from "./AddProduct.module.css"

export const AddProduct = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { categories } = useSelector((state: RootState) => state.categoryR)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<Product>()

  useEffect(() => {
    dispatch(fetchCategories({ pageNumber: 1, pageSize: 100 }))
  }, [dispatch])

  const onSubmit: SubmitHandler<Product> = async (data) => {
    try {
      const adminLoginData = localStorage.getItem("adminLoginData")
      const token = adminLoginData ? JSON.parse(adminLoginData).token : null
      const adminId = adminLoginData ? JSON.parse(adminLoginData).adminData.adminId : null

      if (!token) {
        throw new Error("Authentication token not found")
      }
      if (!adminId) {
        throw new Error("Admin ID not found")
      }

      const newProductInfo = { ...data, adminId }

      const response = await dispatch(addProduct({ token, newProductInfo }))
      if (response.meta.requestStatus === "fulfilled") {
        toast.success("Product added successfully!")
        navigate("/dashboard/admin/products")
      } else {
        throw new Error("Failed to add product")
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
        setValue("imgUrl", url)
      } catch (error) {
        toast.error("Image upload failed")
      }
    }
  }

  return (
    <div className={styles.addProductPage}>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.imagePreview}>
          {imagePreview && (
            <img src={imagePreview} alt="Product Preview" className={styles.productImagePreview} />
          )}
        </div>
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
        <div className={styles.formField}>
          <label htmlFor="sku">SKU: </label>
          <input
            type="text"
            {...register("sku", {
              required: "SKU is required",
              maxLength: { value: 100, message: "SKU must not exceed 100 characters" }
            })}
          />
          {errors.sku && <p className={styles.error}>{errors.sku.message}</p>}
        </div>
        <div className={styles.formField}>
          <label htmlFor="price">Price: </label>
          <input
            type="number"
            step="0.01"
            {...register("price", {
              required: "Price is required",
              min: { value: 1, message: "Price must be at least 1" }
            })}
          />
          {errors.price && <p className={styles.error}>{errors.price.message}</p>}
        </div>
        <div className={styles.formField}>
          <label htmlFor="stockQuantity">Stock Quantity: </label>
          <input
            type="number"
            {...register("stockQuantity", {
              required: "Stock quantity is required",
              min: { value: 0, message: "Stock quantity must be a positive number" }
            })}
          />
          {errors.stockQuantity && <p className={styles.error}>{errors.stockQuantity.message}</p>}
        </div>
        <div className={styles.formField}>
          <label htmlFor="category">Category: </label>
          <select
            {...register("categoryId", { required: "Category is required" })}
            className={styles.select}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <p className={styles.error}>{errors.categoryId.message}</p>}
        </div>
        <div className={styles.formField}>
          <label htmlFor="imgUrl">Product Image:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {errors.imgUrl && <p className={styles.error}>{errors.imgUrl.message}</p>}
        </div>
        <button type="submit" className={styles.submitButton}>
          Add Product
        </button>
      </form>
    </div>
  )
}
