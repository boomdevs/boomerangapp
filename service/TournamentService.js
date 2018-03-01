var express = require('express');
var app = express();
var fs = require("fs");
var helper = require('./postg.js').gresHelper;
const https = require("https");
var bodyParser = require('body-parser');

var cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const options = {
	key: fs.readFileSync(""),
	cert: fs.readFileSync("")
}

app.get('/generateData',function(req,res){

   var data = {
        tournaments : [

            {
                id : 1,
                name : "Jacques' Memorial Tournament",
                location : "Waterloo, IL"
            },
            {
                id : 2,
                name : "Chris' Wannabe Tournament",
                location : "Cary, NC"
            },
            {
                id : 3,
                name : "It's Not Just Americans",
                location : "Sydney, AU"
            }
        ]
   }

   var json = JSON.stringify(data);
   fs.writeFile("tournament.json",json, 'utf8',function(err,json){
       console.log("writing...");
       console.log(json);
   })

});

app.get('/tournaments',function(req, res, next){
    
    var result = helper.getTournaments().then(function(data){
        
        output(data);
        
    });
    
    function output(data){
        console.log("controller got = " + JSON.stringify(data));
        res.end(JSON.stringify(data));
    }
    
})

app.post('/tournaments',function(req, res){

    var data = req.data();
    
    console.log(data);
    
/*
    var result = helper.createTournament(req.data).then(function(data){
       output(data); 
    });
*/
});


app.post('/addNew', function(req,res){
    
    console.log("Adding...");

    fs.readFile("tournament.json",'utf8', function(err,data){

        var newTournament = {
            id : 4,
            name : "New Tournament",
            location : "Someplace"
        }

        var obj = JSON.parse(data);

        obj.tournaments.push(newTournament);

        var json = JSON.stringify(obj);

        fs.writeFile("tournament.json",json,'utf8',function(err,data){
            console.log("Data written.");
        });

    });

    console.log("added");
    res.status(200).send("Added.");

})

app.post('/poke',function(req, res){

    console.log(req.body);

  console.log('poking db...');

    helper.getTournaments();
    //helper.gresHelper.getEvents();
    res.status(200).send("Poked.");
    });

var server = https.createServer(options, app).listen(3000, function(){
    //var host = process.env.IP;
    //var port = process.env.PORT;

    var host = "0.0.0.0";
    var port = 3000;

    console.log("Listening at http://%s:%s", host, port);

})
