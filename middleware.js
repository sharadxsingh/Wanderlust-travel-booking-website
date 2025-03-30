const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError");
const { listingSchema,reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be signed in first!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req, res, next) => {  
    // Validate the request body
    const { error } = listingSchema.validate(req.body);  
  
    // If there's a validation error, handle it
    if (error) {  
        let errMsg = error.details.map((el) => el.message).join(", ");  
        throw new ExpressError(400, errMsg);  
    } else {  
        // If validation passes, proceed to the next middleware
        next();  
    }  
  };

  module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body); // Destructure `error`
    if (error) {
      const errMsg = error.details.map((el) => el.message).join(",");
      next(new ExpressError(400, errMsg));
    } else {
      next();
    }
  };
