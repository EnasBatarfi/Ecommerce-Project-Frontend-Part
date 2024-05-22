import React, { useState, ChangeEvent } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/toolkit/Store"
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "react-toastify"
import { Product } from "@/types/Types"
import { useNavigate } from "react-router-dom"
import { addProduct } from "@/toolkit/slices/ProductSlice"
import { UploadImage } from "@/components/UploadImage"

export const AddProductPage = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<Product>()

  const onSubmit: SubmitHandler<Product> = async (data) => {
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

      const newProductInfo = { ...data, adminId }
      console.log(newProductInfo)

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-field">
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          {...register("name", {
            required: "Name is required",
            minLength: { value: 2, message: "Name must be at least 2 characters" },
            maxLength: { value: 100, message: "Name must not exceed 100 characters" }
          })}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div className="form-field">
        <label htmlFor="description">Description: </label>
        <input
          type="text"
          {...register("description", {
            maxLength: { value: 300, message: "Description must not exceed 300 characters" }
          })}
        />
        {errors.description && <p>{errors.description.message}</p>}
      </div>
      <div className="form-field">
        <label htmlFor="sku">SKU: </label>
        <input
          type="text"
          {...register("sku", {
            required: "SKU is required",
            maxLength: { value: 100, message: "SKU must not exceed 100 characters" }
          })}
        />
        {errors.sku && <p>{errors.sku.message}</p>}
      </div>
      <div className="form-field">
        <label htmlFor="price">Price: </label>
        <input
          type="number"
          step="0.01"
          {...register("price", {
            required: "Price is required",
            min: { value: 1, message: "Price must be at least 1" }
          })}
        />
        {errors.price && <p>{errors.price.message}</p>}
      </div>
      <div className="form-field">
        <label htmlFor="stockQuantity">Stock Quantity: </label>
        <input
          type="number"
          {...register("stockQuantity", {
            required: "Stock quantity is required",
            min: { value: 0, message: "Stock quantity must be a positive number" }
          })}
        />
        {errors.stockQuantity && <p>{errors.stockQuantity.message}</p>}
      </div>
      <div className="form-field">
        <label htmlFor="imgUrl">Product Image:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {errors.imgUrl && <p>{errors.imgUrl.message}</p>}
        {imagePreview && (
          <img src={imagePreview} alt="Product Preview" className="product-image-preview" />
        )}
      </div>
      <button type="submit">Add Product</button>
    </form>
  )
}
