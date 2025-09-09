const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const userControllers = require("../controllers/userControllers.js");
const {saveRedirectUrl} = require("../utils/middlewares.js");

// SignUp Route
router 
    .route("/signup")
    .get(wrapAsync(userControllers.renderSignUpForm))   // display signup form
    .post(
        saveRedirectUrl,
        wrapAsync(userControllers.signUp)   // SignUp Route - add new user to DB
    );

// Login Route
router
    .route("/login")
    .get(wrapAsync(userControllers.renderLoginForm))    // display login form
    .post(
        saveRedirectUrl,
        passport.authenticate(
            "local", {
            failureRedirect: "/login",
            failureFlash: true,
        }),
        wrapAsync(userControllers.login)    // Login Route - verify user and login to website
    );

// Logout Route - ends the current session / deserializeUser
router.get(
    "/logout", 
    wrapAsync(userControllers.logout)
);

module.exports = router;