import React, { useRef, useEffect } from 'react';

const MessageList = ({ messages }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getMessageStyle = (role) => {
    const baseClasses = 'max-w-xs lg:max-w-md px-4 py-2 rounded-lg';
    return role === 'user' 
      ? `${baseClasses} bg-primary-600 text-white rounded-br-none`
      : `${baseClasses} bg-gray-100 text-gray-800 rounded-bl-none`;
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div className={getMessageStyle(message.role)}>
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
