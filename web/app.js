//shortcut for saving multiple var declarations in a row
var express 	= require("express"),
	bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose"),
	MongoClient = require('mongodb').MongoClient,
	fs 			= require('fs'),
	https 		= require('https')
	app 		= express()

var dbUrl = "mongodb://localhost:27017/"
mongoose.connect(dbUrl + 'course', {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

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

app.get('/test', (req, res)=>{
	res.render("pages/test")
})

app.get('/api/courses/all', (req, res)=>{
	Course.find({}, {courseName: 1, _id: 0}, (err, docs)=>{
		// console.log(docs)
		let courses = []
		docs.forEach((doc)=>{
			console.log(doc.courseName)
			courses.push(doc.courseName)
		})
		res.send(courses)
	})
})

app.get('/api/courses', (req, res)=>{
	if (!req.query['code']) {
		res.send([])
		return 
	} 

	courseCode = req.query.code.substring(0, 8).toUpperCase()
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

// https.createServer({
// 	key: fs.readFileSync('server.key'),
// 	cert: fs.readFileSync('server.cert')
// }, app).listen(3000, '0.0.0.0', ()=>{
//     console.log('Server Started')
// })

app.listen(3000, '0.0.0.0', ()=>{
     console.log('Server Started')
})