/*
A helper object for persisting data to our postgres instance.

C Devers 3 OCT 2018
*/

var config=require('config');  //we use this library for standard configuration.
const { Pool } =  require('pg'); //This is the postgress connection library we use.

/*
This object contains everything we need to persist data.  It has
constants that define common SQL for use against the database, methods for
connection handling, and then methods for the service Express app to 
consume are defined and made available through export.
*/
var gresHelper = (function(){

    //SQL to insert a tournment and get an ID back.  (Insert data sample.)     
    const insertPerson = "INSERT INTO public.person(" +
        "first_name," +
        "last_name," +
        "nickname," +
        "usba_member," +
        "competition_level" +
        ")" +
        "VALUES ($1, $2, $3, $4, $5)" +
        "RETURNING person_id;"

    //SQL for updating an existing tournment given its ID. (Update data sample.)
    const updatePerson = "UPDATE public.person SET " +
        "first_name = $1," +
        "last_name = $2," +
        "nickname = $3," +
        "usba_member = $4," +
        "competition_level = $5," +
        "WHERE person_id = $6;"

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
    

    //Get a single thing given its ID.
    var getAduder = async function(id){
                return await pool.query("SELECT person_id,"+
                                        "first_name," +
                                        "last_name," +
                                        "nickname," +
                                        "usba_member," +
                                        "competition_level" +
                                        "FROM public.person where person_id = $1", [id]);
    }
    
    //Insert a new thing.  (Used as an example)
    var createAduder = async function(input){
        var values = [input.first_name, input.last_name, input.nickname, input.usba_member, input.competition_level]
        
        return await pool.query(insertPerson,values)
        
    }
    
    //Change an existing thing given its udpated data and its ID.  (Used as an example)
    var changeAduder = async function(input){

        /*
        Because we're using updating a particular row, we want the transaction
        to be safe from interference from another call to update another
        tournament.  For this, we createa  client from the pool to immediately
        discarded after the transaction is complete.
        */
        const client = await pool.connect()
        var values = [input.first_name, input.last_name, input.nickname, input.usba_member, input.competition_level]

        client.query(updatePerson, values)
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
    
    getAduder: getAduder,
    
    createAduder: createAduder,
    
    changeAduder: changeAduder,
    
    }

})();

exports.gresHelper = gresHelper;
