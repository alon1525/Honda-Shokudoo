import React from 'react';
import MessageList from './MessageList';
import InputBox from './InputBox';

const ChatWindow = ({ isOpen, messages, onSendMessage, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-6 w-80 h-96 lg:w-96 lg:h-[500px] bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col z-40">
      {/* Header */}
      <div className="bg-primary-600 text-white px-4 py-3 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold">Honda Shokudo Assistant</h3>
            <p className="text-xs text-primary-100">Ask about our menu, hours, location, or reservations</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <MessageList messages={messages} />
      </div>

      {/* Input */}
      <InputBox onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatWindow;
