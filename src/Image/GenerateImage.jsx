import React, { useState } from "react";
import ImageGenerator from "./ImageGenerator";
import UserImages from "./UserImages";

const GenerateImage = () => {
 
  return (
    <>
      <ImageGenerator />

      <UserImages />
    </>
  );
};

export default GenerateImage;

// import React, { useState,useContext } from "react";
// import axios from "axios";
// import { UserContext } from "../context/UserContext";
// import "./UserImages.css"
// const GenerateImage = () => {
//   const [prompt, setPrompt] = useState("");
//   const [imageUrl, setImageUrl] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const { user } = useContext(UserContext);

//   const [images, setImages] = useState([]);
//   const [loading1, setLoading1] = useState(false);
//   const [error, setError] = useState("");
//   const [selectedFormats, setSelectedFormats] = useState(
//     images?.reduce((acc, _, index) => ({ ...acc, [index]: "png" }), {})
//   );

//   const handleFormatChange = (index, format) => {
//     setSelectedFormats((prev) => ({ ...prev, [index]: format }));
//   };

//   const handleDownload = (img, index) => {
//     const format = selectedFormats[index]; // Get selected format
//     const link = document.createElement("a");
//     link.href = img.link;
//     link.download = `generated_image_${index}.${format}`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const fetchImages = async () => {
//     setLoading1(true);
//     setError("");
//     try {
//       const response = await axios.get(`http://localhost:3000/image/images?googleId=${user?.googleId}`);
//       console.log(response.data);
//       setImages(response.data.images);
//     } catch (err) {
//       setError("Failed to fetch images. Please try again.");
//     }
//     setLoading1(false);
//   };

//   const handleGenerateImage = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.post("http://localhost:3000/image/generate-image", {
//         userId: user?.googleId, // Replace with actual user ID
//         prompt,
//       });

//       if (res.data.success) {
//         setImageUrl(res.data.imageUrl);
//       } else {
//         alert("Failed to generate image");
//       }
//     } catch (err) {
//       console.error("Error generating image:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//     <div className="container">
//   <h1 className="heading">Generate AI Image</h1>
//   <div className="input-container">
//     <input
//       type="text"
//       className="prompt-input"
//       placeholder="Enter prompt..."
//       value={prompt}
//       onChange={(e) => setPrompt(e.target.value)}
//     />
//     <button className="generate-btn" onClick={handleGenerateImage} disabled={loading}>
//       {loading ? "Generating..." : "Generate Image"}
//     </button>
//   </div>
   
//    {imageUrl && (
//         <div className="generated-image-container">
         
//           <img src={imageUrl} alt="Generated" className="generated-image" />
//         </div>
//       )}
// </div>

//     <div className="user-images-container">
//       <button className="fetch-btn" onClick={fetchImages} disabled={loading}>
//         {loading1 ? "Loading..." : "See all Images"}
//       </button>

//       {error && <p className="error-text">{error}</p>}

//       <div className="images-grid">
//         {images?.length > 0 ? (
//           images?.map((img, index) => (
//             <div key={index} className="image-card">
//               <img src={img.link} alt={`Generated ${index}`} />
//               <p className="image-prompt">{img.prompt}</p>
//               <p className="image-date">
//     Generated on: {new Date(img.createdAt).toLocaleString()}
//   </p>
//    {/* Format Selection Dropdown (Default: PNG) */}
//    <select
//             className="format-select"
//             value={selectedFormats[index]}
//             onChange={(e) => handleFormatChange(index, e.target.value)}
//           >
//             <option value="png">PNG</option>
//             <option value="jpg">JPG</option>
//             <option value="jpeg">JPEG</option>
//             <option value="webp">WEBP</option>
//           </select>

//           {/* Download Button */}
//           <button className="download-btn" onClick={() => handleDownload(img, index)}>
//             Download
//           </button>
//             </div>
//           ))
//         ) : (
//           !loading1 && <p className="no-images"></p>
//         )}
//       </div>
//     </div>
//     </>
    
//   );
// };

// export default GenerateImage;
