import React,{useContext} from 'react'
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./navbar.css"
function Navbar() {
  const { user,logoutUser } = useContext(UserContext);
  const navigate = useNavigate(); 
  return (
    <div>
        <header className="navbar">
      
      <img src="/Images/logo.svg" alt="" className="logo"  onClick={()=>navigate("/")}/>
      {/* <h1 className="logo">Imagify</h1> */}
      <span style={{marginInline: "10px", cursor: "pointer"}}  onClick={()=>navigate("/pricing")}>Pricing</span>
    {  user ? (
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {/* <img src={user.photo} alt="User" style={{ width: "40px", borderRadius: "50%" }} /> */}
                    <span>{user.displayName}</span>
                    <span>Credits: {user.credits}</span>
                    <button onClick={logoutUser} style={{ color: "red", textDecoration: "none", background: "none", border: "none", cursor: "pointer" }}>
            Logout
        </button>
                </div>
            ) : (
                <a href={`${import.meta.env.VITE_API_URL}/auth/google`} style={{ color: "blue", textDecoration: "none" }}>Login with Google</a>
            )}
        {/* <button className="login-button">Login</button> */}
     
    </header>
    </div>
  )
}

export default Navbar
