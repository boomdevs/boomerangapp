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

    const pool = new Pool({
            user: '',
            host: '',
            database: '',
            password: '',
            port: 5432,
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
        /*
        pool.query("SELECT tournament_id, location_name FROM public.tournament", (err, res) => {

            console.log(err, res.rows[0]);
            //pool.end()
            result = res;
        })
        */

    }
    
    return{
        
    // declare public variables and/or functions.
    
    poolConn: poolConn,
    
    getTournaments: getTournaments,
    
    }

})();

exports.gresHelper = gresHelper;
