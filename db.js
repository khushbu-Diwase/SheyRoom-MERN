// const mysql=require("mysql2/promise");
// const pool=mysql.createPool({
//     host:"localhost",
//     user:"W3_86770_Rashi",
//     password:"manager",
//     database:"guestgurudb",
//     waitForConnections: true, 
//     connectionLimit: 10, 
//     queueLimit: 0
// });
// (async function testConnection() {
//      try { 
//         const connection = await pool.getConnection(); 
//         console.log('Connected to MySQL!'); 
//         connection.release(); 
//        } catch (err)
//         { 
//         console.error('Error connecting to MySQL:', err); 

//        } })();
//        module.exports = pool;


// const mysql = require("mysql2/promise");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "W3_86770_Rashi", // Update with your actual MySQL user
//   password: "manager", // Update with your actual password
//   database: "guestgurudb", // Update with your actual database name
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// (async function testConnection() {
//   try {
//     const connection = await pool.getConnection();
//     console.log("Connected to MySQL!");
//     connection.release();
//   } catch (err) {
//     console.error("Error connecting to MySQL:", err);
//   }
// })();

// module.exports = pool;













const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "W3_87018_Khushbu", // Update with your actual MySQL user
  password: "manager", // Update with your actual password
  database: "guestgurudb", // Update with your actual database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// const mysql = require('mysql2');

// const connection = mysql.createConnection({
//   host: 'localhost',         // Host address, usually 'localhost' for local MySQL
//   user: 'your_username',     // MySQL username
//   password: 'your_password', // MySQL password
//   database: 'your_database'  // Database name
// });


(async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL!");
    connection.release();
  } catch (err) {
    console.error("Error connecting to MySQL:", err);
  }
})();

module.exports = pool;
