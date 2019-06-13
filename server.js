
// express server
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
const fs = require("fs");

var MongoClient = require('mongodb').MongoClient;

var currentDate = new Date();
var timestamp = currentDate.getTime();

console.log(timestamp);

//debugging: non-routing
var logger = require('./logger');

// app express
var app = express();

// port environment number
var port = process.env.PORT || 3400;

// mongo values
var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB_NAME;

console.log(mongoHost, mongoPort, mongoUser, mongoPassword, mongoDBName);

// mongo URL

//<<<<<<< HEAD
// var mongoURL =
//     "mongodb://" + mongoUser + ":" + mongoPassword +
//     "@" + mongoHost + ":" + mongoPort + "/" + mongoDBName;
//=======
// mongoURL = 'mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDBName}';
//>>>>>>> 28a4eca3415ec51825277213f06134635c745131

//     console.log("== MONGO URL1:", mongoURL);

var mongoURL = 	'mongodb://cs290_condreab:cs290_condreab@classmongo.engr.oregonstate.edu:27017/cs290_condreab';
var db = null;

// console.log("== MONGO URL2:", mongoURL);

var mongoDBDatabase;

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
    // console.log("== wikiDatabase:", wikiDatabase)
    // res.status(200).render('homePage', wikiDatabase);

    // now we use remote database
    var collection = db.collection('wikiDatabase');
    collection.find({}).sort({ timestamp: -1}).toArray(function(err, wikiDatabase) {
        if (err) {
            res.status(500).send({
                error: "Error fetching wiki database from DB"
            });
        } else {
            console.log("== wikidatabase:", wikiDatabase);
            res.status(200).render('homePage', {wikiDatabase: wikiDatabase});
        }
    })
});

app.get('/test', function (req, res, next) {
    // insert code here
    // res.send("hello world!");
    //res.status(200).render('homePage', wikiDatabase);
    var collection = db.collection('wikiDatabase');
        //check if it exists already
        collection.find({ 'id' : "NOPENOPE" }).toArray(function(err, found) {
            console.log("== FOUND:",found);
            if (found.length > 0) {
                res.status(400).send("Wiki page is already in database!");
            }
        });
});

app.get('/wiki/:title', function (req, res, next) {
    var title = req.params.title.toLowerCase().replace(/ /g,"_");
    // if (wikiDatabase.wikiList[title]) {
    //     res.status(200).render('wikiPage', wikiDatabase.wikiList[title]);
    // }
    // else {
    //     next();
    // }
    var collection = db.collection("wikiDatabase");
    collection.find({ 'id' : title }).toArray(function(err, wikiDatabase) {
        if (err) {
            res.status(500).send({
                error: "Error fetching wiki database from DB"
            });
        } else {
            console.log("== wikidatabase:", wikiDatabase[0]);
            res.status(200).render('wikiPage', wikiDatabase[0]);
        }
    })
})

app.get('/search/:query', function(req, res, next){
	var collection = db.collection('wikiDatabase');
	collection.createIndex( {title : "text"} );
	collection.find( {$text: {$search: req.params.query} } ).toArray(function(err, searchResults) {
			if (err) {
					res.status(500).send({
							error: "Error fetching wiki database from DB"
					});
					console.log("Error fetching wiki database from DB");
			} else {
					console.log("== searchResults:", searchResults);
					res.status(200).send("Successful Search");
			}
	})
	console.log('== got a search request of query:' + req.params.query);
	collection.dropIndexes();
});

/*
app.post('...', function (req, res, next) {...});
*/
function capitalize_Words(str)
{
 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

app.post('/wiki/:title/addWiki', // edit page
    function (req, res, next) {
        //console.log("== Post request body", req.body);
        if (req.body && req.body.title) { // title must be included
            var databaseTitle = req.params.title.toLowerCase().replace(/ /g,"_"); // client sided json data
            console.log("== database form:", databaseTitle);
            var wikiTitle = capitalize_Words(req.body.title);
            console.log("== wiki title form:", wikiTitle);

            var collection = db.collection('wikiDatabase');
            collection.find({ 'id' : databaseTitle }).toArray(function(err, found) {
                console.log("== FOUND:",found);
                if (found.length > 0) {
                    res.status(400).send("Wiki page is already in database!");
                } else {
                    // create the wiki
                    var wiki = {
                    id: databaseTitle,
                    title: wikiTitle,
                    summary: "*Add summary here*",
                    image: "*Add summary here*",
                    sectionData:[
                        {
                            'name': '*Add section name here',
                            'text': '*add seciton text here'
                        },
                        {
                            'name': '*Add section name here',
                            'text': '*add seciton text here'
                        }
                    ],
                    timestamp: currentDate.getTime(),
                    url: "http://localhost:3400/wiki/" + databaseTitle,
                    featured: false
                    };
                    collection.insertOne(wiki,function (err, result) {
                        console.log("== RESULT:",result);
                        if (err) {
                            res.status(500).send({
                            error: "Error inserting wiki into DB"
                            });
                        } else {
                            console.log("== added result:", result);
                            // if (result.matchedCount > 0) {
                                 res.status(200).send("Success");
                            //     console.log("SUCCESSFULLY ADDED WIKI");
                            // }
                            //} else {
                            //  next();
                            //}
                        }
                    });
                }
            });
        } else {
            res.status(400).send("Wiki page must have a title and not exists!");
        }
    }
);

app.post('/wiki/:title/editWiki', // edit page
    function (req, res, next) {
        //console.log("== Post request body", req.body);
        if (req.body && req.body.title) { // title must be included
            var databaseTitle = req.body.title.toLowerCase().replace(/ /g,"_"); // client sided json data
            console.log("== new database form:", databaseTitle);
            var wikiTitle = capitalize_Words(req.body.title);
            console.log("== new wiki title form:", wikiTitle);

            console.log("== ")
            var collection = db.collection('wikiDatabase');
            // create the wiki
            var wiki = {
                id: databaseTitle,
                title: wikiTitle,
                summary: req.body.summary,
                image: req.body.image,
                timestamp: currentDate.getTime(),
                url: "http://localhost:3400/wiki/" + databaseTitle,
                featured: false
            };

            collection.updateOne({id: req.params.title}, {$set: wiki}, function (err, result) {
                if (err) {
                    res.status(500).send({
                    error: "Error updating wiki in DB"
                    });
                } else {
                    console.log("== added result:", result);
                    //if (result.matchedCount > 0) {
                    res.status(200).send("Success");
                    //} else {
                    //  next();
                    //}
                }
            });
        } else {
            res.status(400).send("Wiki page must have a title and not exists!");
        }
    }
);

app.post('/wiki/:title/addSection', // edit page
    function (req, res, next) {
        //console.log("== Post request body", req.body);
        if (req.body && req.body.name && req.body.text) { // title must be included
            var databaseTitle = req.params.title.toLowerCase().replace(/ /g,"_"); // client sided json data
            console.log("== database form:", databaseTitle);

            var collection = db.collection('wikiDatabase');
//<<<<<<< HEAD
            // check if it exists already
            // var found = collection.find({ 'id' : databaseTitle });
            // console.log("== FOUND:",found);
            // if (found) {
            //     res.status(400).send("Wiki page is already in database!");
            // } else {
                    // create the wiki
                var wiki = {
                    id: databaseTitle,
                    title: wikiTitle,
                    summary: req.body.summary,
                    image: req.body.image,
                    sectionData: req.body.sectionData,
                    timestamp: currentDate.getTime(),
                    url: "http://localhost:3400/wiki/" + databaseTitle,
                    featured: false
                };
                collection.updateMany({id: databaseTitle}, wiki, function (err, result) {
                    if (err) {
                        res.status(500).send({
                        error: "Error updating wiki in DB"
                        });
                    } else {
                        console.log("== added result:", result);
                        //if (result.matchedCount > 0) {
                        res.status(200).send("Success");
                        //} else {
                        //  next();
                        //}
                    }
                });
            // }
//=======
            var section = {
                name: req.body.name,
                text: req.body.text
            };

            collection.updateOne({id: databaseTitle}, { $push: {sectionData: section}}, function (err, result) {
                if (err) {
                    res.status(500).send({
                    error: "Error adding section in DB"
                    });
                } else {
                    console.log("== added result:", result);
                    //if (result.matchedCount > 0) {
                    res.status(200).send("Success");
                    //} else {
                    //  next();
                    //}
                }
            });
            // }
//>>>>>>> 28a4eca3415ec51825277213f06134635c745131
        } else {
            res.status(400).send("Wiki page must have a title and not exists!");
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

  MongoClient.connect(mongoURL, function (err, client) {
    if (err) {
      throw err;
    }
    db = client.db(mongoDBName);
    app.listen(3400, function () {
      console.log("== Server listening on port 3400");
    });
  });


// app.listen(port, function () {
//     console.log("== Server started and is listening on port", port);
// });
