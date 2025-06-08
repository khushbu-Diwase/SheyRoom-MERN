// const express=require("express");
// const app=express();
// const pool=require("./db");
// const roomsRoute=require('./routes/roomsRoute');
// const usersRoute=require('./routes/usersRoute');




// app.use(express.json());

// app.get('/', (req, res) => { res.send('Welcome to the Hotel Booking System API'); });
// app.use('/api/rooms',roomsRoute)
// app.use('/api/user',usersRoute)
// const port=process.env.PORT||5000;
// app.listen(port, async () => {
//     try {
//         const connection = await pool.getConnection();
//         console.log('Connected to MySQL!');
//         connection.release(); // Release the connection back to the pool
//     } catch (error) {
//         console.error('Error connecting to MySQL:', error);
//     }
//     console.log(`Node server started on port ${port}`);
// });






// const express = require("express");
// const app  = express();
// var cors = require('cors')
// // const roomsRoute = require("./routes/roomsRoute")
// // const usersRoute = require("./routes/usersRoute")
// const bookingsRoute = require("./routes/bookingsRoute")

// app.use(cors());
// app.options('*', cors());
// app.use(express.json())  //this is necessary to be added other wise roomid will not be fetched to body


// // app.use("/api/rooms",roomsRoute)
// // app.use("/api/users",usersRoute)
// app.use("/api/bookings",bookingsRoute)


// const dbConfig = require('./db');

// // const port  = 5050;
// // app.listen(port, 
// //    () => console.log(`The server is running ${port}`)
// //     )
// const port = 5050;

// app.listen(port, (err) => {
//   if (err) {
//     console.error("Error starting the server:", err);
//   } else {
//     console.log(`The server is running on port ${port}`);
//   }
// });







// const express = require("express");
// const app = express();
// var cors = require("cors");
// const bookingsRoutes = require('./routes/bookingsRoutes'); // Corrected file name

// // CORS Setup to handle cross-origin requests
// app.use(cors());
// app.options("*", cors());

// // Middleware to parse JSON request bodies (important for receiving JSON data)
// app.use(express.json());

// // Routes Setup
// app.use("/api/bookings", bookingsRoutes); // Ensure the booking routes are correctly mapped

// // Start the server and connect to the MySQL database
// const dbConfig = require('./db');  // MySQL connection configuration

// // Define port
// const port = 6000;

// // Start the Express server
// app.listen(port, (err) => {
//   if (err) {
//     console.error("Error starting the server:", err);  // Logs any error during server start
//   } else {
//     console.log(`The server is running on port ${port}`);  // Logs when the server is successfully running
//   }
// });

const express = require('express');
const cors = require('cors');
const roomsRoute=require('./routes/roomsRoute');
// const usersRoute=require('./routes/usersRoute');
// const bookingsRoutes = require('./routes/bookingsRoutes');  

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/rooms',roomsRoute)
// app.use('/api/user',usersRoute)
// app.use('/api/bookings', bookingsRoutes); 

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
