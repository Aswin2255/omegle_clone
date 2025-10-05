import React from "react";

export default function MessageDisplay({allmessages} : any) {
  
  return (
    <div className="">
    
      <div className="max-w-4xl mx-auto px-4">
        <div className="space-y-3">
          {/* Sample User Messages */}
          {
            allmessages.map((message: any,index: number)=>{
              return (
                <div key={index}>{message.user}: {message.message}</div>
              )
            })
          }
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-lg max-w-xs">
              <p className="text-sm">Hello! How are you doing today?</p>
              <p className="text-xs text-blue-200 mt-1">2:30 PM</p>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-lg max-w-xs">
              <p className="text-sm">Nice to meet you!</p>
              <p className="text-xs text-blue-200 mt-1">2:31 PM</p>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-lg max-w-xs">
              <p className="text-sm">Where are you from?</p>
              <p className="text-xs text-blue-200 mt-1">2:32 PM</p>
            </div>
          </div>

          {/* Sample Stranger Messages */}
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg max-w-xs">
              <p className="text-sm">
                Hi there! I'm doing great, thanks for asking!
              </p>
              <p className="text-xs text-gray-500 mt-1">2:30 PM</p>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg max-w-xs">
              <p className="text-sm">
                Nice to meet you too! I'm from California
              </p>
              <p className="text-xs text-gray-500 mt-1">2:32 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
