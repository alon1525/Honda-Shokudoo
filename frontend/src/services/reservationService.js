// Reservation API Service for Honda Shokudo
// This service handles all reservation-related API calls

import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

class ReservationService {
  constructor() {
    this.api = axios.create({
      baseURL: BACKEND_URL,
      timeout: 10000, // 10 seconds timeout
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Get all reservations
  async getReservations() {
    try {
      const response = await this.api.get('/api/reservations');
      return response.data;
    } catch (error) {
      console.error('Error fetching reservations:', error);
      throw this.handleError(error);
    }
  }

  // Create a new reservation
  async createReservation(reservationData) {
    try {
      const response = await this.api.post('/api/reservations', reservationData);
      return response.data;
    } catch (error) {
      console.error('Error creating reservation:', error);
      throw this.handleError(error);
    }
  }

  // Check availability for a specific date and meal
  async checkAvailability(date, mealType) {
    try {
      const response = await this.api.get(`/api/reservations/availability/${date}/${mealType}`);
      return response.data;
    } catch (error) {
      console.error('Error checking availability:', error);
      throw this.handleError(error);
    }
  }

  // Get available party sizes for a date and meal
  async getPartySizes(date, mealType) {
    try {
      const response = await this.api.get(`/api/reservations/party-sizes/${date}/${mealType}`);
      return response.data;
    } catch (error) {
      console.error('Error getting party sizes:', error);
      throw this.handleError(error);
    }
  }

  // Get available seating options for a specific party size
  async getSeatingOptions(date, mealType, partySize) {
    try {
      const response = await this.api.get(`/api/reservations/seating-options/${date}/${mealType}/${partySize}`);
      return response.data;
    } catch (error) {
      console.error('Error getting seating options:', error);
      throw this.handleError(error);
    }
  }

  // Handle API errors
  handleError(error) {
    if (error.response) {
      // Server responded with error status
      const errorMessage = error.response.data?.error || 'Server error';
      return new Error(errorMessage);
    } else if (error.request) {
      // Request was made but no response received
      return new Error('No response from server. Please check your connection.');
    } else {
      // Something else happened
      return new Error(error.message || 'Unknown error occurred');
    }
  }
}

export default new ReservationService();
