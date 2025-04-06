import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import ImageCard from "./ImageCard";
import "./UserImages.css";

const UserImages = () => {
  const { user } = useContext(UserContext);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openImages, setOpenImages] = useState(false);
  const fetchImages = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/image/images?googleId=${user?.googleId}`);
      setImages(response.data.images);
    } catch (err) {
      setError("Failed to fetch images. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="user-images-container">
      <button className="fetch-btn" onClick={() => {fetchImages(); setOpenImages(!openImages)}} disabled={loading}>
        {loading ? "Loading..." : openImages ? "Hide all Images" : "See all Images"}
      </button>

      {error && <p className="error-text">{error}</p>}
      {openImages 
        ? 
      <div className="images-grid">
        {images.length > 0 ? (
          images.map((img, index) => <ImageCard key={index} img={img} index={index} />)
        ) : (
          !loading && <p className="no-images"></p>
        )}
      </div> 
        : 
      null}
      
    </div>
  );
};

export default UserImages;
