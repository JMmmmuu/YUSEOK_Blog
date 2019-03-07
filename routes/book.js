var express = require("express"),
    router = express.Router(),
    Post = require("../models/post");

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

router.get("/", function(req, res) {
    var selected = req.query.selected;
    res.render("searchBook", {selected: selected});
});

router.get("/results/", function(req, res) {
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

module.exports = router;
