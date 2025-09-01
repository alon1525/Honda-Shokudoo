import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

class ReservationService {
  constructor() {
    this.api = axios.create({
      baseURL: BACKEND_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getReservations() {
    try {
      const response = await this.api.get('/api/reservations');
      return response.data;
    } catch (error) {
      console.error('Error fetching reservations:', error);
      throw this.handleError(error);
    }
  }

  async createReservation(reservationData) {
    try {
      const response = await this.api.post('/api/reservations', reservationData);
      return response.data;
    } catch (error) {
      console.error('Error creating reservation:', error);
      throw this.handleError(error);
    }
  }

  async checkAvailability(date, mealType) {
    try {
      const response = await this.api.get(`/api/reservations/availability/${date}/${mealType}`);
      return response.data;
    } catch (error) {
      console.error('Error checking availability:', error);
      throw this.handleError(error);
    }
  }

  async getPartySizes(date, mealType) {
    try {
      const response = await this.api.get(`/api/reservations/party-sizes/${date}/${mealType}`);
      return response.data;
    } catch (error) {
      console.error('Error getting party sizes:', error);
      throw this.handleError(error);
    }
  }

  async getSeatingOptions(date, mealType, partySize) {
    try {
      const response = await this.api.get(`/api/reservations/seating-options/${date}/${mealType}/${partySize}`);
      return response.data;
    } catch (error) {
      console.error('Error getting seating options:', error);
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      const errorMessage = error.response.data?.error || 'Server error';
      return new Error(errorMessage);
    } else if (error.request) {
      return new Error('No response from server. Please check your connection.');
    }
    
    return new Error(error.message || 'Unknown error occurred');
  }
}

export default new ReservationService();
