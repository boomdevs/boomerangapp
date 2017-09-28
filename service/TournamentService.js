var express = require('express');
var app = express();
var fs = require("fs");
import('./postg.js');


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

   //I am typing.
   //Me too

   var json = JSON.stringify(data);
   fs.writeFile("tournament.json",json, 'utf8',function(err,json){
       console.log("writing...");
       console.log(json);
   })

});

app.get('/getAllTournaments',function(req, res){
    fs.readFile("tournament.json", 'utf8', function(err, data){
        var json = JSON.parse(data);
       console.log(json);
       res.end(data);
    });


app.get('/makeNewTournament',function(req, res){

    fs.readFile("tournament.json", 'utf8', function(err,data){

        console.log(data);
    });

       console.log("poked.");
       res.status(200).send("Poked.");

    });
})

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

app.get('/poke',function(req, res){
    console.log('poking db...');

    helper.getConn();

    });

var server = app.listen(8080, function(){
    var host = process.env.IP;
    var port = process.env.PORT;

    //var host = "0.0.0.0";
    //var port = 8080;

    console.log("Listening at http://%s:%s", host, port);

})
