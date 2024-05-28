import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/Components2/toolkit/Store"
import { fetchCategories } from "@/Components2/toolkit/slices/CategorySlice"
import styles from "./ProductSidebar.module.css"

interface ProductSidebarProps {
  onFilterChange: (filter: {
    category: string
    minPrice: number | null
    maxPrice: number | null
  }) => void
}

export const ProductSidebar: React.FC<ProductSidebarProps> = ({ onFilterChange }) => {
  const { categories } = useSelector((state: RootState) => state.categoryR)
  const dispatch: AppDispatch = useDispatch()
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [minPrice, setMinPrice] = useState<number | null>(null)
  const [maxPrice, setMaxPrice] = useState<number | null>(null)

  useEffect(() => {
    dispatch(fetchCategories({ pageNumber: 1, pageSize: 10 }))
  }, [dispatch])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    onFilterChange({ category, minPrice, maxPrice })
  }

  const handlePriceChange = () => {
    onFilterChange({ category: selectedCategory, minPrice, maxPrice })
  }

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.filterSection}>
        <h3>Filter by Category</h3>
        <ul className={styles.categoryList}>
          <li
            onClick={() => handleCategoryChange("all")}
            className={selectedCategory === "all" ? styles.active : ""}
          >
            All
          </li>
          {categories.map((category) => (
            <li
              key={category.categoryId}
              onClick={() => handleCategoryChange(category.slug)}
              className={selectedCategory === category.slug ? styles.active : ""}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.filterSection}>
        <h3>Filter by Price</h3>
        <div className={styles.priceFilter}>
          <label>Min Price</label>
          <input
            type="number"
            value={minPrice ?? ""}
            onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : null)}
            className={styles.priceInput}
          />
        </div>
        <div className={styles.priceFilter}>
          <label>Max Price</label>
          <input
            type="number"
            value={maxPrice ?? ""}
            onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : null)}
            className={styles.priceInput}
          />
        </div>
        <button onClick={handlePriceChange} className={styles.btn}>
          Apply
        </button>
      </div>
    </div>
  )
}
