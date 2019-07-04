//shortcut for saving multiple var declarations in a row
var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	MongoClient = require('mongodb').MongoClient;

var dbUrl = "mongodb://localhost:27017/"
mongoose.connect(dbUrl + 'course', {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
	res.render("pages/index.ejs");
});

app.get('/api/course', (req, res)=>{
	if (!req.query['code']) {
		res.send([])
		return 
	} 
	
	courseCode = req.query.code.toUpperCase()
	console.log(`Search for ${courseCode}`)
	
	MongoClient.connect(dbUrl, {useNewUrlParser: true}, function(err, db) {
		if (err) throw err;
		var dbo = db.db("course");
		dbo.collection("courses").find({'courseName': {'$regex': '.*' + courseCode + '.*'}}).toArray(function(err, result) {
		  if (err) throw err;
		  res.send(result);
		  db.close();
		});
	}); 
})

app.listen(3000, 'localhost', ()=>{
    console.log('Server Started')
})