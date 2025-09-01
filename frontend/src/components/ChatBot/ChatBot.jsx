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

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSendMessage = useCallback(async (message) => {
    const userMessage = { role: 'user', content: message };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const conversationHistory = [...messages, userMessage];
      const response = await chatbotService.sendMessage(
        chatbotService.formatMessages(conversationHistory)
      );

      const assistantMessage = { role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I\'m having trouble connecting right now. Please try again later or contact us directly for assistance.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  return (
    <>
      <ChatButton isOpen={isOpen} onToggle={handleToggle} />
      <ChatWindow
        isOpen={isOpen}
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </>
  );
};

export default ChatBot;
