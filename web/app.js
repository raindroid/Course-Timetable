//shortcut for saving multiple var declarations in a row
var express 	= require("express"),
	bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose"),
	MongoClient = require('mongodb').MongoClient,
	fs 			= require('fs'),
	https 		= require('https'),
	app 		= express(),
	config		= require('./config.json'),
	cors 		= require('cors'),
	sanitizeMongo	= require('mongo-sanitize')

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
		let courses = []
		docs.forEach((doc)=>{
			courses.push(doc.courseName)
		})
		res.send(courses)
	})
})

let courseFind = (code, limit, type, title, detail) => {
	return new Promise(resolve => {
		MongoClient.connect(dbUrl, {useNewUrlParser: true}, (err, db) => {
			if (err) throw err;
			var dbo = db.db("course");
			dbo.collection("courses").find(
				{courseName: {'$regex': code, $options: 'i'},
				courseType: {'$regex': type, $options: 'i'},
				courseTitle: {'$regex': title, $options: 'i'}})
			.project(detail ? {_id:0} : {courseName: 1, courseTitle: 1, _id:0})
			.limit(limit)
			.toArray((err, result) => {
				if (err) throw err;
				db.close();
				
				resolve(result)	// return values
			});
		}); 
	})
}

// General search
app.get('/api/courses', async (req, res)=>{
	let {code, limit, type, title, detail} = req.query
	if (!code) {
		res.send([])
		return 
	} 
	limit = limit && parseInt(limit) || 0
	code = code && `.*${sanitizeMongo(code).toUpperCase().trim()}.*` || '.*'
	title = title && `.*${sanitizeMongo(title.trim())}.*` || '.*'
	type = type && sanitizeMongo(type.trim()) || '.*'
	detail = detail && true || false

	let courseList = await courseFind(code, limit, type, title, detail)
	console.log(`Search for ${code}, limit=${limit}, type=${type}, title=${title}, showDetail=${detail}, format=${detail ? '{_id:0}' : '{courseName: 1, _id:0}'} resultLength=${courseList.length}, timeStamp=${new Date().toTimeString()}`)
	res.send(courseList)	
})

// 404 page not found
app.get('*', function(req, res){
	res.status(404).send('what???');
});

app.listen(config.development.node_port, config.development.ip, ()=>{
     console.log('Server Started')
})