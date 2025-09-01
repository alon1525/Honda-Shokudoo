const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Seating capacity configuration with party size restrictions
const seatingCapacity = {
  bar: { maxCapacity: 5, name: 'Bar', minPartySize: 1, maxPartySize: 3 },
  table_1: { maxCapacity: 6, name: 'Table 1', minPartySize: 3, maxPartySize: 6 },
  table_2: { maxCapacity: 6, name: 'Table 2', minPartySize: 3, maxPartySize: 6 }
};

// Check availability for a specific date and meal
router.get('/availability/:date/:mealType', async (req, res) => {
  const { date, mealType } = req.params;
  
  try {
    // Get all reservations for this date and meal from database
    const query = `
      SELECT seating_type, party_size 
      FROM reservations 
      WHERE reservation_date = $1 AND meal_type = $2
    `;
    const result = await pool.query(query, [date, mealType]);
    const dateReservations = result.rows;

    // Calculate remaining seats for each area
    const availability = {};
    Object.entries(seatingCapacity).forEach(([area, config]) => {
      const areaReservations = dateReservations.filter(r => r.seating_type === area);
      const bookedSeats = areaReservations.reduce((sum, r) => sum + parseInt(r.party_size), 0);
      const remainingSeats = config.maxCapacity - bookedSeats;
      
      availability[area] = {
        name: config.name,
        maxCapacity: config.maxCapacity,
        currentBookings: bookedSeats,
        remainingSeats: Math.max(0, remainingSeats),
        available: remainingSeats > 0,
        minPartySize: config.minPartySize,
        maxPartySize: config.maxPartySize
      };
    });

    res.json({
      success: true,
      date,
      mealType,
      availability
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to check availability'
    });
  }
});

// Get available party sizes for a date and meal
router.get('/party-sizes/:date/:mealType', async (req, res) => {
  const { date, mealType } = req.params;
  
  try {
    // Get availability first
    const query = `
      SELECT seating_type, party_size 
      FROM reservations 
      WHERE reservation_date = $1 AND meal_type = $2
    `;
    const result = await pool.query(query, [date, mealType]);
    const dateReservations = result.rows;

    const availability = {};
    Object.entries(seatingCapacity).forEach(([area, config]) => {
      const areaReservations = dateReservations.filter(r => r.seating_type === area);
      const bookedSeats = areaReservations.reduce((sum, r) => sum + parseInt(r.party_size), 0);
      const remainingSeats = config.maxCapacity - bookedSeats;
      
      availability[area] = {
        name: config.name,
        maxCapacity: config.maxCapacity,
        currentBookings: bookedSeats,
        remainingSeats: Math.max(0, remainingSeats),
        available: remainingSeats > 0,
        minPartySize: config.minPartySize,
        maxPartySize: config.maxPartySize
      };
    });

    // Calculate total available seats
    const totalAvailableSeats = Object.values(availability)
      .filter(area => area.available)
      .reduce((sum, area) => sum + area.remainingSeats, 0);

    // Generate available party sizes (1-6)
    const availablePartySizes = [];
    for (let i = 1; i <= Math.min(6, totalAvailableSeats); i++) {
      availablePartySizes.push(i);
    }

    res.json({
      success: true,
      date,
      mealType,
      availablePartySizes,
      totalAvailableSeats
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get available party sizes'
    });
  }
});

// Get available seating options for a specific party size
router.get('/seating-options/:date/:mealType/:partySize', async (req, res) => {
  const { date, mealType, partySize } = req.params;
  const partySizeNum = parseInt(partySize);
  
  try {
    // Get availability first
    const query = `
      SELECT seating_type, party_size 
      FROM reservations 
      WHERE reservation_date = $1 AND meal_type = $2
    `;
    const result = await pool.query(query, [date, mealType]);
    const dateReservations = result.rows;

    const availability = {};
    Object.entries(seatingCapacity).forEach(([area, config]) => {
      const areaReservations = dateReservations.filter(r => r.seating_type === area);
      const bookedSeats = areaReservations.reduce((sum, r) => sum + parseInt(r.party_size), 0);
      const remainingSeats = config.maxCapacity - bookedSeats;
      
      availability[area] = {
        name: config.name,
        maxCapacity: config.maxCapacity,
        currentBookings: bookedSeats,
        remainingSeats: Math.max(0, remainingSeats),
        available: remainingSeats > 0,
        minPartySize: config.minPartySize,
        maxPartySize: config.maxPartySize
      };
    });

    // Filter seating options based on party size rules
    const availableSeating = Object.entries(availability)
      .filter(([area, data]) => {
        // Check if area is available and can accommodate party size
        const canAccommodate = data.available && data.remainingSeats >= partySizeNum;
        
        // Apply party size restrictions
        const meetsPartySizeRules = partySizeNum >= data.minPartySize && partySizeNum <= data.maxPartySize;
        
        return canAccommodate && meetsPartySizeRules;
      })
      .map(([area, data]) => ({
        value: area,
        label: `${data.name} (${data.maxCapacity} seats)`,
        remainingSeats: data.remainingSeats,
        maxCapacity: data.maxCapacity
      }));

    res.json({
      success: true,
      date,
      mealType,
      partySize: partySizeNum,
      availableSeating
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get seating options'
    });
  }
});

// Create a new reservation
router.post('/', async (req, res) => {
  const { customerName, phoneNumber, seatingArea, mealType, reservationDate, partySize, seatNumber } = req.body;
  
  // Debug logging
  console.log('Received reservation request:', {
    customerName,
    phoneNumber,
    seatingArea,
    mealType,
    reservationDate,
    partySize,
    seatNumber
  });
  
  try {
    // Validate required fields
    if (!customerName || !phoneNumber || !seatingArea || !mealType || !reservationDate || !partySize) {
      console.log('Missing fields:', {
        customerName: !!customerName,
        phoneNumber: !!phoneNumber,
        seatingArea: !!seatingArea,
        mealType: !!mealType,
        reservationDate: !!reservationDate,
        partySize: !!partySize
      });
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    // Check if seating area can accommodate party size
    const areaCapacity = seatingCapacity[seatingArea];
    if (!areaCapacity) {
      return res.status(400).json({
        success: false,
        error: 'Invalid seating area'
      });
    }

    // Check party size restrictions
    if (partySize < areaCapacity.minPartySize || partySize > areaCapacity.maxPartySize) {
      return res.status(400).json({
        success: false,
        error: `${areaCapacity.name} can only accommodate parties of ${areaCapacity.minPartySize}-${areaCapacity.maxPartySize} people`
      });
    }

    if (partySize > areaCapacity.maxCapacity) {
      return res.status(400).json({
        success: false,
        error: `Party size exceeds maximum capacity for ${areaCapacity.name}`
      });
    }

    // Check availability for the specific date, meal, and seating area
    const availabilityQuery = `
      SELECT SUM(party_size) as booked_seats
      FROM reservations 
      WHERE reservation_date = $1 AND meal_type = $2 AND seating_type = $3
    `;
    const availabilityResult = await pool.query(availabilityQuery, [reservationDate, mealType, seatingArea]);
    const bookedSeats = parseInt(availabilityResult.rows[0]?.booked_seats || 0);
    const remainingSeats = areaCapacity.maxCapacity - bookedSeats;

    if (remainingSeats < partySize) {
      return res.status(400).json({
        success: false,
        error: `Not enough seats available in ${areaCapacity.name}`
      });
    }

    // Generate a seat number (1-6 for tables, 1-5 for bar)
    const maxSeatNumber = areaCapacity.maxCapacity;
    const seatNumberToUse = seatNumber || Math.floor(Math.random() * maxSeatNumber) + 1;

    // Create new reservation in database - using your exact table schema
    const insertQuery = `
      INSERT INTO reservations (id, customer_name, phone_number, seating_type, meal_type, reservation_date, party_size, seat_number, created_at)
      VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, NOW())
      RETURNING *
    `;
    const insertResult = await pool.query(insertQuery, [
      customerName, 
      phoneNumber, 
      seatingArea, 
      mealType, 
      reservationDate, 
      partySize,
      seatNumberToUse
    ]);

    const newReservation = insertResult.rows[0];

    res.status(201).json({
      success: true,
      message: 'Reservation created successfully',
      reservation: newReservation
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create reservation'
    });
  }
});

// Get all reservations (for admin purposes)
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT * FROM reservations 
      ORDER BY reservation_date DESC, created_at DESC
    `;
    const result = await pool.query(query);
    
    res.json({
      success: true,
      reservations: result.rows
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch reservations'
    });
  }
});

module.exports = router;
