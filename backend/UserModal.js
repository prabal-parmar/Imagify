const mongoose = require('mongoose');

const GeneratedImageSchema = new mongoose.Schema({
    imageLink: { type: String, required: true },
    prompt: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const UserSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    credits: { type: Number, default: 3 }, // Default credits for each user
    generatedImages: [GeneratedImageSchema] // Array of generated images
});

module.exports = mongoose.model('User', UserSchema);
