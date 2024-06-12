import React, { useState, useEffect } from "react";
import axios from "axios";

const PaymentPage = () => {
  const [snapToken, setSnapToken] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSnapToken();
  }, []);

  const fetchSnapToken = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/midtrans-token");
      const { token } = response.data;
      setSnapToken(token);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Snap token:", error);
      setLoading(false);
    }
  };

  const handlePayment = () => {
    if (!snapToken) {
      console.error("Snap token is not available");
      return;
    }

    window.snap.pay(snapToken, {
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
  };

  return (
    <div>
      <h2>Payment Page</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <button onClick={handlePayment} disabled={!snapToken}>
          Proceed to Payment
        </button>
      )}
    </div>
  );
};

export default PaymentPage;
