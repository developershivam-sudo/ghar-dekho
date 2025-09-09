const Listing = require("../models/listing.js");
const { cloudinary } = require("../cloud-config.js");
const { default: dbConnect } = require("../lib/dbConnect.js");

// Show all listings
module.exports.index = async (req, res) => {
    dbConnect();
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

// Render form for creating a new listing
module.exports.renderNewForm = async (req, res) => {
    dbConnect();
    res.render("listings/new.ejs");
};

// Create a new listing and save to DB
module.exports.createListing = async (req, res) => {
    dbConnect();
    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;    // set owner of the listing

    const url = req.file.path;
    const filename = req.file.filename;
    newListing.image = { url, filename };   // insert img cloud_url and filename to the listing
    await newListing.save();

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

// Show details of a single listing
module.exports.showListing = async (req, res) => {
    dbConnect();
    const { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            }
        })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Listing Not Found!");
        res.redirect("/listings");
    } else {
        res.render("listings/show.ejs", { listing });
    }
};

// Render edit form for a listing
module.exports.renderEditForm = async (req, res) => {
    dbConnect();
    const { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing Not Found!");
        return res.redirect("/listings");
    };
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250"); // for image preview
    
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// Update a listing
module.exports.updateListing = async (req, res) => {
    dbConnect();
    if (!req.body.listing) {
        throw new ExpressError(400, "Send valid data for listing!");
    }
    const { id } = req.params;
    let listing = await Listing.findById(id);

    // Delete old image from Cloudinary
    if (listing.image && req.file) {
        const oldFilename = listing.image.filename;
        await cloudinary.uploader.destroy(oldFilename); // Delete using public_id (filename)
    };

    // Update listing with new data
    listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });

    // Save new image info (if uploaded)
    if (req.file) {
        const url = req.file.path;
        const filename = req.file.filename;
        listing.image = { url, filename };   // update img cloud_url and filename to the listing
        listing.save()
    };
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

// Delete a listing
module.exports.destroyListing = async (req, res) => {
    dbConnect();
    const { id } = req.params;
    const listing = await Listing.findById(id);

    // Delete image from Cloudinary
    if (listing?.image?.filename) {
        await cloudinary.uploader.destroy(listing.image.filename);
    }
    // Delete the listing from DB
    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};