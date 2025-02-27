import React, { useEffect, useState, ChangeEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { AppDispatch, RootState } from "@/Components2/toolkit/Store"
import { toast } from "react-toastify"
import { useForm, SubmitHandler } from "react-hook-form"
import { UpdateProductFormData } from "@/Components2/types/Types"
import { UploadImage } from "@/Components2/helpers/UploadImage"
import {
  deleteProduct,
  fetchProductBySlug,
  updateProduct
} from "@/Components2/toolkit/slices/ProductSlice"
import styles from "./ProductDetails.module.css"

const ProductDetails = () => {
  const { slug } = useParams<{ slug: string }>()
  const { product, isLoading, error } = useSelector((state: RootState) => state.productR)
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(product?.imgUrl || "")

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<UpdateProductFormData>()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProductBySlug(slug))
    }
    fetchData()
  }, [dispatch, slug, isFormOpen])

  useEffect(() => {
    if (product) {
      setValue("name", product.name)
      setValue("description", product.description)
      setValue("price", product.price)
      setValue("stockQuantity", product.stockQuantity)
      setValue("imgUrl", product.imgUrl)
      setImagePreview(product.imgUrl)
    }
  }, [product, setValue])

  const handleDelete = async (): Promise<void> => {
    try {
      const token = localStorage.getItem("adminLoginData")
        ? JSON.parse(localStorage.getItem("adminLoginData") as string).token
        : null
      if (!token) {
        throw new Error("Authentication token not found")
      }
      if (!product?.productId) {
        throw new Error("Product ID not found")
      }

      const confirmDelete = window.confirm(
        `Are you sure you want to delete the product "${product.name}"?`
      )

      if (confirmDelete) {
        await dispatch(deleteProduct({ productId: product.productId, token }))
        toast.success("Product deleted successfully")
        navigate("/dashboard/admin/products")
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleEdit: SubmitHandler<UpdateProductFormData> = async (data) => {
    try {
      const token = localStorage.getItem("adminLoginData")
        ? JSON.parse(localStorage.getItem("adminLoginData") as string).token
        : null
      if (!token) {
        throw new Error("Authentication token not found")
      }
      if (!product?.productId) {
        throw new Error("Product ID not found")
      }

      const response = await dispatch(
        updateProduct({
          productId: product.productId,
          token,
          updateProductInfo: data
        })
      )
      if (response.meta.requestStatus === "fulfilled") {
        setIsFormOpen(false)
        toast.success("Product info updated successfully!")
      } else {
        throw new Error("Failed to update product info")
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
    <article className={styles.details}>
      <h2>Product Details</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {product && (
        <div className={styles.productDetails}>
          {imagePreview && (
            <img src={imagePreview} alt="Product Image" className={styles.productImage} />
          )}
          <div className={styles.productDetailsHeader}>
            <h3 className={styles.productName}>Name: {product.name}</h3>
            <p className={styles.productDescription}>Description: {product.description}</p>
            <p className={styles.productPrice}>Price: ${product.price}</p>
            <p className={styles.productQuantity}>Stock Quantity: {product.stockQuantity}</p>
          </div>
        </div>
      )}
      <button
        className={styles.btn}
        onClick={() => {
          setIsFormOpen(!isFormOpen)
        }}
      >
        {isFormOpen ? "Close Edit Product Info" : "Edit Product Info"}
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
              defaultValue={product?.name}
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
              defaultValue={product?.description}
              {...register("description", {
                required: "Description is required",
                minLength: { value: 2, message: "Description must be at least 2 characters" },
                maxLength: { value: 255, message: "Description must not exceed 255 characters" }
              })}
            />
            {errors.description && <p>{errors.description.message}</p>}
          </div>
          <div className={styles.formField}>
            <label htmlFor="price">Price: </label>
            <input
              type="number"
              step="0.01"
              defaultValue={product?.price}
              {...register("price", {
                required: "Price is required"
              })}
            />
            {errors.price && <p>{errors.price.message}</p>}
          </div>
          <div className={styles.formField}>
            <label htmlFor="stockQuantity">Stock Quantity: </label>
            <input
              type="number"
              defaultValue={product?.stockQuantity}
              {...register("stockQuantity", {
                required: "Stock quantity is required"
              })}
            />
            {errors.stockQuantity && <p>{errors.stockQuantity.message}</p>}
          </div>
          <div className={styles.formField}>
            <label htmlFor="imgUrl">Product Image:</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {errors.imgUrl && <p>{errors.imgUrl.message}</p>}
          </div>
          <button type="submit" className={styles.btn}>
            Update
          </button>
        </form>
      )}
    </article>
  )
}
export default ProductDetails
