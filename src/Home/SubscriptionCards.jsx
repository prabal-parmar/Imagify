import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import "./cards.css"
const SubscriptionCards = () => {
  const [osType, setOsType] = useState("other");
  const { user } = useContext(UserContext);
  const [prices, setPrices] = useState({
    basic: 50,
    pro: 100,
    premium: 150,
  });
  const [credits, setCredits] = useState({
    basic: 50,
    pro: 120,
    premium: 200,
  });

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes("mac")) {
      setOsType("macOS");
      setPrices({
        basic: 50 * 1.5,
        pro: 100 * 1.5,
        premium: 150 * 1.5,
      });
    }
  }, []);

  const handlePurchase = async (plan, amount, credits) => {
    if (!user) {
      alert("please login to proceed");
      return;
    }
    // if(1){
    //     console.log(plan,amount,credits);
    //     return;
    // }
    try {

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/payment/create-order`, {
        plan,
        credits,
        userId: user?.googleId, // Sending the Google ID
        email: user?.email, // Sending the email
        amount, // Sending the price based on OS type
        transactionId: "T" + Date.now(),
      });

      window.location.href = response.data.url

    } catch (error) {
      alert("Error purchasing plan.");
    }
  };
  return (
    <div className="subscription-container">
      <div className="subscription-title">Choose Your Subscription Plan</div>
      <div className="cards">
        <a href="#" className="data-card data-card-one" onClick={() => handlePurchase("basic", prices.basic, credits.basic)}>
          <h3>Basic Plan</h3>
          <h4>Employees</h4>
          <p>🔹 Generate up to 50 images</p>
          <span className="link-text">
            ₹{prices.basic.toFixed(2)}
            <svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M17.8631 0.929124L24.2271 7.29308C24.6176 7.68361 24.6176 8.31677 24.2271 8.7073L17.8631 15.0713C17.4726 15.4618 16.8394 15.4618 16.4489 15.0713C16.0584 14.6807 16.0584 14.0476 16.4489 13.657L21.1058 9.00019H0.47998V7.00019H21.1058L16.4489 2.34334C16.0584 1.95281 16.0584 1.31965 16.4489 0.929124C16.8394 0.538599 17.4726 0.538599 17.8631 0.929124Z" fill="#753BBD" />
            </svg>
          </span>
        </a>

        <a href="#" className="data-card data-card-two" onClick={() => handlePurchase("pro", prices.pro, credits.pro)}>
          <h3>Pro Plan</h3>
          <h4>Employees</h4>
          <p>🚀 Generate up to <strong>120 images</strong></p>
          <span className="link-text">
            ₹{prices.pro.toFixed(2)}
            <svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M17.8631 0.929124L24.2271 7.29308C24.6176 7.68361 24.6176 8.31677 24.2271 8.7073L17.8631 15.0713C17.4726 15.4618 16.8394 15.4618 16.4489 15.0713C16.0584 14.6807 16.0584 14.0476 16.4489 13.657L21.1058 9.00019H0.47998V7.00019H21.1058L16.4489 2.34334C16.0584 1.95281 16.0584 1.31965 16.4489 0.929124C16.8394 0.538599 17.4726 0.538599 17.8631 0.929124Z" fill="#753BBD" />
            </svg>
          </span>
        </a>

        <a href="#" className="data-card data-card-three" onClick={() => handlePurchase("premium", prices.premium, credits.premium)}>
          <h3>Premium Plan</h3>
          <h4>Employees</h4>
          <p>🌟 Generate up to <strong>200 images</strong></p>
          <span className="link-text">
            ₹{prices.premium.toFixed(2)}
            <svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M17.8631 0.929124L24.2271 7.29308C24.6176 7.68361 24.6176 8.31677 24.2271 8.7073L17.8631 15.0713C17.4726 15.4618 16.8394 15.4618 16.4489 15.0713C16.0584 14.6807 16.0584 14.0476 16.4489 13.657L21.1058 9.00019H0.47998V7.00019H21.1058L16.4489 2.34334C16.0584 1.95281 16.0584 1.31965 16.4489 0.929124C16.8394 0.538599 17.4726 0.538599 17.8631 0.929124Z" fill="#753BBD" />
            </svg>
          </span>
        </a>
      </div>
    </div>
  );
};



export default SubscriptionCards;
