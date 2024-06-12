import React from "react";
import { useCart } from "../pages/CartContext";
import axios from "axios";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post("http://localhost:3000/midtrans-token");
      const { token } = response.data;

      window.snap.pay(token, {
        onSuccess: function (result) {
          console.log("Payment successful:", result);
        },
        onPending: function (result) {
          console.log("Payment pending:", result);
        },
        onError: function (result) {
          console.error("Payment error:", result);
        },
        onClose: function () {
          console.log("Payment popup closed");
        },
      });

      history.push("/payment");
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center my-5">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        <div className="row row-cols-1 g-3">
          {cart.map((item) => (
            <div key={item.id} className="col">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text">Price: Rp.{item.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div className="text-center mt-5">
          <button className="btn btn-primary" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
