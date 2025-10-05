import React from "react";
import MessageBox from "./MessageBox";
import ChatscreenNavbar from "./ChatscreenNavbar";
import MessageDisplay from "./MessageDisplay";
import VideoScreen from "./VideoScreen";

export default function Chatscreen() {
  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header with Report Button */}
      <ChatscreenNavbar />

      {/* Main Video Area */}
      <div >
    <VideoScreen/>
      </div>

    

      {/* MessageBox Component */}
      <MessageBox />
    </div>
  );
}
