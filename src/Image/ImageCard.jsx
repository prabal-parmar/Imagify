import React, { useState } from "react";

const ImageCard = ({ img, index }) => {
  const [selectedFormat, setSelectedFormat] = useState("png");

  const handleFormatChange = (e) => {
    setSelectedFormat(e.target.value);
  };
  const handleDownload = async (img, index) => {
    try {
   
      const format = selectedFormat || "png"; // Ensure format is valid
    
      const response = await fetch(img.link);
      const blob = await response.blob();
  
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `generated_image_${index}.${format}`; // Correct format usage
  
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };
  
  // const handleDownload = () => {
  //   const link = document.createElement("a");
  //   link.href = img.link;
  //   link.download = `generated_image_${index}.${selectedFormat}`;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };
  // const handleDownload = async (img, index) => {
  //   try {
  //     const response = await fetch(img.link);
  //     const blob = await response.blob(); // Convert image to binary data
  
  //     const url = URL.createObjectURL(blob); // Create a local object URL
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = `generated_image_${index}.${selectedFormat[index]}`; // Use selected format
  
  //     document.body.appendChild(link);
  //     link.click(); // Trigger download
  //     document.body.removeChild(link);
  
  //     URL.revokeObjectURL(url); // Free memory
  //   } catch (error) {
  //     console.error("Error downloading image:", error);
  //   }
  // };
  
  return (
    <div className="image-card">
      <img src={img.link} alt={`Generated ${index}`} />
      <p className="image-prompt">{img.prompt}</p>
      <p className="image-date">Generated on: {new Date(img.createdAt).toLocaleString()}</p>


<div className="image-card-buttons">
<select className="format-select" value={selectedFormat} onChange={handleFormatChange}>
        <option value="png">PNG</option>
        <option value="jpg">JPG</option>
        <option value="jpeg">JPEG</option>
        <option value="webp">WEBP</option>
      </select>

     
      <button className="download-btn" 
    //  onClick={handleDownload}
      onClick={() => handleDownload(img, index)}>
        Download
      </button>
</div>
     
   
    </div>
  );
};

export default ImageCard;
