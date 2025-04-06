const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require("cors");
const passport = require('passport');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const imageRoutes = require('./routes/imageRoutes');
require('./config/passportConfig');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: 'http://localhost:5174', credentials: true }));

// app.use(session({
//     secret: process.env.SESSION_SECRET || "secret",
//     resave: false,
//     saveUninitialized: true,
// }));
app.use(
    session({
        secret: process.env.SESSION_SECRET || "supersecretkey", // Use a secure secret
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI, // Your MongoDB connection string
            ttl: 15 * 24 * 60 * 60 // 15 days (TTL in seconds)
        }),
        cookie: {
            maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
            httpOnly: true, // Prevents XSS attacks
            secure: process.env.NODE_ENV === "production", // Secure only in production
            sameSite: "lax"
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

connectDB();

app.use(authRoutes);
app.use('/payment', paymentRoutes);
app.use('/image', imageRoutes);

app.listen(3000, () => {
    console.log("Server Running on port 3000");
});
