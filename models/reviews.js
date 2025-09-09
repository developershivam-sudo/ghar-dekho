const mongoose = require("mongoose");
const {Schema} = require("mongoose");

// Define schema for Review
const reviewSchema = Schema({
    comment: String, // Review comment
    rating: {
        type: Number,
        min: 1, // Minimum rating value
        max: 5, // Maximum rating value
    },
    createdAt: {
        type: Date,
        default: Date.now(), // Default to current date/time
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
});

module.exports = mongoose.model("Review", reviewSchema);