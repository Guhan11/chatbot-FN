import React, { useState } from 'react'
import nilaLogo from '../Images/NILA.png';


const ChatSideBar = () => {
  const [chatHistory, setChatHistory] = useState([
    'Chat 1',
    'Chat 2',
    'Chat 3',
    'Chat 4',
    'Chat 5',
  ]) // Example initial chats

  return (
    <div className="flex flex-col w-full h-full bg-gray-50 text-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 p-5">
        <div className="flex items-center">
          {/* Logo */}
          <img
            src={nilaLogo}
            alt="NILA Logo"
            className="w-8 h-8 rounded-full mr-2"
          />
          {/* Title */}
          <h2 className="text-lg font-medium text-gray-900">NILA</h2>
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {chatHistory.length > 0 ? (
          chatHistory.map((chat, index) => (
            <button
              key={index}
              className="w-full text-left px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-200 transition"
            >
              {chat}
            </button>
          ))
        ) : (
          <p className="text-sm text-gray-500">No chats available.</p>
        )}
      </div>
    </div>
  )
}

export default ChatSideBar
