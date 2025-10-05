import React from 'react'

function Navbar() {
  return (
    <nav className="bg-black/20 backdrop-blur-md border-b border-white/10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-white">
            <span className="text-purple-400">Chat</span>Connect
          </h1>
        </div>
        <div className="flex items-center space-x-4">
        
        </div>
      </div>
    </div>
  </nav>
  )
}

export default Navbar