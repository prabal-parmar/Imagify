 const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        googleId: String,
        displayName: String,
        email: String,
        photo: String,
        credits: { type: Number, default: 3 },
        generatedImages: [
            {
                link: String,          // URL of the generated image
                prompt: String,        // Prompt used to generate the image
                createdAt: { type: Date, default: Date.now } // Date & time of generation
            }
        ]
    },
    { timestamps: true } // Automatically adds createdAt & updatedAt
);

module.exports = mongoose.model("User", userSchema);
