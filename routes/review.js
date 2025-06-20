const express = require("express");  
const router = express.Router({mergeParams: true});  //id dont reach to review.js just limit to app.js
const wrapAsync = require("../utils/wrapAsync.js");  
const ExpressError = require("../utils/ExpressError.js");  
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const Review = require("../models/review.js");  
const Listing = require("../models/listing.js");

const reviewController = require("../controllers/reviews.js");


 //REVIEWS
  //POST ROUTE
  router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.createReview));
  //DELETE REVIEW ROUTE
  router.delete(  
    "/:reviewId",  
    isLoggedIn, isReviewAuthor,
    wrapAsync(reviewController.destroyReview)  
  );
  module.exports = router;