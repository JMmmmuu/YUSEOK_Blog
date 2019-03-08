var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    Post = require("../models/post"),
    User = require("../models/user");

// all routes starts with "jmmmmuu/"

// root route
router.get("/", function(req, res) {
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

// register route
router.get("/register", function(req, res) {
    res.render("register");
});

router.post("/register", function(req, res) {
    var newUser = new User(req.body.newUser);
    console.log(newUser);

    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log("error occured in regiter route");
            console.log(err);
            return res.render("register");
        }
        res.redirect("/jmmmmuu/")
    });
});

module.exports = router;
