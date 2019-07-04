var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
    MongoClient = require('mongodb').MongoClient;
    

var dbUrl = "mongodb://localhost:27017/"

MongoClient.connect(dbUrl, {useNewUrlParser: true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("course");
    dbo.collection("courses").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
});