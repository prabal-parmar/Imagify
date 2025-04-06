import React,{useContext} from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { UserContext } from "../context/UserContext";
import img1 from '../assets/img_1.jpeg'
import img2 from '../assets/img_2.jpg'
import img3 from '../assets/img_3.avif'
import img4 from '../assets/img_4.jpg'
import img5 from '../assets/img_5.jpg'
import { Flip, ToastContainer, Zoom, toast } from 'react-toastify';

function App() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const handleClick = () =>{
    if(!user){
      return toast.error("Login to access this feature.", {
        position: "top-center",
        pauseOnHover: false,
        theme:"dark",
        transition:Flip,
        toastId: "success1"
      });
    }
    navigate("/generateImage");
  } 
  return (
    <div className="container">
      <div className="typewriter">
        {user ? <h1>`Hello, {user.displayName}`</h1>: <h1>Welcome!</h1>}
      </div>
      
      {/* Hero Section */}
      <div className="hero">
        {/* <p className="badge">Text to Image Generator ⭐</p> */}
        <h1 className="headline">
          <span className="front-text">Dream it, describe it, and let</span><br /><span className="highlight">AI</span><br /><span className="front-text">bring it to life!</span>
        </h1>
        <button className="generate-button"  onClick={()=>handleClick()}>Generate Images ✨</button>
      </div>

      {/* Image Preview Section */}
      <div className="image-preview">
          <div className="image-container">
            <img src={img1} alt="Generated preview" className="image"/>
            <img src={img2} alt="Generated preview" className="image"/>
            <img src={img3} alt="Generated preview" className="image"/>
            <img src={img4} alt="Generated preview" className="image"/>
            <img src={img5} alt="Generated preview" className="image"/>
          </div>
      </div> 
     <ToastContainer/>
    </div>
  );
}

export default App;

/* Add the following CSS to App.css */
