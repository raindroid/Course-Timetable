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
	sanitizeMongo	= require('mongo-sanitize'),
	uniqId 		= require('uniqid')

// import config from './config'

var dbUrl = "mongodb://localhost:27017/"
mongoose.connect(dbUrl + 'course', {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
// app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.set("view engine", "ejs");
app.use(cors());
app.use(express.static("public"));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

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

var profileSchema = new mongoose.Schema({
	id: String,
	data: String,
	ip: String,
	createTime: String
})
var Profile = mongoose.model('profile', profileSchema)

app.get("/", (req, res)=>{
	let {profileId} = req.query
	res.render("index", {profileId: profileId});
});

// API test page
app.get('/test', (req, res)=>{
	res.render("pages/test")
})

app.get('/api/couses/updatetime', (req, res)=>{
	MongoClient.connect(dbUrl, {useNewUrlParser: true}, (err, db) => {
		if (err) throw err;
		var dbo = db.db("course");
		dbo.collection("update").find(
			{time: {'$regex': '.*', $options: 'i'}})
		.project({_id:0})
		.limit(1)
		.toArray((err, result) => {
			if (err) throw err;
			db.close();
			
			res.send(result[0])	// return values
		});
	}); 
})

app.get('/api/courses/all', (req, res)=>{
	Course.find({}, {courseName: 1, _id: 0}, (err, docs)=>{
		let courses = []
		docs.forEach((doc)=>{
			courses.push(doc.courseName)
		})
		console.log(`Search for all courses timeStamp=${new Date().toTimeString()}`);
		
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
	var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);
	limit = limit && parseInt(limit) || 0
	code = code && `.*${sanitizeMongo(code).toUpperCase().trim()}.*` || '.*'
	title = title && `.*${sanitizeMongo(title.trim())}.*` || '.*'
	type = type && sanitizeMongo(type.trim()) || '.*'
	detail = detail && true || false

	let courseList = await courseFind(code, limit, type, title, detail)
	console.log(`Search for ${code}, limit=${limit}, type=${type}, title=${title}, showDetail=${detail}, format=${detail ? '{_id:0}' : '{courseName: 1, _id:0}'} resultLength=${courseList.length}, timeStamp=${new Date().toTimeString()} ip=${ip}`)
	res.send(courseList)	
})

app.post('/api/save', (req, res) => {
	let {selectedCourses, selectedMeetings} = req.body
	let profileId = uniqId.time()
	var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);
	 console.log(`Save req received profileId=${profileId} ip=${ip}`);
	
	Profile.updateOne(
		{id: profileId}, 
		{id: profileId, data: JSON.stringify(req.body), ip: ip}, 
		{upsert: true, setDefaultsOnInsert: true}, 
		e=>{
			console.log(profileId);
			res.send({id: profileId})
		});
})

app.get('/api/find', (req, res)=>{
	let {profileId} = req.query
	console.log(req.query);
	
	var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);
	 console.log(`Find req received profileId=${profileId} ip=${ip}`);

	 Profile.findOne(
		{id: profileId}, 
		{_id: 0}, 
		(e, p)=>{
			console.log(p)
			res.send(p)	
		})
})


// 404 page not found
app.get('*', function(req, res){
	res.status(404).send('what???');
});

app.listen(config.development.node_port, config.development.ip, ()=>{
     console.log('Server Started')
})