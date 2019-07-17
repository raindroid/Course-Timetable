var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
  MongoClient = require('mongodb').MongoClient,
  uniqId = require('uniqid')
    

var dbUrl = "mongodb://localhost:27017/"
mongoose.connect(dbUrl + 'course', {useNewUrlParser: true});

var profileSchema = new mongoose.Schema({
	id: String,
	data: String,
	ip: String,
	createTime: String
})
var Profile = mongoose.model('profile', profileSchema)

let uid = uniqId.time()
let profile = new Profile({id: uid, data: 'ABD'})
// profile.save((e)=>{
// 	console.log(e);
// });
// Profile.updateOne({id: 'jy6bf41k'}, {id: 'jy6bf41k', data: 'ABCD'}, {upsert: true, setDefaultsOnInsert: true}, e=>console.log(e));
Profile.findOne({id: "jy6cwhci"}, {_id: 0}, (e, p)=>{
	console.log(p);
	
})