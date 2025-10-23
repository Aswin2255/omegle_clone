import { useEffect, useRef, useState } from "react";
import Chatscreen from "../components/Chatscreen";
import { useSearchParams } from "react-router-dom";
import usechatStore from "../zustand/store";

function Chatpage() {
  interface MESSAGE {
    user: any;
    message: string;
  }
  const [search, setsearch] = useSearchParams();
  const username = search.get("username");
  const [partner, setPartner] = useState<{
    id: string;
    name: string;
    roomId: string;
  } | null>(null);
  const [allmessages, setAllmessages] = useState<MESSAGE[]>([]);
  const [message, setMessage] = useState<string>("");
  const [lobby, setLobby] = useState<boolean>(false);
  const socketRef = useRef<WebSocket | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const senderVideoRef = useRef<HTMLVideoElement | null>(null);
  const recieverVideoRef = useRef<HTMLVideoElement | null>(null);
  const roomIdRef = useRef<number | null>(null);
  const userRoleRef = useRef<string | null>(null);

  //zustand store
  const {
    allMessages,
    currentMessage,
    audioEnabled,
    videoEnabled,
    recieverAudio,
    recieverVideo,
    
    setAllMessages,
    setCurrentMessage,
    setAudioEnabled,
    setVideoEnabled,
    setRecieverAudio,
    setRecieverVideo,
    setSocketRef,
    setStreamRef,
    setPcRef,
    setSenderVideoRef,
    setRecieverVideoRef,
    setRoomIdRef,
    setUserRoleRef,
  } = usechatStore();

  const setRef = ()=>{
    setSocketRef(socketRef)
    setStreamRef(streamRef);
    setPcRef(pcRef);
    setSenderVideoRef(senderVideoRef);
    setRecieverVideoRef(recieverVideoRef);
    setRoomIdRef(roomIdRef);
    setUserRoleRef(userRoleRef);
  }

  const audioManagement = () => {
    console.log("Audio management");
    const stream = streamRef.current;

    if (stream) {
      // Simply toggle the audio tracks
      stream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled; // This is the key line!
      });

      setAudioEnabled(!audioEnabled);
      const roomId = roomIdRef.current;
      const userRole = userRoleRef.current;
      const previousAudioState = audioEnabled;
      let message = {
        message: previousAudioState ? "audio-disconnected" : "audio-connected",
        roomid: roomId,
        userrole: userRole,
      };
      sendMessage(message);
    }
  };

  const videoManagement = () => {
    console.log("Video management");
    const stream = streamRef.current;

    if (stream) {
      // Simply toggle the video tracks
      stream.getVideoTracks().forEach((track) => {
        track.enabled = !videoEnabled;
      });

      setVideoEnabled(!videoEnabled);
      const roomId = roomIdRef.current;
      const userRole = userRoleRef.current;
      const previousVideoState = videoEnabled;
      let message = {
        message: previousVideoState ? "video-disconnected" : "video-connected",
        roomid: roomId,
        userrole: userRole,
      };
      sendMessage(message);
    }
  };

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

  const messageToServer = (message: string) => {
    let senderDetails = JSON.parse(sessionStorage.getItem("localUser") || "{}");
    let recieverDetails = partner;
    let payload = {
      user: senderDetails,
      reciever: recieverDetails,
      message: "send-message",
      usermessage: message,
      roomId: recieverDetails?.roomId,
    };
    sendMessage(payload);
  };

  const initialWebsocket = async () => {
    //getting the media stream
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    streamRef.current = stream;
    let socket = new WebSocket("ws://localhost:8080");
    socketRef.current = socket;
    const pc = new RTCPeerConnection();
    pcRef.current = pc;
    socket.onopen = () => {
      console.log("Connected to server");
      let userDetails = {
        name: username,
        id: generateRandomId(),
      };
      sessionStorage.setItem("localUser", JSON.stringify(userDetails));

      let message = {
        user: userDetails,
        message: "user-joined",
      };
      sendMessage(message);
    };
    pc.onicecandidate = (event) => {
      let roomId = roomIdRef.current;
      let userRole = userRoleRef.current;
      if (roomId && userRole) {
        socket.send(
          JSON.stringify({
            message: "candidate-created",
            candidate: event.candidate,
            roomId: roomId,
            userRole: userRole,
          })
        );
      }
    };
    pc.ontrack = (event) => {
      // Set the stream directly from the event
      if (recieverVideoRef?.current) {
        if (!recieverVideoRef.current.srcObject) {
          recieverVideoRef.current.srcObject = event.streams[0];
        }

        recieverVideoRef.current
          .play()
          .catch((e) => console.error("Play error:", e));
      }
    };
    pc.oniceconnectionstatechange = () => {
      console.log("Ice connection state changed", pc.iceConnectionState);
      if (pc.iceConnectionState === "connected") {
        console.log("Connected to the internet");
      }
    };
    socket.onmessage = async (event) => {
      const parsedData = tryParseJSON(event.data);
      const message = parsedData.message;
      if (message === "joined-room") {
        setLobby(true);
      } else if (message === "waiting-for-partner") {
        setLobby(true);
      } else if (message === "create-offer") {
        const { roomId } = parsedData;
        const pc = pcRef.current;
        roomIdRef.current = roomId;
        userRoleRef.current = "sender";
        const stream = streamRef.current;
        if (pc && stream) {
          stream.getTracks().forEach((track) => {
            pc.addTrack(track, stream);
          });
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          socket.send(
            JSON.stringify({
              message: "ask-to-create-answer",
              sdp: pc.localDescription,
              roomId: roomId,
            })
          );
        }
      } else if (message === "create-answer") {
        const { sdp, roomId } = parsedData;
        roomIdRef.current = roomId;
        userRoleRef.current = "reciever";
        const pc = pcRef.current;
        const stream = streamRef.current;
        if (pc && stream) {
          pc.setRemoteDescription(sdp);
          stream.getTracks().forEach((track) => {
            pc.addTrack(track, stream);
          });
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          socket.send(
            JSON.stringify({
              message: "answer-created",
              sdp: pc.localDescription,
              roomId: roomId,
            })
          );
        }
      } else if (message === "answer-recieved") {
        const { sdp } = parsedData;
        const pc = pcRef.current;
        if (pc) {
          pc.setRemoteDescription(sdp);
        }
      } else if (message === "add-ice-candidate") {
        const { candidate } = parsedData;
        const pc = pcRef.current;
        if (pc) {
          pc.addIceCandidate(candidate);
        }
      } else if (message === "user-connected") {
        const { roomId } = parsedData;
        const { id, name } = parsedData.partner;
        const partnerDetails = {
          id,
          name,
          roomId,
        };
        setPartner(partnerDetails);
        console.log("User connected", partnerDetails);
      } else if (parsedData.message === "recieve-message") {
        //store the recieved message in allmessages it include the user who sends and the message
        const { user, usermessage } = parsedData;
        const messageDetails = {
          user: user,
          message: usermessage,
        };
        console.log(messageDetails);
        setAllmessages([...allmessages, messageDetails]);
      } else if (message === "partner-audio-disconnected") {
        setRecieverAudio(false);
      } else if (message === "partner-audio-connected") {
        setRecieverAudio(true);
      } else if (message === "partner-video-disconnected") {
        setRecieverVideo(false);
      } else if (message === "partner-video-connected") {
        setRecieverVideo(true);
      }
    };
    socket.onclose = () => {
      console.log("Disconnected from server");
    };
    socket.onerror = (error) => {
      console.log("Error", error);
    };
    if (senderVideoRef?.current) {
      senderVideoRef.current.srcObject = streamRef.current;
      senderVideoRef.current.play();
      senderVideoRef.current.muted = true;
    }
  };
  const sendMessage = (message: any) => {
    const socket = socketRef.current;
    if (socket) {
      socket.send(JSON.stringify(message));
    }
  };
  useEffect(() => {
    setRef();
    initialWebsocket();
    return () => {
      const socket = socketRef.current;
      if (socket) {
        socket.close();
      }
    };
  }, []);

  return (
    <Chatscreen
      partner={partner}
      setPartner={setPartner}
      username={username}
      allmessages={allmessages}
      setAllmessages={setAllmessages}
      message={message}
      setMessage={setMessage}
      messageToServer={messageToServer}
      senderVideoRef={senderVideoRef}
      recieverVideoRef={recieverVideoRef}
      audioManagement={audioManagement}
      videoManagement={videoManagement}
      audioEnabled={audioEnabled}
      videoEnabled={videoEnabled}
      recieverAudio={recieverAudio}
      recieverVideo={recieverVideo}
    />
  );
}

export default Chatpage;
