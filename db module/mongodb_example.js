// we create 'users' collection in newdb database
var url = "mongodb://localhost:27017/";
 
// create a client to mongodb
var MongoClient = require('mongodb').MongoClient;
 
// make client connect to mongo service
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    // db pointing to sampledb
	var dbo = db.db("sampledb");
	
    console.log("Switched to "+dbo.databaseName+" database");
    // create 'users' collection in newdb database
    /*dbo.createCollection("students", function(err, result) {
        if (err) throw err;
        console.log("Collection is created!");
        // close the connection to db when you are done with it
        db.close();
    });*/
	
	// document to be inserted
    var doc = { name: "Amit", age: "32" };
    // insert document to 'users' collection using insertOne
    dbo.collection("users").insertOne(doc, function(err, res) {
        if (err) throw err;
        console.log("Document inserted");
        // close the connection to db when you are done with it
        db.close();
    });

});