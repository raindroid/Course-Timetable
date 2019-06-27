//shortcut for saving multiple var declarations in a row
var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
	res.render("pages/index.ejs");
});

app.listen(3000, 'localhost', ()=>{
    console.log('Server Started')
})