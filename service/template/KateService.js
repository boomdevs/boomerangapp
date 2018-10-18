/*
An Express.js based ReST service to handle CRUD operations (template).

C Devers 3 OCT 2018
*/

var express = require('express'); //we use the express service library to create our service.
var app = express();  //This creates the reference to our express.js app.
var fs = require("fs");  //a library to use the local filesystem.  Useful for getting configuration files.
var helper = require('./KateSQL.js').gresHelper;  //this is our own homebrewed postgres helper.  This should reference the service helper for this particular service.
const https = require("https"); //Secure HTTP library.
var bodyParser = require('body-parser');
var config = require('config');  //we use this library for standard configuration.
var cors = require('cors');  //Cross Origin Request Sharing library.  Useful for securely allowing calls from the UI if it hosted in another domain.

app.use(bodyParser.json());
app.use(cors());

/*
This constant retrieves and stores the key and cert used for encryption.
*/
const options = {
	key: fs.readFileSync(config.Keystore.key),
	cert: fs.readFileSync(config.Keystore.cert)
}

/*
This operation serves get requests on the endpoint.
*/
app.get('/person',function(req, res, next){
    
    if(req.query.id){
        var result = helper.getAduder(req.query.id).then(function(data){
            output(data);
        });
    }else{
        console.log("No person id provided.")
        res.end("Nope.");
    }
    
    function output(data){
        res.end(JSON.stringify(data));
    }
})


/*
This operation allows for persisting data to the endpoint.
*/
app.post('/person',function(req, res){

    var input = req.body;
    
    console.log(input);
    
    if(input.person_id){
        helper.changeAduder(input).then(function(data){
           console.log("Updating person with ID = " + input.person_id);
    	var result = data.rows[0];
           res.end(JSON.stringify(result));
        }).catch(function(err){
            console.log("error caught!");
            console.log(err);
        });
    }else{
        helper.createAduder(input).then(function(data){
           console.log("Inserted new person with ID = " + JSON.stringify(data.rows[0].person_id));
    	var result = data.rows[0].person_id;
           res.end(JSON.stringify(result));
        });
    }
});

/*
This method declares and runs the actual service loop.
*/

var server = https.createServer(options, app).listen(3000, function(){
    //var host = process.env.IP;
    //var port = process.env.PORT;

    var host = "0.0.0.0";
    var port = 3000;

    console.log("Listening at http://%s:%s", host, port);

})
