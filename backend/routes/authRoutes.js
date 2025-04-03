const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/auth/google', passport.authenticate("google", { scope: ["profile", "email"] }));

router.get('/auth/google/callback', passport.authenticate("google", { failureRedirect: "http://localhost:5174" }), (req, res) => {
    res.redirect(`http://localhost:5174/generateImage`);
});

router.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ loggedIn: true, user: req.user });
    } else {
        res.json({ loggedIn: false });
    }
});


router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ message: "Logout failed" });

        req.session.destroy((err) => {
            if (err) return res.status(500).json({ message: "Session destruction failed" });

            res.clearCookie('connect.sid', { path: '/' }); // Ensure it matches session settings
            return res.json({ message: "Logged out successfully" });
        });
    });
});

module.exports = router;
