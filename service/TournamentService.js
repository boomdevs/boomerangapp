/*
An Express.js based ReST service to handle CRUD operations for tournament information.

C Devers 5 SEP 2018
*/

var express = require('express'); //we use the express service library to create our service.
var app = express();  //This creates the reference to our express.js app.
var fs = require("fs");  //a library to use the local filesystem.  Useful for getting configuration files.
var helper = require('./postg.js').gresHelper;  //this is our own homebrewed postgres helper.
const https = require("https"); //Secure HTTP library.
var bodyParser = require('body-parser');
var config = require('config');  //we use this library for standard configuration.
var cors = require('cors');  //Cross Origin Request Sharing library.  Useful for securely allowing calls from the UI if it hosted in another domain.

app.use(bodyParser.json());
app.use(cors());

const options = {
	key: fs.readFileSync(config.Keystore.key),
	cert: fs.readFileSync(config.Keystore.cert)
}

/*
This operation serves get requests on the tournament endpoint.  It provides the
ability to get/read tournament information from the database.  A simple call
will result in a list of tournaments.  Given a tournament id, it will return 
the details of a tournament.
*/
app.get('/tournaments',function(req, res, next){
    
    
    if(req.query.id){
	console.log("Getting tournament id = " + req.query.id);
        var result = helper.getTournament(req.query.id).then(function(data){
            output(data);
        });
    }else{
	console.log("Getting all tournaments.");
        var result = helper.getTournaments().then(function(data){
            output(data);
        });
    }
    
    function output(data){
        //outputing to the console...  AWS... 
        console.log("controller got = " + JSON.stringify(data));
        
        //output to HTTP response... goes to web client.
        res.end(JSON.stringify(data));
    }
    
})


/*
This operation allows for persisting tournament data.  Given no id, it expects
to insert/create a new tournament.  Given an id, it tries to update an existing
tournament.
*/
app.post('/tournaments',function(req, res){

    var input = req.body;
    
    console.log(input);
    
    if(input.tournament_id){
        helper.changeTournament(input).then(function(data){
           console.log("Updating tournament with ID = " + input.tournament_id);
    	var result = data.rows[0];
           res.end(JSON.stringify(result));
        }).catch(function(err){
            console.log("error caught!");
            console.log(err);
        });
    }else{
        helper.createTournament(input).then(function(data){
           console.log("Inserted new tournament with ID = " + JSON.stringify(data.rows[0].tournament_id));
    	var result = data.rows[0].tournament_id;
           res.end(JSON.stringify(result));
        });
    }
});

var server = https.createServer(options, app).listen(3000, function(){
    //var host = process.env.IP;
    //var port = process.env.PORT;

    var host = "0.0.0.0";
    var port = 3000;

    console.log("Listening at http://%s:%s", host, port);

})
