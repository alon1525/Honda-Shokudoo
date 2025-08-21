const express = require('express');
const router = express.Router();

// Mock database - in real app this would be a database
let reservations = [
  {
    id: 1,
    customerName: 'John Doe',
    phoneNumber: '+1234567890',
    seatingArea: 'bar',
    mealType: 'lunch',
    reservationDate: '2025-01-20',
    partySize: 2
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    phoneNumber: '+0987654321',
    seatingArea: 'table_1',
    mealType: 'dinner',
    reservationDate: '2025-01-20',
    partySize: 4
  }
];

// Seating capacity configuration
const seatingCapacity = {
  bar: { maxCapacity: 5, name: 'Bar' },
  table_1: { maxCapacity: 6, name: 'Table 1' },
  table_2: { maxCapacity: 6, name: 'Table 2' }
};

// Check availability for a specific date and meal
router.get('/availability/:date/:mealType', (req, res) => {
  const { date, mealType } = req.params;
  
  try {
    // Get all reservations for this date and meal
    const dateReservations = reservations.filter(r => 
      r.reservationDate === date && r.mealType === mealType
    );

    // Calculate remaining seats for each area
    const availability = {};
    Object.entries(seatingCapacity).forEach(([area, config]) => {
      const areaReservations = dateReservations.filter(r => r.seatingArea === area);
      const bookedSeats = areaReservations.reduce((sum, r) => sum + r.partySize, 0);
      const remainingSeats = config.maxCapacity - bookedSeats;
      
      availability[area] = {
        name: config.name,
        maxCapacity: config.maxCapacity,
        currentBookings: bookedSeats,
        remainingSeats: Math.max(0, remainingSeats),
        available: remainingSeats > 0
      };
    });

    res.json({
      success: true,
      date,
      mealType,
      availability
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to check availability'
    });
  }
});

// Get available party sizes for a date and meal
router.get('/party-sizes/:date/:mealType', (req, res) => {
  const { date, mealType } = req.params;
  
  try {
    // Get availability first
    const dateReservations = reservations.filter(r => 
      r.reservationDate === date && r.mealType === mealType
    );

    const availability = {};
    Object.entries(seatingCapacity).forEach(([area, config]) => {
      const areaReservations = dateReservations.filter(r => r.seatingArea === area);
      const bookedSeats = areaReservations.reduce((sum, r) => sum + r.partySize, 0);
      const remainingSeats = config.maxCapacity - bookedSeats;
      
      availability[area] = {
        name: config.name,
        maxCapacity: config.maxCapacity,
        currentBookings: bookedSeats,
        remainingSeats: Math.max(0, remainingSeats),
        available: remainingSeats > 0
      };
    });

    // Calculate total available seats
    const totalAvailableSeats = Object.values(availability)
      .filter(area => area.available)
      .reduce((sum, area) => sum + area.remainingSeats, 0);

    // Generate available party sizes
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
    res.status(500).json({
      success: false,
      error: 'Failed to get available party sizes'
    });
  }
});

// Get available seating options for a specific party size
router.get('/seating-options/:date/:mealType/:partySize', (req, res) => {
  const { date, mealType, partySize } = req.params;
  const partySizeNum = parseInt(partySize);
  
  try {
    // Get availability first
    const dateReservations = reservations.filter(r => 
      r.reservationDate === date && r.mealType === mealType
    );

    const availability = {};
    Object.entries(seatingCapacity).forEach(([area, config]) => {
      const areaReservations = dateReservations.filter(r => r.seatingArea === area);
      const bookedSeats = areaReservations.reduce((sum, r) => sum + r.partySize, 0);
      const remainingSeats = config.maxCapacity - bookedSeats;
      
      availability[area] = {
        name: config.name,
        maxCapacity: config.maxCapacity,
        currentBookings: bookedSeats,
        remainingSeats: Math.max(0, remainingSeats),
        available: remainingSeats > 0
      };
    });

    // Filter seating options that can accommodate the party size
    const availableSeating = Object.entries(availability)
      .filter(([area, data]) => data.available && data.remainingSeats >= partySizeNum)
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
    res.status(500).json({
      success: false,
      error: 'Failed to get seating options'
    });
  }
});

// Create a new reservation
router.post('/', (req, res) => {
  const { customerName, phoneNumber, seatingArea, mealType, reservationDate, partySize } = req.body;
  
  try {
    // Validate required fields
    if (!customerName || !phoneNumber || !seatingArea || !mealType || !reservationDate || !partySize) {
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

    if (partySize > areaCapacity.maxCapacity) {
      return res.status(400).json({
        success: false,
        error: `Party size exceeds maximum capacity for ${areaCapacity.name}`
      });
    }

    // Check availability for the specific date, meal, and seating area
    const existingReservations = reservations.filter(r => 
      r.reservationDate === reservationDate && 
      r.mealType === mealType && 
      r.seatingArea === seatingArea
    );

    const bookedSeats = existingReservations.reduce((sum, r) => sum + r.partySize, 0);
    const remainingSeats = areaCapacity.maxCapacity - bookedSeats;

    if (remainingSeats < partySize) {
      return res.status(400).json({
        success: false,
        error: `Not enough seats available in ${areaCapacity.name}`
      });
    }

    // Create new reservation
    const newReservation = {
      id: reservations.length + 1,
      customerName,
      phoneNumber,
      seatingArea,
      mealType,
      reservationDate,
      partySize,
      createdAt: new Date().toISOString()
    };

    reservations.push(newReservation);

    res.status(201).json({
      success: true,
      message: 'Reservation created successfully',
      reservation: newReservation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create reservation'
    });
  }
});

// Get all reservations (for admin purposes)
router.get('/', (req, res) => {
  res.json({
    success: true,
    reservations
  });
});

module.exports = router;
