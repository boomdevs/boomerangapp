var config=require('config');
const { Pool } =  require('pg')

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

const updateTournament = "update public.tournament set " +
        "location_city = $1," +
        "location_state = $2" +
        "where tournament_id = $3"


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
    
    var getTournament = async function(id){
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
    
    var createTournament = async function(input){
        var now = new Date();
        var values = [input.location_name, input.location_address, input.location_city, input.location_state, now, now, input.tournament_start_date, input.registration_start_time, input.event_1_start_time, input.rain_date, input.rain_date_registration_time, input.rain_date_event_1_start_time]
        
        return await pool.query(insertTournament,values)
        
    }
    
    var changeTournament = async function(input){
        
        /*COA1: Change the method to be synchronous.  
            Pro:  Fixes async/promise issue.
            Con:  Synchronous calls are a performance hit.
            
          COA2: Return a generic promise.
            Pro: Allows ansyc operations.
            Con: I don't know how to do it (yet).
        */

        const client = await pool.connect()
//                            .then(()=> console.log('connected'))
//                            .catch(e => console.error('connection error', e.stack))
        var values = [input.location_city, input.location_state, 7]
        client.query(updateTournament, values)
          .then(result => console.log(result))
          .catch(e => console.error(e.stack))
          .then(() => client.end())
          
          
          
/*        client.query('COMMIT', (err) => {
          if (err) {
            console.error('Error committing transaction', err.stack)
          }
        })
*/         
        client.release();
        
/*        
        try {
            var values = [input.location_city, input.location_state, input.tournament_id]
            client.query('BEGIN')
            .then(() => console.log("BEGIN"))
            .catch(() => console.log("BEGIN FAIL"))
            
            client.query(updateTournament, values)
            .then(() => console.log("UPDATE"))
            .catch(() => console.log("UPDATE FAIL"))
            
            client.query('COMMIT;')
            .then(() => console.log("COMMIT"))
            .catch(() => console.log("COMMIT FAIL"))
            console.log("updated for " + input.tournament_id)
        }catch(e){
            client.query('ROLLBACK')
            console.log("Rolling back! " + e.message)
            throw e
        }finally{
            client.release()
        }
*/
        return new Promise(()=> console.log("I'm a Trump promise!")); 
    }
    
    return{
        
    // declare public variables and/or functions.
    
    poolConn: poolConn,
    
    getTournaments: getTournaments,
    
    getTournament: getTournament,
    
    createTournament: createTournament,
    
    changeTournament: changeTournament,
    
    }

})();

exports.gresHelper = gresHelper;
