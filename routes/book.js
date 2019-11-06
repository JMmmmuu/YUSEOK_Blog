var express = require("express"),
    router = express.Router(),
    Book = require("../models/book");

/*********************************************************
 ************************* BOOK **************************
 *********************************************************/
var request = require("request"),
    utf8 = require("utf8");

router.get("/", function(req, res) {
    Book.find({}).sort({updated: -1}).exec(function(err, books) {
        if (err) {
            console.log("Error occured in loading books");
            console.log(err);
        }
        else {
            res.render("books/book", {books: books});
        }
    });
});

router.get("/search", function(req, res) {
    var selected = req.query.selected;
    res.render("books/searchBook", {selected: selected});
});

router.post("/", function(req, res) {
    var newBook = req.body.selected;
    console.log(newBook);
    newBook = JSON.parse(newBook);
    
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
    // var url = "https://openapi.naver.com/v1/search/book.json?query=" + query + "&display=10" + "&d_titl",
    var TTBKEY = "ttbjeff11102240001"
    var url = "http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey="
        + TTBKEY + "&Query=" + query
        + "&SearchTarget=Book&MaxResults=10&start=1&Output=JS&Version=20131101"
        // header = {
        //     "X-Naver-Client-Id": "y80v6xvi7snx2hnMqZ8B",
        //     "X-Naver-Client-Secret": "aLthqKrcRB"
        // };
    // request({url: encodeURI(url), headers: header}, function(err, response, body) {
    request(encodeURI(url), function(err, response, body) {
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
