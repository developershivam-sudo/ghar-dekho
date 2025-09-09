const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const Review = require("./reviews.js");

// Define schema for Listing
const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review", // Reference to Review model
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
});

// Middleware to delete associated reviews when a listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model("Listing", listingSchema); // Create Listing model

module.exports = Listing;