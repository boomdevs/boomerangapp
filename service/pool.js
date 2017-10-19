const { Client } = require('pg');


const client = new Client({
  user: 'boom',
  host: '34.197.159.40',
  database: 'boom',
  password: 'boomboom2',
  port: 5432,
})
client.connect()

client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})