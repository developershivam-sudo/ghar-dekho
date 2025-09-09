const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const ExpressError = require("./ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");

// authentication for new form through passport
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrlAfterLogin = req.originalUrl;
        req.flash("error", "Please login to proceed");
        return res.redirect("/login");
    }
    next();
};

// post login or signup, save the redirect URL if it exists so that we can redirect the user to the intended page after login/signup
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrlAfterLogin) {
        res.locals.redirectUrlAfterLogin = req.session.redirectUrlAfterLogin;
    }
    next();
};

// to check whether the currentUser is the owner of listing or not
module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currentUser._id)) {
        req.flash("error", "You are not the owner");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

// to check whether the currentUser is the author of review or not
module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author._id.equals(res.locals.currentUser._id)) {
        req.flash("error", "You are not the author");
        return res.redirect(`/listings/${id}`);
    }
    next();
};


// for listing validation
module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body); // Server side validation for listing
    if (error) {
        let errMsg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, errMsg)
    } else {
        next();
    }
};

// for review validation
module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body); // Server side validation for review
    if (error) {
        let errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};