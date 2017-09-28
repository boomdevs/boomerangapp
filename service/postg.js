var pg = require('pg');

var GresHelper = (function(){
    // declare private variables and/or functions.


//jdbc:postgresql://34.197.159.40/boom
//user = boom
//pw = boomboom2

    var connString = "boom:boomboom2@postgresql://34.197.159.40/boom"
    var client;


    var getConn = function(connString){
        client = new pg.Client(connString);
        client.connect();
        console.log("connected.")
    }
    
    var getEventsFromDb = function(){
        var query = client.query("SELECT event_id,name FROM public.event");
        
        query.on('row', function(row){
            console.log(row);    
        })

        query.on('end', function(){
            client.end();    
        })

    }
    
    return{
        
    // declare public variables and/or functions.
    
    getConn:getConn,
    
    getEvents:getEventsFromDb,
    
    }

})