import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/toolkit/Store"
import { removeItemFromCart, updateQuantity, clearCart } from "@/toolkit/slices/CartSlice"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const Cart = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const { items, totalQuantity, totalPrice } = useSelector((state: RootState) => state.cartR)

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

  const handleCheckout = () => {
    // Proceed to checkout (create an order)
    dispatch(clearCart())
    toast.success("Order placed successfully")
    navigate("/order-confirmation")
  }

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map(({ product, quantity }) => (
              <div key={product.productId} className="cart-item">
                <img src={product.imgUrl} alt={product.name} />
                <div>
                  <Link to={`/products/${product.slug}`}>
                    <h3>{product.name}</h3>
                  </Link>
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>
                  <div>
                    <label htmlFor={`quantity-${product.productId}`}>Quantity: </label>
                    <input
                      id={`quantity-${product.productId}`}
                      type="number"
                      value={quantity}
                      min="1"
                      onChange={(e) =>
                        handleQuantityChange(product.productId, parseInt(e.target.value))
                      }
                    />
                  </div>
                  <button onClick={() => handleRemoveItem(product.productId)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Cart Summary</h3>
            <p>Total Quantity: {totalQuantity}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <button onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  )
}
