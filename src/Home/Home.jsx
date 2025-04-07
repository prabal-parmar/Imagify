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
    <div className="container mx-auto px-4 py-8">
  {/* Greeting Section */}
  <div className="typewriter text-center text-2xl sm:text-3xl md:text-4xl font-semibold mb-6">
    {user ? <h1>Hello, {user.displayName}</h1> : <h1>Welcome!</h1>}
  </div>

  {/* Hero Section */}
  <div className="hero text-center mb-10">
    <h1 className="headline text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
      <span className="block">Dream it, describe it, and let</span>
      <span className="highlight text-indigo-600 text-5xl sm:text-6xl my-2 block">AI</span>
      <span className="block">bring it to life!</span>
    </h1>
    <button
      className="generate-button mt-6 px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 transition rounded-lg text-lg"
      onClick={() => handleClick()}
    >
      Generate Images ✨
    </button>
  </div>

  {/* Image Preview Section */}
  <div className="image-preview">
    <div className="image-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <img src={img1} alt="Generated preview" className="image w-full h-auto rounded-md shadow-md" />
      <img src={img2} alt="Generated preview" className="image w-full h-auto rounded-md shadow-md" />
      <img src={img3} alt="Generated preview" className="image w-full h-auto rounded-md shadow-md" />
      <img src={img4} alt="Generated preview" className="image w-full h-auto rounded-md shadow-md" />
      <img src={img5} alt="Generated preview" className="image w-full h-auto rounded-md shadow-md" />
    </div>
  </div>

  <ToastContainer />
</div>

  );
}

export default App;
