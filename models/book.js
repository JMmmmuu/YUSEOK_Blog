var mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
    title: String,
    link: String,
    author: String,
    pubDate: String,
    cover: String,
    priceStandard: String,
    publisher: String,
    isbn: String,
    description: String,

    updated: { type: Date, default: Date.now },
    reviewTitle: String,
    review: String
});

module.exports = mongoose.model("Book", bookSchema);
