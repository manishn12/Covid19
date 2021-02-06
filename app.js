const express= require('express');
const bodyParser=require('body-parser');
const request = require('request');
const http=require('http');
const ejs = require('ejs');

const app= express();
tCase="";

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public/css"));

app.get("/",function(req,res){

	var options = {
  method: 'GET',
  url: 'https://covid-19-data.p.rapidapi.com/totals',
  qs: {format: 'json'},
  headers: {
    'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
    'x-rapidapi-key': 'b4d254aa0fmsh1a7f6637f5b5d5cp1e26bfjsnff197d19c424',
    useQueryString: true
  }
};

request(options, function (err, response, body) {
	if(err){
		console.log(err)
	}else{
		console.log(body);
		const data = JSON.parse(body);
		var confirmCase= data[0].confirmed;
		var recoverCase = data[0].recovered;
		var deathCase= data[0].deaths;
		var criticalCase =data[0].critical;
		var last_Change = data[0].lastChange;
		var last_update = data[0].lastUpdate;

	}

	// console.log(data.confirmed);



// // var tCase = data.confirmed;
	res.render("covid",{
confirm: confirmCase + "+",
death: deathCase + "+",
critical: criticalCase + "+",
recover: recoverCase + "+",
change: last_Change,
update: last_update

	});
	});
});

app.listen("3000",function(){
	console.log("server is operated at 3000 port");
});
