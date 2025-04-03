import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import "./UserImages.css";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [imageUrl, setImageUrl] = useState(null);

  const handleGenerateImage = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/image/generate-image`, {
        userId: user?.googleId,
        prompt,
      });

      if (res.data.success) {
        setImageUrl(res.data.imageUrl);
      } else {
        alert("Failed to generate image");
      }
    } catch (err) {
      console.error("Error generating image:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="container">
      <h1 className="heading">Generate AI Image</h1>
      <div className="input-container">
        <input
          type="text"
          className="prompt-input"
          placeholder="Enter prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button className="generate-btn" onClick={handleGenerateImage} disabled={loading}>
          {loading ? "Generating..." : "Generate Image"}
        </button>
      </div>
    </div>
    {loading && (
          <div className="skeleton-loader">
            <p>Generating Image...</p>
          </div>
        )}
          {imageUrl && (
            <div className="generated-image-container">
              <img src={imageUrl} alt="Generated" className="generated-image" />
            </div>
          )}
    </>
    
  );
};

export default ImageGenerator;
