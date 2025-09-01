import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

class ChatbotService {
  constructor() {
    this.api = axios.create({
      baseURL: BACKEND_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async sendMessage(messages) {
    try {
      const response = await this.api.post('/api/chatbot/chat', { messages });
      
      if (response.data.success) {
        return response.data.message;
      }
      
      throw new Error(response.data.error || 'Failed to get response');
    } catch (error) {
      console.error('Chatbot API error:', error);
      
      if (error.response) {
        throw new Error(error.response.data?.error || 'Server error');
      } else if (error.request) {
        throw new Error('No response from server. Please check your connection.');
      }
      
      throw new Error(error.message || 'Unknown error occurred');
    }
  }

  formatMessages(conversationHistory) {
    return conversationHistory.map(msg => ({
      role: msg.role,
      content: msg.content
    }));
  }
}

export default new ChatbotService();
