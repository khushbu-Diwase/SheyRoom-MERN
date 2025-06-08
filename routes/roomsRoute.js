const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all rooms
router.get("/getallrooms", async (req, res) => {
    try {
        const [rooms] = await pool.query("SELECT * FROM Rooms");
        res.send(rooms);
    } catch (error) {
        return res.status(400).json({ message: 'something went wrong' });
    }
});

// GET room by ID
// router.post("/getroombyid", async (req, res) => {
//     console.log(req.body);
//     try {
//         const [room] = await pool.query("SELECT * FROM Rooms WHERE roomId = ?", [req.body.roomid]);
//         res.send(room);
//     } catch (error) {
//         return res.status(400).json({ message: error });
//     }
// });


router.post("/getroombyid", async (req, res) => {
     console.log(req.body);
try
 { 
const [rows] = await pool.query("SELECT * FROM Rooms WHERE roomId = ?", [req.body.roomId]); 
if (rows.length === 0) 
{ return res.status(404).json({ message: 'Room not found' }); 
} 
res.send(rows[0]); 
} catch (error) { console.error(error);
 return res.status(500).json({ message: 'Something went wrong' });
}
});









// ADD new room
router.post("/addroom", async (req, res) => 
    { const { name, description, currentBookings, imageUrls, maxCount, phoneNumber, rentPerDay, type } = req.body;
    try {
        const query = `INSERT INTO rooms (name, description, currentBookings, imageUrls, maxCount, phoneNumber, rentPerDay, type)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            const values = [name, description, JSON.stringify(currentBookings), JSON.stringify(imageUrls), maxCount, phoneNumber, rentPerDay, type];

        await pool.query(query, values);
        res.send('New Room Added Successfully');
    } catch (error) {
        return res.status(400).json({ error });
    }
});

module.exports = router;
