var mongoose = require('mongoose');

var billetSchema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: Date,
    departureTime: String,
    price: Number,
});

var userSchema =  mongoose.Schema({
    nom:String,
    prenom:String,
    email:String,
    password:String,
    billets:[billetSchema],
});

var userModel = mongoose.model('user',userSchema);

module.exports = userModel;