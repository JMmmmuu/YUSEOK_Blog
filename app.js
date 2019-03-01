var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");

// APP CONFIG
var uriString = process.env.MONGOLAB_URI ||
                process.env.MONGOHQ_URL ||
                "mongodb://localhost/yuseok_blog";
mongoose.connect(uriString, {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

app.get("/", function(req, res) {
    res.render("main");
});

// MONGOOSE
var postSchema = new mongoose.Schema({
    title: String,
    titleImage: String,
    content: String,
    date: {type: Date, default: Date.now}
});
var Post = mongoose.model("Post", postSchema);









app.listen(process.env.PORT || 5000, function() {
    console.log("server has started");
});
