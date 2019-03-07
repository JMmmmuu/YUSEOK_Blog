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
var Post = require("./models/post");

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




app.listen(process.env.PORT || 5000, function() {
    console.log("server has started");
});
