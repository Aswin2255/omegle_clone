import type { RefObject } from "react";
import { create } from "zustand";

interface MESSAGE {
    role: "sender" | "reciever";
    user: any;
    message: string;
  }

type State = {
    allMessages : MESSAGE[];
    currentMessage : string;
    audioEnabled : boolean;
    videoEnabled : boolean;
    recieverAudio : boolean;
    recieverVideo : boolean;
    //ref
    socketRef : RefObject<WebSocket | null> | null,
    streamRef : RefObject<MediaStream | null> | null;
    pcRef : RefObject<RTCPeerConnection | null> | null;
    senderVideoRef : RefObject<HTMLVideoElement | null> | null;
    recieverVideoRef : RefObject<HTMLVideoElement | null> | null;
    roomIDRef : RefObject<number | null> | null;
    userRoleRef : RefObject<string | null> | null;
}

type Action = {
    setAllMessages: (messages: MESSAGE[] | ((prev: MESSAGE[]) => MESSAGE[])) => void;
    setCurrentMessage : (message : string) => void;
    setAudioEnabled : (enabled : boolean) => void;
    setVideoEnabled : (enabled : boolean) => void;
    setRecieverAudio : (enabled : boolean) => void;
    setRecieverVideo : (enabled : boolean) => void;
    //seting the ref
    setSocketRef : (ref : RefObject<WebSocket | null>) => void,
    setStreamRef : (ref : RefObject<MediaStream | null>) => void;
    setPcRef : (ref : RefObject<RTCPeerConnection | null>) => void;
    setSenderVideoRef : (ref : RefObject<HTMLVideoElement | null>) => void;
    setRecieverVideoRef : (ref : RefObject<HTMLVideoElement | null>) => void;
    setRoomIdRef : (ref : RefObject<number | null>) => void;
    setUserRoleRef : (ref : RefObject<string | null>) => void;
}

const usechatStore = create<State & Action>((set)=>({
    allMessages : [],
    currentMessage : "",
    audioEnabled : true,
    videoEnabled : true,
    recieverAudio : true,
    recieverVideo : true,
    //ref
    socketRef : null,
    streamRef : null,
    pcRef : null,
    senderVideoRef : null,
    recieverVideoRef : null,
    roomIDRef : null,
    userRoleRef : null,
    setAllMessages: (messages) => 
        set((state) => ({ 
          allMessages: typeof messages === 'function' 
            ? messages(state.allMessages)  // If function, call it with current state
            : messages                      // If array, use it directly
        })),
    setCurrentMessage : (message : string) => set({currentMessage : message}),
    setAudioEnabled : (enabled : boolean) => set({audioEnabled : enabled}),
    setVideoEnabled : (enabled : boolean) => set({videoEnabled : enabled}),
    setRecieverAudio : (enabled : boolean) => set({recieverAudio : enabled}),
    setRecieverVideo : (enabled : boolean) => set({recieverVideo : enabled}),
    //seting the ref
    setSocketRef : (ref : RefObject<WebSocket | null>) => set({socketRef : ref}),
    setStreamRef : (ref : RefObject<MediaStream | null>) => set({streamRef : ref}),
    setPcRef : (ref : RefObject<RTCPeerConnection | null>) => set({pcRef : ref}),
    setSenderVideoRef : (ref : RefObject<HTMLVideoElement | null>) => set({senderVideoRef : ref}),
    setRecieverVideoRef : (ref : RefObject<HTMLVideoElement | null>) => set({recieverVideoRef : ref}),
    setRoomIdRef : (ref : RefObject<number | null>) => set({roomIDRef : ref}),
    setUserRoleRef : (ref : RefObject<string | null>) => set({userRoleRef : ref}),

}))

export default usechatStore;