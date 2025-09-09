const express = require("express");
const router = express.Router({mergeParams: true}); // to get :id from /listings/:id/reviews
const wrapAsync = require("../utils/wrapAsync.js");
const reviewControllers = require("../controllers/reviewControllers.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../utils/middlewares.js");

// Create Route - add new review to a listing
router.post(
    "/", 
    isLoggedIn,
    validateReview, 
    wrapAsync(reviewControllers.createReview)
);

// Delete Route - remove a review from a listing
router.delete(
    "/:reviewId", 
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewControllers.destroyReview)
);

module.exports = router;