const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const listingControllers = require("../controllers/listingControllers.js");
const { isLoggedIn, isOwner, validateListing } = require("../utils/middlewares.js");
const multer = require('multer');
const { storage } = require("../cloud-config.js");
const upload = multer({ storage });

router
    .route("/")
    .get(wrapAsync(listingControllers.index)) // Index Route - show all listings
    .post(
        isLoggedIn,
        validateListing,
        upload.single('listing[image]'),    // uploads the image to cloudinary using multer
        wrapAsync(listingControllers.createListing) // Create Route - add new listing to DB
    );

// New Route - render form to create listing
router.get(
    "/new",
    isLoggedIn,
    wrapAsync(listingControllers.renderNewForm)
);

router
    .route("/:id")
    .get(wrapAsync(listingControllers.showListing))  // Show Route - show details of a single listing
    .put(
        isLoggedIn,
        isOwner,
        upload.single('listing[image]'),    // uploads the image to cloudinary using multer
        validateListing,
        wrapAsync(listingControllers.updateListing))    // Update Route - update a listing
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingControllers.destroyListing));   // Delete Route - delete a listing

// Edit Route - render edit form for a listing
router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingControllers.renderEditForm)
);

module.exports = router;