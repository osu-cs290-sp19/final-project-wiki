
// express server
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
var port = process.env.PORT || 3000;

// static
app.use(express.static('public'));

//debugging: non-routing
var logger = require('./logger');
app.use(logger);

// database
var wikiDatabase = require('./wikiDatabase');

/* 
--- data format ---
It needs to be a key format for URL access
{
    "title": {
        "summary": "",
        "image": "",
        "sectionData": { [
            "name": "",
            "text": "",
            ]
        }
    }
}


*/

//engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// GET, POST, PUT, DELETE

app.get('/', function (req, res, next) {
    // insert code here
    // res.send("hello world!");
    res.status(200).render('homePage');
});

app.get('/test', function (req, res, next) {
    // insert code here
    // res.send("hello world!");
    res.status(200).render('homePage');
});

app.get('/wiki/:title', function (req, res, next) {
    var title = req.params.title.toLowerCase();
    if (wikiDatabase[title]) {
        res.status(200).render('wikiPage', wikiDatabase[title]);
    }
    else {
        next();
    }
})

/*
app.post('/photos', function (req, res, next) {
    //insert code here
})
*/

/*
app.put('/photos', function (req, res, next) {
    //insert code here
})
*/

/*
app.delete('/photos', function (req, res, next) {
    //insert code here
})
*/

app.get("*", function (req, res, next) {
    res.status(404).render('404Page');
  });

  app.listen(port, function (err) {
    if (err) {
      throw err;
    }
    console.log("== Server listening on port", port);
});


// app.listen(port, function () {
//     console.log("== Server started and is listening on port", port);
// });
