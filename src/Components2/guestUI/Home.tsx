import { PageTitle } from "@/Components2/helpers/PageTitle"
import { ProductSidebar } from "../layout/sidebars/ProductSidebar"
import { Products } from "./Products"
import styles from "./Home.module.css"

export const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles["sidebar-container"]}>
        <PageTitle title="Home Page" />
        <ProductSidebar />
      </div>
      <div className={styles["main-container"]}>
        <Products />
      </div>
    </div>
  )
}
