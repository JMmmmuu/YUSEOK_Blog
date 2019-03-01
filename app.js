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

// MONGOOSE
var postSchema = new mongoose.Schema({
    title: String,
    image: String,
    content: String,
    date: {type: Date, default: Date.now}
});
var Post = mongoose.model("Post", postSchema);

// ROUTES
app.get("/", function(req, res) {
    res.redirect("/jmmmmuu");
});

app.get("/jmmmmuu", function(req, res) {
    res.render("main");
});

/*********************************************************
 ************************* POST **************************
 *********************************************************/
app.get("/jmmmmuu/post", function(req, res) {
    Post.find({}, function(err, posts) {
        if (err) {
            console.log("Error occured while finding posts");
            console.log(err);
        }
        else {
            res.render("post", {posts: posts});
        }
    });
});

app.get("/jmmmmuu/post/new", function(req, res) {
    res.render("newPost");
});

app.post("/jmmmmuu/post", function(req, res) {
    req.body.post.content = req.sanitize(req.body.post.content);
    Post.create(req.body.post, function(err, newPost) {
        if (err) {
            console.log("error in posting");
            console.log(err);
            res.render("newPost");
        }
        else {
            res.redirect("/jmmmmuu/post");
        }
    });
});

/*********************************************************
 ************************* BOOK **************************
 *********************************************************/
app.get("/jmmmmuu/book", function(req, res) {
    res.render("book");
});

/*********************************************************
 ************************ RUNNING ************************
 *********************************************************/
app.get("/jmmmmuu/running", function(req, res) {
    res.render("running");
});






app.listen(process.env.PORT || 5000, function() {
    console.log("server has started");
});
