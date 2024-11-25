import React, { useState } from 'react';
import axios from 'axios';

const ChatPanel = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    if (message.trim() === '') return;

    // Add the user's message to the chat window
    setMessages([...messages, { user: 'User', text: message }]);

    try {
      // Call the backend to get the response from the chatbot
      const response = await axios.post('http://localhost:8080/api/chat/sendMessage', {
        message: message
      });

      // Add the chatbot's response to the chat window
      setMessages([...messages, { user: 'User', text: message }, { user: 'Chatbot', text: response.data.text }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    // Clear the input field
    setMessage('');
  };

  return (
    <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto">
      <div className="flex-1 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`text-sm ${msg.user === 'User' ? 'text-right' : 'text-left'}`}
          >
            <span className="inline-block p-2 bg-blue-600 text-white rounded-lg">
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <input
          className="flex-1 p-2 border rounded-md"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white p-2 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPanel;
