const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js")

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: { 
    url: String, // URL of the image stored in Cloudinary
    filename: String, // Filename of the image in Cloudinary
  },
  price: Number,
  location: String,
  country: String,
  reviews:[
    {
    type: Schema.Types.ObjectId,
    ref:"Review"
  }
],
owner: {
  type: Schema.Types.ObjectId,
  ref: "User",
},
geometry: {
    type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
    },
    coordinates: {
        type: [Number], // [longitude, latitude]
        required: true
    }
  }
});
listingSchema.post("findOneAndDelete", async (listing) => {  
  if (listing) {  
      await Review.deleteMany({ _id: { $in: listing.reviews } });  //wheen you delete a list their review shoudl be deleted
  }  
}); 

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
// image: {  
//     filename: { type: String, required: true }, // Store the filename  
//     url: { type: String, required: true },      // Store the URL separately  
// }