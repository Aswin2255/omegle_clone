import React from "react";
import usechatStore from "../zustand/store";

export default function MessageBox({message,setMessage,username,messageToServer} : any) {
  const {setAllMessages,allMessages} = usechatStore()
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="max-w-4xl mx-auto flex items-center space-x-4">
        {/* Skip Button */}
        <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Skip
        </button>

        {/* Message Input */}
        <div className="flex-1 flex items-center space-x-3">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button onClick={() => {
           setAllMessages([...allMessages, {user: username, message: message,role : "sender"}]);
            messageToServer(message);
            setMessage('');
          }} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Send
            <div className="text-xs text-blue-200 mt-1">Enter</div>
          </button>
        </div>
      </div>
    </div>
  );
}
