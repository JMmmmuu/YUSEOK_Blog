var express = require("express"),
    router = express.Router(),
    Post = require("../models/post");

/*********************************************************
 ************************ RUNNING ************************
 *********************************************************/
router.get("/", function(req, res) {
    res.render("running");
});

module.exports = router;
