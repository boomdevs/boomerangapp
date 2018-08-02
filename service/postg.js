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
        pool.connect((err, client, done) =>{
            const shouldAbort = (err) => {
                if (err) {
                    console.error('Error in transaction', err.stack)
                    client.query('ROLLBACK', (err) => {
                        if (err) {
                        console.error('Error rolling back client', err.stack)
                        }
                        // release the client back to the pool
                        done()
                    })
                }
            return !!err
            }

            var values = [input.location_city, input.location_state, input.tournament_id]
  
            client.query(updateTournament, values, (err, res) => {
               if (shouldAbort(err)) return
               
               client.query('COMMIT', (err) => {
                   if (err) {
                       console.error('Error committing transaction on update tournament.', err.stack)
                   }
                   done()
               })
               
            });
  
        })

        return true
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
