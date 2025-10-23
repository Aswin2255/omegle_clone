import React from "react";
import MessageBox from "./MessageBox";
import ChatscreenNavbar from "./ChatscreenNavbar";
import MessageDisplay from "./MessageDisplay";
import VideoScreen from "./VideoScreen";

export default function Chatscreen({partner,setPartner,username,allmessages,setAllmessages,message,setMessage,messageToServer,senderVideoRef,recieverVideoRef,audioManagement,videoManagement,audioEnabled,videoEnabled,recieverAudio,recieverVideo} : any) {
  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header with Report Button */}
      <ChatscreenNavbar  />

      {/* Main Video Area */}
      <div >
    <VideoScreen partner={partner} setPartner={setPartner} username={username} allmessages={allmessages} setAllmessages={setAllmessages} message={message} setMessage={setMessage} audioManagement={audioManagement} videoManagement={videoManagement}/>
      </div>

    

      {/* MessageBox Component */}
      <MessageBox allmessages={allmessages} setAllmessages={setAllmessages} message={message} setMessage={setMessage} username={username} messageToServer={messageToServer} />
    </div>
  );
}
