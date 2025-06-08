

// module.exports = router;
const express = require('express');
const pool = require('../db');  // Import database connection pool

const router = express.Router();

// Create a new booking
router.post('/create', async (req, res) => {
  const { roomid, userid, fromdate, todate, totaldays, totalamount, transactionid, status } = req.body;

  // Query to insert a new booking into the database
  try {
    const [result] = await pool.query(
      `INSERT INTO Bookings (roomid, userid, fromdate, todate, totaldays, totalamount, transactionid, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [roomid, userid, fromdate, todate, totaldays, totalamount, transactionid, status]
    );
    res.status(201).json({ booking_id: result.insertId });
  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const [bookings] = await pool.query('SELECT * FROM Bookings');
    res.status(200).json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Get booking by booking_id
router.get('/:booking_id', async (req, res) => {
  const { booking_id } = req.params;
  try {
    const [booking] = await pool.query('SELECT * FROM Bookings WHERE booking_id = ?', [booking_id]);
    if (booking.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(200).json(booking[0]);
  } catch (err) {
    console.error('Error fetching booking:', err);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

// Update booking status
router.put('/:booking_id', async (req, res) => {
  const { booking_id } = req.params;
  const { status } = req.body;

  try {
    const [result] = await pool.query('UPDATE Bookings SET status = ? WHERE booking_id = ?', [status, booking_id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(200).json({ message: 'Booking status updated' });
  } catch (err) {
    console.error('Error updating booking status:', err);
    res.status(500).json({ error: 'Failed to update booking status' });
  }
});

// Delete a booking
router.delete('/:booking_id', async (req, res) => {
  const { booking_id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM Bookings WHERE booking_id = ?', [booking_id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(200).json({ message: 'Booking deleted' });
  } catch (err) {
    console.error('Error deleting booking:', err);
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

module.exports = router;

