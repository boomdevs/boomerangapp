const { Pool, Client } =  require('pg')

var gresHelper = (function(){
    // declare private variables and/or functions.


//jdbc:postgresql://X/boom
//user = 
//pw = 

    var poolConn = function(){
        const pool = new Pool({
            user: 'boom',
            host: '34.197.159.40',
            database: 'boom',
            password: 'boomboom2',
            port: 5432,
        })
    
        console.log('Trying to connect...');
    
        pool.query('SELECT NOW()', (err, res) => {
            console.log(err, res)
            pool.end()
        })
    }
    console.log("I started.");
    var connString = "jdbc:postgresql://34.197.159.40:5432/boom"
    var client;

    var getConn = function(){
        console.log(connString);
        client = new pg.Client(connString);
        client.connect();
        console.log("connected.")
        
    client.query('SELECT NOW() as now')
      .then(res => console.log(res.rows[0]))
      .catch(e => console.error(e.stack))
        
    }
    
    var getEventsFromDb = function(){
        var query = client.query("SELECT event_id,name FROM public.event");
        
        query.on('row', function(row){
            console.log(row);    
        });

        query.on('end', function(){
            client.end();    
        });

    }
    
    return{
        
    // declare public variables and/or functions.
    
    poolConn: poolConn,
    
    getConn: getConn,
    
    getEvents:getEventsFromDb,
    
    }

})();

exports.gresHelper = gresHelper;