var config=require('config');
const { Pool, Client } =  require('pg')

var gresHelper = (function(){
    // declare private variables and/or functions.

    const tournament = "SELECT tournament_id, location_name, location_address, sanction_request_date, sanction_approval_date, " +
       "tournamnet_start_date," +
       "registration_time," +
       "event_1_start_time," +
       "rain_date," +
       "rain_date_registration_time," +
       "rain_date_event_1_start_time" +
       "FROM public.tournament"
       
    const insertTournament = "insert into tournament(" +
	"tournament_id," +
        "location_name," +
        "location_address," +
//        "location_city," +
//        "location_state," +
        "sanction_request_date," +
        "sanction_approval_date," +
        "tournamnet_start_date," +
        "registration_time," +
        "event_1_start_time," +
        "rain_date," +
        "rain_date_registration_time," +
        "rain_date_event_1_start_time" +
        ")" +
        "values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)" +
        "RETURNING tournament_id"

    const pool = new Pool({
            user: config.Database.user,
            host: config.Database.host,
            database: config.Database.database,
            password: config.Database.password,
            port: config.Database.port,
        })
    
    var poolConn = function(){

    
        console.log('Trying to connect...');
    
        pool.query('SELECT event_id,name FROM public.event', (err, res) => {
            console.log(err, res)
            pool.end()
        })
    }

    var getTournaments = async function(){

        return await pool.query("SELECT tournament_id, location_name FROM public.tournament");

    }
    
    var createTournament = async function(input){
        var now = new Date();
        var values = [8, input.location_name, input.location_address, now, now, now, now, now, now, now, now]
        
        return await pool.query(insertTournament,values)
        
    }
    
    return{
        
    // declare public variables and/or functions.
    
    poolConn: poolConn,
    
    getTournaments: getTournaments,
    
    createTournament: createTournament,
    
    }

})();

exports.gresHelper = gresHelper;
