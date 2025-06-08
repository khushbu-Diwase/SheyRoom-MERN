const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const { generateToken, verifyToken } = require("../utils/jwt");


// User Registration
router.post("/register", async (req, res) => {
    const { name, email, password,phone,user_type} = req.body;

    try {
        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed Password:',hashedPassword);
        const query = "INSERT INTO Users (name, email, password,phone) VALUES (?, ?, ?,?)";
        await pool.query(query, [name, email, hashedPassword,phone,user_type]);
        res.send('User Registered successfully');
    }  catch (error) { console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
       }
       });

// User Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const query = "SELECT * FROM Users WHERE email = ?";

    try {
        const [users] = await pool.query(query, [email]);

        if (users.length > 0) {
            const user = users[0];

            // Compare the provided password with the hashed password
            const isMatch = await bcrypt.compare(password, user.password);
            console.log("isMatch"+isMatch);

            if (isMatch) {
                const token = generateToken(user);
                const currentUser = {
                    name: user.name,
                    email: user.email,
                    phone:user.phone,
                    isAdmin: user.user_type === 'admin',
                    id: user.user_id,
                    token: token
                };
                res.send(currentUser);
            } 
            else { return res.status(400).json({ message: 'User Login Failed:Incorrect Password' }); } }
             else { return res.status(400).json({ message: 'User Not found' }); } } 
             catch (error) { console.error(error);
                return res.status(500).json({ message: 'Something went wrong' });
               }
               });

// Get All Users (Protected Route)
router.get("/getallusers", verifyToken, async (req, res) => {
    const query = "SELECT * FROM Users";

    try {
        const [users] = await pool.query(query);
        res.send(users);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

// Delete User (Protected Route)
router.post("/deleteuser", verifyToken, async (req, res) => {
    const userid = req.body.userid;
    const query = "DELETE FROM Users WHERE user_id = ?";

    try {
        await pool.query(query, [userid]);
        res.send('User Deleted Successfully');
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

module.exports = router;
