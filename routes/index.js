var express = require("express"),
    router = express.Router(),
    Post = require("../models/post");

// ROUTES
/*
router.get("/", function(req, res) {
    res.redirect("/jmmmmuu");
});*/

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

module.exports = router;
