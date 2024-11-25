import React from 'react'
import ChatSideBar from './ChatSideBar'
import ProfileMenu from './ProfileMenu'
import ChatPanel from './ChatPanel'
import { Avatar, IconButton } from '@mui/material';

function ChatApp() {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
            {/* Sidebar for Chat History */}
            <ChatSideBar />

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 bg-white shadow">
                    <h1 className="text-2xl font-semibold text-gray-700">ChatGPT AI</h1>

                    {/* Profile and Logout Icons */}
                    <div className="flex items-center space-x-4">
                        <ProfileMenu />
                        
                    </div>
                </div>

                {/* Chat Panel - Messages Centered and Positioned at the Bottom */}
                <div className="flex-1 flex flex-col justify-end p-6 bg-gray-100 overflow-y-auto">
                    <ChatPanel />
                </div>
            </div>
        </div>
  )
}

export default ChatApp
