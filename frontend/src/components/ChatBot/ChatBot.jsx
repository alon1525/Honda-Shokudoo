import React, { useState, useCallback } from 'react';
import ChatButton from './ChatButton';
import ChatWindow from './ChatWindow';
import chatbotService from '../../services/openaiService';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your Honda Shokudo assistant. I can help you with information about our menu, hours, location, and reservations. How can I assist you today?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = useCallback(async (userMessage) => {
    // Add user message to conversation
    const userMsg = { role: 'user', content: userMessage };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Prepare conversation history for API
      const conversationHistory = [...messages, userMsg];
      
      // Get AI response from backend
      const aiResponse = await chatbotService.sendMessage(
        chatbotService.formatMessages(conversationHistory)
      );

      // Add AI response to conversation
      const assistantMsg = { role: 'assistant', content: aiResponse };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Add error message
      const errorMsg = {
        role: 'assistant',
        content: 'Sorry, I\'m having trouble connecting right now. Please try again later or contact us directly for assistance.'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  return (
    <>
      <ChatButton isOpen={isOpen} onToggle={toggleChat} />
      <ChatWindow
        isOpen={isOpen}
        messages={messages}
        onSendMessage={sendMessage}
        isLoading={isLoading}
      />
    </>
  );
};

export default ChatBot;
