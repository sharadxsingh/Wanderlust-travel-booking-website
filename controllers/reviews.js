const Listing = require('../models/listing');
const Review = require('../models/review');

module.exports.createReview = async(req,res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review( req.body.review);
    newReview.author = req.user._id; //req.user is the current user
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save(); //to save anything in existing doc we need to save()
    req.flash("success", "new REVIEW created!");
    res.redirect(`/listings/${listing._id}`);
    
  };
module.exports.destroyReview = async (req, res) => {  
      let { id, reviewId } = req.params;  
      
  
      await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });  
      await Review.findById(reviewId); 
      req.flash("success", "REVIEW DELETED!"); 
  
      res.redirect(`/listings/${id}`);  
    };