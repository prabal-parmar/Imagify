import React, { useContext, useState } from 'react'
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./navbar.css"
function Navbar() {
  const { user, logoutUser } = useContext(UserContext);
  const [onPricing, setOnPricing] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <header className="navbar">

        <img src="/Images/Imagify_logo.svg" alt="" className="logo" onClick={() => navigate("/")} />
        {
          user ?
          (onPricing 
          ? 
          <span style={{ marginInline: "10px", cursor: "pointer", color: "white" }} onClick={() => { setOnPricing(false); navigate("/") }} className="pricing-tag">Home</span>
          :
          user ? <span style={{ marginInline: "10px", cursor: "pointer", color: "white" }} onClick={() => { setOnPricing(true); navigate("/pricing") }} className="pricing-tag">Add Credits</span> : null)
          : null
        }

        {user ? (
          <div>
            <span>Credits: {user.credits}</span>
            <button className="logout" onClick={logoutUser}>Logout</button>
          </div>
        ) : (
          <a className="login-with-google-btn" href={`${import.meta.env.VITE_API_URL}/auth/google`}>Login with Google</a>
        )}

      </header>
    </div>
  )
}

export default Navbar

{/* 

 */}
