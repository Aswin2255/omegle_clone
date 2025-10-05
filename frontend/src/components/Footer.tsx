import React from 'react'

function Footer() {
  return (
    <footer className="bg-black/20 backdrop-blur-md border-t border-white/10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <h3 className="text-xl font-bold text-white mb-4">
            <span className="text-purple-400">Chat</span>Connect
          </h3>
          <p className="text-gray-400 text-sm max-w-md">
            Connect with strangers worldwide through video and text chat.
            Make new friends, learn about different cultures, and have
            meaningful conversations.
          </p>
        </div>

   

      
      </div>

      <div className="border-t border-white/10 mt-8 pt-8 text-center">
        <p className="text-gray-400 text-sm">
          © 2025 ChatConnect. All rights reserved. | Made with ❤️ for
          connecting people worldwide.
        </p>
      </div>
    </div>
  </footer>
  )
}

export default Footer