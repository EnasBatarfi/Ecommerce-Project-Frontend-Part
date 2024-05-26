import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/Components2/toolkit/Store"
import {
  removeItemFromCart,
  updateQuantity,
  clearCart
} from "@/Components2/toolkit/slices/CartSlice"
import { addOrder } from "@/Components2/toolkit/slices/OrderSlice"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { addOrderProduct } from "@/Components2/toolkit/slices/OrderProductSlice"
import styles from "./Cart.module.css"

export const Cart = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const { items, totalQuantity, totalPrice } = useSelector((state: RootState) => state.cartR)
  const { token, customerData } = useSelector((state: RootState) => state.customerR)

  const [paymentMethod, setPaymentMethod] = useState("")
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleRemoveItem = (productId: string) => {
    dispatch(removeItemFromCart(productId))
    toast.success("Item removed from cart")
  }

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ productId, quantity }))
    } else {
      handleRemoveItem(productId)
    }
  }

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method)
  }

  const handleOrderConfirmation = () => {
    setIsOrderConfirmed(true)
    setShowModal(false)
    handleCheckout()
  }

  const handleCheckout = async () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method")
      return
    }

    if (!isOrderConfirmed) {
      setShowModal(true)
      return
    }

    try {
      const customerId = customerData?.customerId
      if (token && customerId) {
        const newOrderInfo = {
          paymentMethod,
          totalPrice,
          customerId
        }
        const createdOrder = await dispatch(addOrder({ token, newOrderInfo })).unwrap()
        const orderId = createdOrder.data.orderId

        const orderProductPromises = items.map((item) =>
          dispatch(
            addOrderProduct({
              token,
              newOrderProductInfo: {
                orderId,
                productId: item.product.productId,
                productPrice: item.product.price,
                quantity: item.quantity
              }
            })
          )
        )

        await Promise.all(orderProductPromises)

        dispatch(clearCart())
        toast.success("Order placed successfully")
        navigate("/dashboard/customer/orders")
      }
    } catch (error) {
      toast.error("Error placing order")
    }
  }

  return (
    <div className={styles.cartPage}>
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className={styles.cartItems}>
            {items.map(({ product, quantity }) => (
              <div key={product.productId} className={styles.cartItem}>
                <img src={product.imgUrl} alt={product.name} className={styles.productImage} />
                <div className={styles.productDetails}>
                  <Link to={`/products/${product.slug}`}>
                    <h3 className={styles.productName}>{product.name}</h3>
                  </Link>
                  <p className={styles.productDescription}>{product.description}</p>
                  <p className={styles.productPrice}>Price: ${product.price}</p>
                  <div className={styles.quantityControl}>
                    <label htmlFor={`quantity-${product.productId}`}>Quantity: </label>
                    <input
                      id={`quantity-${product.productId}`}
                      type="number"
                      value={quantity}
                      min="1"
                      onChange={(e) =>
                        handleQuantityChange(product.productId, parseInt(e.target.value))
                      }
                      className={styles.quantityInput}
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveItem(product.productId)}
                    className={styles.removeButton}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.cartSummary}>
            <h3>Cart Summary</h3>
            <p>Total Quantity: {totalQuantity}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>

            <div className={styles.paymentMethod}>
              <h4>Select Payment Method</h4>
              <button
                onClick={() => handlePaymentMethodChange("Credit Card")}
                className={`${styles.paymentButton} ${
                  paymentMethod === "Credit Card" && styles.activeButton
                }`}
              >
                Credit Card
              </button>
              <button
                onClick={() => handlePaymentMethodChange("PayPal")}
                className={`${styles.paymentButton} ${
                  paymentMethod === "PayPal" && styles.activeButton
                }`}
              >
                PayPal
              </button>
            </div>

            <button onClick={() => setShowModal(true)} className={styles.checkoutButton}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h4>Confirm Order</h4>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <p>Payment Method: {paymentMethod}</p>
            <button onClick={handleOrderConfirmation} className={styles.confirmButton}>
              Confirm
            </button>
            <button onClick={() => setShowModal(false)} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
