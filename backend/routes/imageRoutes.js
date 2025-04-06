const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const cloudinary = require('../config/cloudinary');
const User = require("../models/User"); 
const router = express.Router();

router.post("/generate-image", async (req, res) => {
    try {
        const { userId, prompt } = req.body;

        if (!userId || !prompt) {
            return res.status(400).json({ success: false, message: "Missing details" });
        }
        let user = await User.findOne({ googleId: userId });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
           // Check if the user has enough credits
           if (user.credits <= 0) {
            return res.status(400).json({ success: false, message: "Insufficient credits" });
        }
 // Decrease credits by 1
 
       

        const formData = new FormData();
        formData.append("prompt", prompt);

        const response = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            headers: { "x-api-key": process.env.CLIPDROP_API, ...formData.getHeaders() },
            responseType: "arraybuffer",
        });
 
        // cloudinary.uploader.upload_stream({ folder: "generated_images" }, (error, result) => {
        //     if (error) return res.status(500).json({ message: "Cloudinary upload failed" });
        //     res.json({ success: true, imageUrl: result.secure_url });
        // }).end(response.data);

        //  // Store generated image data in user document
        //  user.generatedImages.push({
        //     link: result.secure_url,  // Store image URL
        //     prompt: prompt,           // Store prompt
        //     createdAt: new Date(),    // Store current date
        // });
        // await user.save();

         // Upload to Cloudinary
         cloudinary.uploader.upload_stream({ folder: "generated_images" }, async (error, result) => {
            if (error) {
                return res.status(500).json({ message: "Cloudinary upload failed" });
            }

            // Store generated image data in user document
            user.generatedImages.push({
                link: result.secure_url,  // Store image URL
                prompt: prompt,           // Store prompt
                createdAt: new Date(),    // Store current date
            });

            await user.save(); // Save the updated user document
            user.credits -= 1;
            await user.save();
            res.json({ success: true, imageUrl: result.secure_url });
        }).end(response.data);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
router.get("/images", async (req, res) => {
    try {
        const { googleId } = req.query;
        if (!googleId) {
            return res.status(400).json({ message: "googleId is required" });
        }

        const user = await User.findOne({ googleId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ images: user.generatedImages });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});



module.exports = router;
