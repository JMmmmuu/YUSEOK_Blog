var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");

// APP CONFIG
var uriString = "mongodb://jmmmmuu:yuseok123@ds157677.mlab.com:57677/heroku_5ws4pk3r";
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
    Post.find({}).sort({date: -1}).limit(3).exec(function(err, posts) {
        if (err) {
            console.log("Error occured in finding posts");
            console.log(err);
        }
        else {
            res.render("main", {posts, posts});
        }
    });
});

/*********************************************************
 ************************* POST **************************
 *********************************************************/
app.get("/jmmmmuu/post/new", function(req, res) {
    res.render("newPost");
});

app.get("/jmmmmuu/post", function(req, res) {
    Post.find({}).sort({date: -1}).exec(function(err, posts) {
        if (err) {
            console.log("Error occured while finding posts");
            console.log(err);
        }
        else {
            res.render("post", {posts: posts});
        }
    });
});

app.post("/jmmmmuu/post", function(req, res) {
    //req.body.post.content = req.sanitize(req.body.post.content);
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

app.get("/jmmmmuu/post/:id", function(req, res) {
    Post.findById(req.params.id, function(err, foundPost) {
        if (err) {
            console.log("error occured in loading post/id");
            console.log(err);
        }
        else {
            res.render("showPost", {post: foundPost});
        }
    });
});

app.get("/jmmmmuu/post/:id/edit", function(req, res) {
    Post.findById(req.params.id, function(err, foundPost) {
        if (err) {
            console.log("error occured in editPost page");
            console.log(err);
        }
        else {
            res.render("editPost", {post: foundPost});
        }
    });
});

app.put("/jmmmmuu/post/:id", function(req, res) {
    Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost) {
        if (err) {
            console.log("error occured while Updating Post");
            console.log(err);
        }
        else {
            res.redirect("/jmmmmuu/post/" + req.params.id);
        }
    });
});

app.delete("/jmmmmuu/post/:id", function(req, res) {
    Post.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log("error occured in deleting a post");
            console.log(err);
        }
        else {
            res.redirect("/jmmmmuu/post");
        }
    });
});
/*********************************************************
 ************************* BOOK **************************
 *********************************************************/
var request = require("request"),
    utf8 = require("utf8");
/*
app.get("/jmmmmuu/book", function(req, res) {
    res.render("book");
});
*/

app.get("/jmmmmuu/book/", function(req, res) {
    var selected = req.query.selected;
    res.render("searchBook", {selected: selected});
});

app.get("/jmmmmuu/book/results/", function(req, res) {
    var query = utf8.encode(req.query.searchedBook);
    var url = "https://openapi.naver.com/v1/search/book.json?query=" + query + "&display=3",
        header = {
            "X-Naver-Client-Id": "y80v6xvi7snx2hnMqZ8B",
            "X-Naver-Client-Secret": "aLthqKrcRB"
        };
    request({url: url, headers: header}, function(err, response, body) {
        if (err) {
            console.log("error occured searching book");
            console.log(err);
        }
        else {
            var data = JSON.parse(body);
            res.render("bookResults", {data: data});
            console.log(response);
        }
    });
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
