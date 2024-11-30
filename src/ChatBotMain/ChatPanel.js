import React, { useState } from 'react'
import axios from 'axios'
import apiCalls from '../ApiStructure/ApiCall'

const ChatPanel = () => {
  const [messages, setMessages] = useState([]) // Store all chat messages
  const [message, setMessage] = useState('') // Store the current input message

  const sendMessage = async () => {
    if (message.trim() === '') return // Ignore if the message is empty

    // Temporarily add the user's message to the chat window
    setMessages((prevMessages) => [
      ...prevMessages,
      { user: 'User', text: message },
    ])

    const dataToSend = { message: message } // Prepare data to send to backend

    try {
      // Call the backend to get the chatbot's response
      const response = await apiCalls(
        'post',
        '/chatBot/sendMessage',
        dataToSend
      )

      // Add both the user's message and the chatbot's response to the state
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: 'User', text: message },
        { user: 'Chatbot', text: response.data.text },
      ])
    } catch (error) {
      console.error('Error sending message:', error)
      // You could also add a "failure" message in case of an error
    }

    // Clear the input field after sending the message
    setMessage('')
  }

  return (
    <div className="flex flex-col justify-between h-full text-black  w-full sm:max-w-4xl mx-auto">
      {/* Chat Messages Container */}
      <div className="flex-1  p-10 space-y-6  w-full">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`text-sm ${
              msg.user === 'User' ? 'text-right' : 'text-left'
            }`}
          >
            <span
              className={`inline-block p-3 rounded-lg ${
                msg.user === 'User'
                  ? 'bg-gray-100 text-black border rounded-lg'
                  : 'bg-blue-150 text-black border rounded-lg'
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      {/* Input Area at the Bottom */}
      <div className="flex items-center p-4 ">
        <input
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 text-black"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="ml-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatPanel
