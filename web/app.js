//shortcut for saving multiple var declarations in a row
var express 	= require("express"),
	bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose"),
	MongoClient = require('mongodb').MongoClient,
	fs 			= require('fs'),
	https 		= require('https'),
	app 		= express(),
	config		= require('./config.json'),
	cors 		= require('cors')

// import config from './config'

var dbUrl = "mongodb://localhost:27017/"
mongoose.connect(dbUrl + 'course', {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

var courseSchema = new mongoose.Schema({
	courseName: String,
	courseType: String,
	meetings: [{
		meetingName: String,
		meetingType: String,
		instructors: [String],
		detail: [{
			meetingStartDate: String,
            meetingDay: Number,
            meetingStartTime: String,
            meetingEndTime: String,
            meetingLocation: String,
		}]
	}]
})
var Course = mongoose.model('course', courseSchema)

app.get("/", (req, res)=>{
	res.render("pages/index");
});

// API test page
app.get('/test', (req, res)=>{
	res.render("pages/test")
})

app.get('/api/courses/all', (req, res)=>{
	Course.find({}, {courseName: 1, _id: 0}, (err, docs)=>{
		// console.log(docs)
		let courses = []
		docs.forEach((doc)=>{
			courses.push(doc.courseName)
		})
		res.send(courses)
	})
})

// General search
app.get('/api/courses', (req, res)=>{
	let {code, limit} = req.query
	if (!code) {
		res.send([])
		return 
	} 

	courseCode = code.substring(0, 8).toUpperCase()
	let courseReturn = (courseList) => {
		console.log(`Search for ${courseCode}, limit=${limit}, resultLength=${courseList.length}`)
		res.send(courseList)
	}
	
	MongoClient.connect(dbUrl, {useNewUrlParser: true}, (err, db) => {
		if (err) throw err;
		var dbo = db.db("course");
		if (!limit ) {
			dbo.collection("courses").find({'courseName': {'$regex': '.*' + courseCode + '.*'}}).toArray((err, result) => {
			if (err) throw err;
			courseReturn(result)
			db.close();
			});
		} else {
			dbo.collection("courses").find({'courseName': {'$regex': '.*' + courseCode + '.*'}}).limit(parseInt(limit)).toArray((err, result) => {
			if (err) throw err;
			courseReturn(result)
			db.close();
			});
		}
	}); 
})



// 404 page not found
app.get('*', function(req, res){
	res.status(404).send('what???');
});

app.listen(config.development.node_port, config.development.ip, ()=>{
     console.log('Server Started')
})