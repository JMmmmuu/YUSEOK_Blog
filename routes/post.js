var express = require("express"),
    router = express.Router(),
    Post = require("../models/post");

/*********************************************************
 ************************* POST **************************
 *********************************************************/
router.get("/new", function(req, res) {
    res.render("posts/new");
});

router.get("/", function(req, res) {
    Post.find({}).sort({date: -1}).exec(function(err, posts) {
        if (err) {
            console.log("Error occured while finding posts");
            console.log(err);
        }
        else {
            res.render("posts/post", {posts: posts});
        }
    });
});

router.post("/", function(req, res) {
    //req.body.post.content = req.sanitize(req.body.post.content);
    Post.create(req.body.post, function(err, newPost) {
        if (err) {
            console.log("error in posting");
            console.log(err);
            res.render("posts/new");
        }
        else {
            res.redirect("/jmmmmuu/post");
        }
    });
});

router.get("/:id", function(req, res) {
    Post.findById(req.params.id, function(err, foundPost) {
        if (err) {
            console.log("error occured in loading post/id");
            console.log(err);
        }
        else {
            res.render("posts/show", {post: foundPost});
        }
    });
});

router.get("/:id/edit", function(req, res) {
    Post.findById(req.params.id, function(err, foundPost) {
        if (err) {
            console.log("error occured in editPost page");
            console.log(err);
        }
        else {
            res.render("posts/edit", {post: foundPost});
        }
    });
});

router.put("/:id", function(req, res) {
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

router.delete("/:id", function(req, res) {
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

module.exports = router;
