var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    Post = require("../models/post"),
    Book = require("../models/book"),
    User = require("../models/user");

// all routes starts with "jmmmmuu/"

// ROOT ROUTE
router.get("/", function(req, res) {
    var recentPosts, recentBooks;
    Post.find({}).sort({date: -1}).limit(3).exec(function(err, posts) {
        if (err) {
            console.log("Error occured in finding posts");
            console.log(err);
        } else {
            recentPosts = posts;

            Book.find({}).sort({updated: -1}).limit(4).exec(function(err2, books) {
                if (err2) {
                    console.log("Error occured in finding books");
                    console.log(err2);
                }
                else {
                    recentBooks = books;
                    res.render("main", {posts:recentPosts, books:recentBooks});
                }
            });
        }
    });
    // res.render("main", {posts, recenPosts});
});

// REGISTER ROUTE
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
        res.redirect("/jmmmmuu/login")
    });
});

// LOGIN ROUTE
router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/jmmmmuu",
        failureRedirect: "/jmmmmuu/login"
    }), function(req, res) {
    }
);

// LOGOUT ROUTE
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/jmmmmuu");
});

// MIDDLEWARE
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/jmmmmuu/login");
};

module.exports = router;
