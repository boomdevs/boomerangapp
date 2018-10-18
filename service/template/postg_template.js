/*
A helper object for persisting data to our postgres instance.

C Devers 3 OCT 2018
*/

var config=require('config');  //we use this library for standard configuration.
const { Pool } =  require('pg') //This is the postgress connection library we use.

/*
This object contains everything we need to persist data.  It has
constants that define common SQL for use against the database, methods for
connection handling, and then methods for the service Express app to 
consume are defined and made available through export.
*/
var gresHelper = (function(){

    //SQL to insert a tournment and get an ID back.  (Insert data sample.)     
    const insertTournament = "insert into tournament(" +
        "location_name," +
        "location_address," +
        "location_city," +
        "location_state," +
        "sanction_request_date," +
        "sanction_approval_date," +
        "tournament_start_date," +
        "registration_time," +
        "event_1_start_time," +
        "rain_date," +
        "rain_date_registration_time," +
        "rain_date_event_1_start_time" +
        ")" +
        "values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)" +
        "RETURNING tournament_id"

    //SQL for updating an existing tournment given its ID. (Update data sample.)
    const updateThing = "update public.tournament set " +
        "location_name = $1," +
        "location_address = $2," +
        "location_city = $3," +
        "location_state = $4," +
        "sanction_request_date = $5," +
        "sanction_approval_date = $6," +
        "tournament_start_date = $7," +
        "registration_time = $8," +
        "event_1_start_time = $9," +
        "rain_date = $10," +
        "rain_date_registration_time = $11," +
        "rain_date_event_1_start_time = $12" +
        "where tournament_id = $13;"

    /*
    Declare the connection pool that will manage subsequent connections used
    by this helper
    */
    const pool = new Pool({
            user: config.Database.user,
            host: config.Database.host,
            database: config.Database.database,
            password: config.Database.password,
            port: config.Database.port,
        })
    
    //Get a list of things with sql inserted here.
    var getStuff = async function(){

        return await pool.query("SELECT something, somethingElse FROM public.tableName");

    }
    
    //Get a single thing given its ID.
    var getAthing = async function(id){
                return await pool.query("SELECT tournament_id,"+
                                       "location_name,"+
                                       "location_address,"+
                                       "location_city,"+
                                       "location_state,"+
                                       "sanction_request_date,"+
                                       "sanction_approval_date,"+
                                       "tournament_start_date,"+
                                       "registration_time,"+
                                       "event_1_start_time,"+
                                       "rain_date,"+
                                       "rain_date_registration_time,"+
                                       "rain_date_event_1_start_time FROM public.tournament where tournament_id = $1", [id]);
    }
    
    //Insert a new thing.  (Used as an example)
    var createAthing = async function(input){
        var now = new Date();
        var values = [input.location_name, input.location_address, input.location_city, input.location_state, now, now, input.tournament_start_date, input.registration_start_time, input.event_1_start_time, input.rain_date, input.rain_date_registration_time, input.rain_date_event_1_start_time]
        
        return await pool.query(insertTournament,values)
        
    }
    
    //Change an existing thing given its udpated data and its ID.  (Used as an example)
    var changeAthing = async function(input){
        var now = new Date();

        /*
        Because we're using updating a particular row, we want the transaction
        to be safe from interference from another call to update another
        tournament.  For this, we createa  client from the pool to immediately
        discarded after the transaction is complete.
        */
        const client = await pool.connect()
        var values = [input.location_name, input.location_address, input.location_city, input.location_state, now, now, input.tournament_start_date, input.registration_start_time, input.event_1_start_time, input.rain_date, input.rain_date_registration_time, input.rain_date_event_1_start_time, input.tournament_id]

        client.query(updateThing, values)
          .then(result => console.log(result))
          .catch(e => console.error(e.stack))
          .then(() => client.end())
          .catch(e => console.error("error ending client " + e.stack))

        client.release();
        
        /*
        Since this call is asynchronous, we must return a promise. Here, we
        have a little hack to satisfy this condition.  Tech debt.
        */
        return new Promise(()=> console.log("I'm a Trump promise!")); 
    }
    
    return{
        
    // declare public variables and/or functions.
    
    getStuff: getStuff,
    
    getAthing: getAthing,
    
    createAthing: createAthing,
    
    changeAthing: changeAthing,
    
    }

})();

exports.gresHelper = gresHelper;
