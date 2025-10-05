import React from 'react'

function ChatscreenNavbar() {
  return (
    <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
    <div className="flex items-center space-x-4">
      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      <span className="text-sm font-medium text-gray-700">Connected</span>
    </div>

    <div className="flex items-center space-x-4">
      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
        Report
      </button>

      {/* Theme Toggle */}
      <button className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors">
        <svg
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </button>
    </div>
  </div>
  )
}

export default ChatscreenNavbar