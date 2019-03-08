var express = require("express"),
    router = express.Router(),
    Book = require("../models/book");

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
    res.render("books/searchBook", {selected: selected});
});

router.post("/", function(req, res) {
    var newBook = req.body.selected;
    console.log(stringify(newBook));
    
    Book.create(newBook, function(err, addedBook) {
        if (err) {
            console.log("error occured in selecting new book");
            console.log(err);
        }
        else {
            res.redirect("/jmmmmuu/book");
        }
    });
});

router.get("/results", function(req, res) {
    //var query = utf8.encode(req.query.searchedBook);
    var query = req.query.searchedBook;
    var url = "https://openapi.naver.com/v1/search/book.json?query=" + query + "&display=10" + "&d_titl",
        header = {
            "X-Naver-Client-Id": "y80v6xvi7snx2hnMqZ8B",
            "X-Naver-Client-Secret": "aLthqKrcRB"
        };
    request({url: encodeURI(url), headers: header}, function(err, response, body) {
        if (err) {
            console.log("error occured searching book");
            console.log(err);
        }
        else {
            var data = JSON.parse(body);
            res.render("books/bookResults", {data: data});
        }
    });
});

module.exports = router;
