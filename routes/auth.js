const express = require("express");
const passport = require("passport");

const router = express.Router();

// Google Login
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

// Google Callback
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login"
    }),
    (req, res) => {
        res.redirect("/dashboard");
    }
);

module.exports = router;