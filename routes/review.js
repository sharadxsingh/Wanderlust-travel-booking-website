const express = require("express");  
const router = express.Router({mergeParams: true});  //id dont reach to review.js just limit to app.js
const wrapAsync = require("../utils/wrapAsync.js");  
const ExpressError = require("../utils/ExpressError.js");  
const { validateReview } = require("../middleware.js");
const Review = require("../models/review.js");  
const Listing = require("../models/listing.js");




 //REVIEWS
  //POST ROUTE
  router.post("/", validateReview, wrapAsync(async(req,res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review( req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save(); //to save anything in existing doc we need to save()
    req.flash("success", "new REVIEW created!");
    res.redirect(`/listings/${listing._id}`);
    
  }));
  //DELETE REVIEW ROUTE
  router.delete(  
    "/:reviewId",  
    wrapAsync(async (req, res) => {  
      let { id, reviewId } = req.params;  
      const trimmedReviewId = reviewId.trim(); //the reviewis had a space hence it cant delete it bson error
  
      await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });  
      await Review.findById(reviewId); 
      req.flash("success", "REVIEW DELETED!"); 
  
      res.redirect(`/listings/${id}`);  
    })  
  );
  module.exports = router;