import React, { useState, useEffect,useContext } from "react";
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

  const handlePurchase = async (plan,amount,credits) => {
    if(!user){
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
        <div className="card basic" onClick={() => handlePurchase("basic",prices.basic,credits.basic)}>
          <div className="card-title">Basic Plan</div>
          <div className="card-content">🔹 Generate up to <strong>50 images</strong></div>
          {/* <div className="card-content">📅 <strong>1 Month Validity</strong></div> */}
          <div className="price">₹{prices.basic.toFixed(2)}</div>
          <button className="buy-btn">Get Basic</button>
        </div>

        <div className="card pro" onClick={() => handlePurchase("pro",prices.pro,credits.pro)}>
          <div className="card-title">Pro Plan</div>
          <div className="card-content">🚀 Generate up to <strong>120 images</strong></div>
          {/* <div className="card-content">📅 <strong>3 Months Validity</strong></div> */}
          <div className="price">₹{prices.pro.toFixed(2)}</div>
          <button className="buy-btn">Get Pro</button>
        </div>

        <div className="card premium" onClick={() => handlePurchase("premium",prices.premium,credits.premium)}>
          <div className="card-title">Premium Plan</div>
          <div className="card-content">🌟  Generate up to <strong>200 images</strong></div>
          {/* <div className="card-content">📅 <strong>Lifetime Access</strong></div> */}
          <div className="price">₹{prices.premium.toFixed(2)}</div>
          <button className="buy-btn">Get Premium</button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCards;
