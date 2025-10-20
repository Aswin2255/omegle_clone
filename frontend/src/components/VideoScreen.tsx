import React from "react";
import MessageDisplay from "./MessageDisplay";

function VideoScreen({
  partner,
  setPartner,
  username,
  allmessages,
  setAllmessages,
  message,
  setMessage,
  senderVideoRef,
  recieverVideoRef,
  audioManagement,
  videoManagement,
  audioEnabled,
  videoEnabled,
}: any) {
  
  return (
    <div className="flex m-5 gap-5 ">
      {/* User Video Area */}
      <div className=" w-1/3 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl aspect-square flex items-center justify-center relative overflow-hidden">
        {senderVideoRef ? (
          <video ref={senderVideoRef} className="w-full h-full object-cover" />
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl font-bold text-gray-600">
                {username.charAt(0)}
              </span>
            </div>
            <div className="w-3 h-3 bg-white rounded-full mx-auto"></div>
          </div>
        )}

        {/* Video Controls Overlay */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <button
            onClick={()=>videoManagement(videoEnabled)}
            className="w-10 h-10 bg-gray-700 hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors"
          >
            {
              videoEnabled ? <>
                 <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
              </> : <>
              <p>No video</p>
              </>
            }
       
         
          </button>
          <button
            onClick={audioManagement}
            className="w-10 h-10 bg-gray-700 hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </button>
        </div>
      </div>
      {recieverVideoRef ? (
        <>
          {/* Stranger Video Area */}
          <div className="w-1/3 bg-gray-800 rounded-2xl aspect-square flex items-center justify-center relative overflow-hidden">
            {recieverVideoRef ? (
              <video
                ref={recieverVideoRef}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl font-bold text-white">
                    {partner.name.charAt(0)}
                  </span>
                </div>
                <div className="w-3 h-3 bg-gray-400 rounded-full mx-auto"></div>
              </div>
            )}

            {/* Video Controls Overlay */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <button className="w-10 h-10 bg-gray-600 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
              <button className="w-10 h-10 bg-gray-600 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>SEARCHING FOR A PARTNER.........</h1>
        </>
      )}

      <div className="w-1/3">
        <MessageDisplay allmessages={allmessages} />
      </div>
    </div>
  );
}

export default VideoScreen;
