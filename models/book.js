var mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
    title: String,
    link: String,
    image: String,
    author: String,
    price: String,
    discount: String,
    publisher: String,
    pubdate: String,
    isbn: String,
    description: String,

    quotes: [String],
    updated: { type: Date, default: Date.now },
    review: String
});

module.exports = mongoose.model("Book", bookSchema);
