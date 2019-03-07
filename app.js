var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");
var passport = require("passport"),
    LocalStrategy = require("passport-local");

// APP CONFIG
var uriString = "mongodb://jmmmmuu:yuseok123@ds157677.mlab.com:57677/heroku_5ws4pk3r";
mongoose.connect(uriString, {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// MONGOOSE
var Post = require("./models/post"),
    User = require("./models/user");

// ROUTES
var indexRoutes = require("./routes/index"),
    postRoutes = require("./routes/post"),
    bookRoutes = require("./routes/book"),
    runningRoutes = require("./routes/running");

app.get("/", function(req,res) {
    res.redirect("/jmmmmuu/");
});
app.use("/jmmmmuu", indexRoutes);
app.use("/jmmmmuu/post", postRoutes);
app.use("/jmmmmuu/book", bookRoutes);
app.use("/jmmmmuu/running", runningRoutes);

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Welcome to YUSEOK_WOLRD, full of myself!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.listen(process.env.PORT || 5000, function() {
    console.log("server has started");
});
