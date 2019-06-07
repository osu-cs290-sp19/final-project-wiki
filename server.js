
// express server
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
//debugging: non-routing
var logger = require('./logger');

// app express
var app = express();

// port environment number
var port = process.env.PORT || 3400;

// static
app.use(express.static('public'));

app.use(logger);

// parser
app.use(bodyParser.json());

// database
var wikiDatabase = require('./wikiDatabase');

/*
--- data format ---
It needs to be a key format for URL access
{
    "title": {
        "summary": "",
        "image": "",
        "sectionData": [
            {
            "name": "",
            "text": "",
            }
        ]
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
    console.log("== wikiDatabase:", wikiDatabase)
    res.status(200).render('homePage', wikiDatabase);
});

app.get('/test', function (req, res, next) {
    // insert code here
    // res.send("hello world!");
    res.status(200).render('homePage', wikiDatabase);
});

app.get('/wiki/:title', function (req, res, next) {
    var title = req.params.title.toLowerCase().replace(/ /g,"_");
    if (wikiDatabase.wikiList[title]) {
        res.status(200).render('wikiPage', wikiDatabase.wikiList[title]);
    }
    else {
        next();
    }
})


/*
app.post('...', function (req, res, next) {...});
*/
function capitalize_Words(str)
{
 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

app.post('/wiki/:title/addWiki', // edit page
    function (req, res, next) {
        console.log("== Post request body", req.body);
        if (req.body && req.body.title) { // title must be included
            var databaseTitle = req.params.title.toLowerCase().replace(/ /g,"_"); // client sided json data
            console.log("== database form:", databaseTitle);
            var wikiTitle = capitalize_Words(req.body.title);
            console.log("== wiki title form:", wikiTitle);
            if (databaseTitle && !wikiDatabase.wikiList[databaseTitle]) {
                console.log("== storing data on the server...")
                wikiDatabase.wikiList[databaseTitle] = {
                            'title': wikiTitle,
                            'summary': '*Add summary here*',
                            'image': '*Add image here*',
                            'sectionData': [
                                {
                                'name': '*Add section name here',
                                'text': '*add seciton text here'
                                },
                                {
                                    'name': '*Add section name here',
                                    'text': '*add seciton text here'
                                }
                            ]
                };
                wikiDatabase.wikiRecent.push({
                    "title": wikiTitle,
                    "url": "http://localhost:3400/wiki/" + databaseTitle
                });
                console.log("wikipage data successfully stored:", wikiDatabase);

                res.status(200).send("wikipage successfully posted");
                //res.redirect('/wiki/' + databaseTitle); // adding redirection when post is successfully');
            }
            else {
                res.status(400).send("Wiki page must have a title or not exists!");

            }
        }
    }
);


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
