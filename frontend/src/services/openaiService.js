// Chatbot API Service for Honda Shokudo
// This service communicates with the backend chatbot API

import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

class ChatbotService {
  constructor() {
    this.api = axios.create({
      baseURL: BACKEND_URL,
      timeout: 30000, // 30 seconds timeout
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async sendMessage(messages) {
    try {
      const response = await this.api.post('/api/chatbot/chat', {
        messages: messages
      });

      if (response.data.success) {
        return response.data.message;
      } else {
        throw new Error(response.data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chatbot API error:', error);
      
      if (error.response) {
        // Server responded with error status
        throw new Error(error.response.data?.error || 'Server error');
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('No response from server. Please check your connection.');
      } else {
        // Something else happened
        throw new Error(error.message || 'Unknown error occurred');
      }
    }
  }

  // Helper method to format conversation history
  formatMessages(conversationHistory) {
    return conversationHistory.map(msg => ({
      role: msg.role,
      content: msg.content
    }));
  }
}

export default new ChatbotService();
