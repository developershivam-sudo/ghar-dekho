const { default: dbConnect } = require("../lib/dbConnect.js");
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");

// Create a new review and add it to a listing
module.exports.createReview = async (req, res) => {
    dbConnect();
    let listing = await Listing.findById(req.params.id); // Find listing by ID
    let newReview = new Review(req.body.review); // Create new review from request data

    if (newReview.comment.trim().length < 5) {
        req.flash("error", "Review must have atleast 5 letters!"); // Flash error message for empty or < 5 letter review     
    } else {
        newReview.comment = newReview.comment.trim();
        newReview.author = req.user._id;  // set author of the review
        listing.reviews.push(newReview); // Add review to listing's review arra  
        await newReview.save(); // Save review to database
        await listing.save(); // Save updated listing
        req.flash("success", "New Review Created!"); // Flash success message
    }
    res.redirect(`/listings/${listing._id}`) // Redirect to listing detail page
};

// Delete a review from a listing
module.exports.destroyReview = async (req, res) => {
    dbConnect();
    let { id, reviewId } = req.params; // Get listing and review IDs from params

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); // Remove review reference from listing
    await Review.findByIdAndDelete(reviewId); // Delete review from database
    req.flash("success", "Review Deleted!"); // Flash success message
    res.redirect(`/listings/${id}`); // Redirect to listing detail page
};