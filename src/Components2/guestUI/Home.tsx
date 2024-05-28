import React, { useState } from "react"
import { PageTitle } from "@/Components2/helpers/PageTitle"
import { ProductSidebar } from "../layout/sidebars/ProductSidebar"
import { Products } from "./Products"
import styles from "./Home.module.css"
import logo from "@/assets/logo.png"

export const Home = () => {
  const [filter, setFilter] = useState<{
    category: string
    minPrice: number | null
    maxPrice: number | null
  }>({
    category: "all",
    minPrice: null,
    maxPrice: null
  })

  const handleFilterChange = (newFilter: {
    category: string
    minPrice: number | null
    maxPrice: number | null
  }) => {
    setFilter(newFilter)
  }

  return (
    <div>
      <section className={styles.hero}>
        <img src={logo} alt="Beauty Bliss Logo" className={styles.heroLogo} />
        <h1 className={styles.heroTitle}>Welcome to Beauty Bliss</h1>
        <p className={styles.heroSubtitle}>
          Discover your beauty with our exclusive range of cosmetics
        </p>
      </section>
      <div className={styles.container}>
        <div className={styles["sidebar-container"]}>
          <PageTitle title="Home Page" />
          <ProductSidebar onFilterChange={handleFilterChange} />
        </div>
        <div className={styles["main-container"]}>
          <Products filter={filter} />
        </div>
      </div>
    </div>
  )
}
