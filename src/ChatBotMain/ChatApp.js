import React from 'react';
import ChatSideBar from './ChatSideBar';
import ProfileMenu from './ProfileMenu';
import ChatPanel from './ChatPanel';

function ChatApp() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for Chat History - Light Gray */}
      <div className="w-72 h-full bg-gray-200 border-r border-gray-300">
        <ChatSideBar />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white ">
          {/* Chat Bot Title */}
          <h1 className="text-lg font-medium text-gray-600">GPT - 4.0 pro</h1>

          {/* Profile Menu - White Background */}
          <ProfileMenu />
        </div>

        {/* Chat Panel - Gray Background with No Gap */}
        <div className="flex-1 bg-white overflow-hidden">
          <ChatPanel />
        </div>
      </div>
    </div>
  );
}

export default ChatApp;
