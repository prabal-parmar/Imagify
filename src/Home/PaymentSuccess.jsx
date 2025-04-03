import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./PaymentSuccess.css";

const PaymentStatus = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-status-container">
      <div className="order-success">
        <FaCheckCircle className="success-icon" />
        <h1 className="order-success-text">Credits Purchased Successfully!</h1>
      </div>
      <div className="button-group">
      
        {/* <button className="view-order-button" onClick={() => navigate("/user/orders")}>
          View Order
        </button> */}
        <button className="continue-shopping-button" onClick={() => navigate("/generateImage")}>
          Continue to Generate Images
        </button>
      </div>
    </div>
  );
};

export default PaymentStatus;
