const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    onwner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    adresse : String,
    photos: [String],
    description: String,
    perks: String,
    extraInfo: String,
    checkIn: Number,
    Checkout: Number,
    maxGuests: Number,
});

const PlaceModel = mongoose.model('Place', placeSchema);

module.exports = PlaceModel;