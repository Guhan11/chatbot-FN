import React from 'react'

const ChatSideBar = () => {
  return (
    <>
        <div className="w-64 h-full bg-gray-900 text-white flex flex-col p-4">
            {/* Header */}
            <h2 className="text-lg font-semibold mb-4">Chat History</h2>

            {/* Chat Items - Vertically Scrollable */}
            <div className="flex flex-col space-y-2 overflow-y-auto">
                <button className="text-left w-full px-3 py-2 bg-gray-800 rounded-md hover:bg-gray-700">
                    Chat #1
                </button>
                <button className="text-left w-full px-3 py-2 bg-gray-800 rounded-md hover:bg-gray-700">
                    Chat #2
                </button>
                <button className="text-left w-full px-3 py-2 bg-gray-800 rounded-md hover:bg-gray-700">
                    Chat #3
                </button>
                {/* Add more buttons as needed */}
            </div>
        </div>
    </>
  )
}

export default ChatSideBar
