import React, { useEffect, useRef, useState } from 'react'
import Chatscreen from '../components/Chatscreen'
import { useSearchParams } from 'react-router-dom';

function Chatpage() {

  

  interface MESSAGE {
    user: any;
    message: string;
  }
  const socketRef = useRef<WebSocket | null>(null);
  const [search,setsearch] = useSearchParams();
  const username = search.get('username');
  const [partner, setPartner] = useState<{id: string, name: string, roomId: string} | null>(null);
  const [allmessages, setAllmessages] = useState<MESSAGE[]>([]);
  const [message, setMessage] = useState<string>('');

  

  
  const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 10); // Generates a random alphanumeric string
  };
  function tryParseJSON(data: string) {
    try {
      return JSON.parse(data);
    } catch {
      return data; // just return the raw string if it's not JSON
    }
  }

  const messageToServer = (message: string)=>{
    let senderDetails = JSON.parse(sessionStorage.getItem('localUser') || '{}');
    let recieverDetails = partner;
    let payload = {
      user : senderDetails,
      reciever : recieverDetails,
      message : "send-message",
      usermessage : message,
      roomId: recieverDetails?.roomId
    }
    sendMessage(payload);
  }

  const initialWebsocket = ()=>{
     let socket = new WebSocket('ws://localhost:8080');
     socketRef.current = socket; 
    socket.onopen = ()=>{
      console.log('Connected to server');
      let userDetails = {
        name: username,
        id: generateRandomId()
      }
      sessionStorage.setItem('localUser', JSON.stringify(userDetails));
      
      let message = {
        user: userDetails,
        message: 'user-joined'
      }
      sendMessage(message);
    }
    socket.onmessage = (event)=>{
      const parsedData = tryParseJSON(event.data);
      console.log(parsedData)
      if(parsedData.message === 'user-connected'){
        const {roomId} = parsedData;
        const {id,name} = parsedData.partner;
        const partnerDetails = {
          id,
          name,
          roomId
        }
        setPartner(partnerDetails);
        console.log('User connected', partnerDetails);
      }
      if(parsedData.message === 'recieve-message'){
        //store the recieved message in allmessages it include the user who sends and the message
        const {user,usermessage} = parsedData;
        const messageDetails = {
          user : user,
          message : usermessage
        }
        console.log(messageDetails)
        setAllmessages([...allmessages, messageDetails]);
      }
    }
    socket.onclose = ()=>{
      console.log('Disconnected from server');
    }
    socket.onerror = (error)=>{
      console.log('Error', error);
    }
  }
  const sendMessage = (message: any)=>{
    const socket = socketRef.current;
    if(socket){
      socket.send(JSON.stringify(message));
    }
 
   
  }
  useEffect(()=>{
    initialWebsocket();
    return ()=>{
      const socket = socketRef.current;
      if(socket){
        socket.close();
      }
    }
  },[]);
  return (
<Chatscreen partner={partner} setPartner={setPartner} username={username} allmessages={allmessages} setAllmessages={setAllmessages} message={message} setMessage={setMessage} messageToServer={messageToServer} />
  )
}

export default Chatpage