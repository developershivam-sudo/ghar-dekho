const mongoose = require("mongoose");
const Listing = require("../models/listing");
let { sampleListings: data } = require("./sampleData");
require('dotenv').config();

main().then(() => {
    console.log("DB connected...");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(`${process.env.MONGO_URL}`);
};


const initDB = async () => {
    await Listing.deleteMany({}); // Delete all existing listings
    data = data.map((obj) => ({ 
        ...obj, 
        owner: '68bfdb6590ad9484c34abd57'
    }));
    await Listing.insertMany(data); // Insert sample listings
    console.log("Data initialized"); // Log data initialization
};
initDB();