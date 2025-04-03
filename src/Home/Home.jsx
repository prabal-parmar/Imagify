import React,{useContext} from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { UserContext } from "../context/UserContext";
function App() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const handleClick = () =>{
    if(!user){
      alert("please login to proceed");
      return;
    }
    navigate("/generateImage");
  } 
  return (
    <div className="container">
    
   

      {/* Hero Section */}
      <div className="hero">
        <p className="badge">Best text to image generator ⭐</p>
        <h1 className="headline">
          Turn text to <span className="highlight">image</span>, in seconds.
        </h1>
        <p className="subtext">
          Unleash your creativity with AI. Turn your imagination into visual art in
          seconds—just type, and watch the magic happen.
        </p>
        <button className="generate-button"  onClick={()=>handleClick()}>Generate Images ✨</button>
      </div>

      {/* Image Preview Section */}
      <div className="image-preview">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="image-container">
            <img
              src="https://th.bing.com/th/id/OIP.DNpNhaOZWQG8kWZjGg172QHaE8?w=231&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Generated preview"
              className="image"
            />
          </div>
        ))}
      </div> 
    
    </div>
  );
}

export default App;

/* Add the following CSS to App.css */
