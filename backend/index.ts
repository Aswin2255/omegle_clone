import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });
console.log("Server is running on port  8080");

let GLOBAL_ROOM_ID = 0;

class Room {
  id: string;
  sender : WebSocket | null;
  reciever : WebSocket | null;
  constructor(id: string){
    this.id = id;
    this.sender = null;
    this.reciever = null;
  }
  

}

class RoomManager {
  private globalRoomId : number = 0;
  private rooms : Map<string, Room> = new Map();
  private userques : WebSocket[] = [];
  constructor(){
    
  }
  findRoom(roomId: string){
    return this.rooms.get(roomId);
  }
  addUser(ws: WebSocket){
    console.log('addUser');
    console.log(this.userques.length);
    if(this.userques.length){
      const user = this.userques.shift();
      if(user){
        const roomId = this.globalRoomId + 1;
        const room = new Room(roomId.toString());
        room.sender = user;
        room.reciever = ws;
        this.rooms.set(room.id, room);
        this.globalRoomId = roomId;
        console.log('user joined the room', room.id);
        room.sender.send(JSON.stringify({message: "create-offer",roomId: room.id}))
        room.reciever.send(JSON.stringify({message:"joined-room"}))
       
      }
    
    }
    else {
      console.log('user joined the que Waiting for a partner');
      this.userques.push(ws);
      //console.log(this.userques);
      ws.send(JSON.stringify({message: "waiting-for-partner"}))
      
    }
    
  }
  removeUser(id: string){
    this.rooms.delete(id);
}
}


interface ROOM {
  roomId: number;
  users: {
    name: string;
    id: string;
    socket: WebSocket;
  }[];
}

interface USER {
  name: string;
  id: string;
  socket: WebSocket;
}

const userQue: USER[] = [];
const rooms: ROOM[] = [];


const createUser = (name: string, id: string, socket: WebSocket) => {
  userQue.push({ name, id, socket });
};

const sendMessage = (user: any,reciever: any,usermessage: string,roomId: number) => {
  const getRoom = rooms.find((rooms) => rooms.roomId === reciever.roomId);
  const recieverUser = getRoom?.users.find((user) => user.id === reciever.id);
  if (recieverUser) {
    recieverUser.socket.send(JSON.stringify({ message: "recieve-message", user: { id: user.id, name: user.name }, usermessage: usermessage }));
  }
  
}

const createRoom = () => {
  if (userQue.length === 0) {
    return;
  }
  const getRomm = rooms.find((room) => room.roomId === GLOBAL_ROOM_ID);
  if (getRomm && getRomm.users.length < 2) {
    let newUser = userQue.shift();
    if (newUser) {
      getRomm.users.push(newUser);
      const [user1, user2] = getRomm.users;
      //console.log(user1, user2);
      user1.socket.send(JSON.stringify({ message: "user-connected",   partner: { id: user2.id, name: user2.name },roomId: GLOBAL_ROOM_ID }));
      user2.socket.send(JSON.stringify({ message: "user-connected", partner: { id: user1.id, name: user1.name },roomId: GLOBAL_ROOM_ID }));
    }
  } else {
    console.log("Creating new room");
    let roomId = GLOBAL_ROOM_ID + 1;
    let newUser = userQue.shift();
    if (newUser) {
      const newRoom = {
        roomId: roomId,
        users: [{ name: newUser.name, id: newUser.id, socket: newUser.socket }],
      };
      rooms.push(newRoom);
    }
    GLOBAL_ROOM_ID = roomId;

  }
};

const roomManager = new RoomManager();

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    let recievedMsg = JSON.parse(data.toString());
    const {message} = recievedMsg;
    if(message === "user-joined"){
      roomManager.addUser(ws);
    }
    else if (message === "ask-to-create-answer"){
      const {sdp, roomId} = recievedMsg;
      
      const findRoom = roomManager.findRoom(roomId);
      if(findRoom){
        findRoom?.reciever?.send(JSON.stringify({message: "create-answer",roomId: roomId, sdp: sdp}));
      }
      else{
        console.log("Room not found" + message);
        //console.log(recievedMsg);
      }
    }
    else if (message === "answer-created"){
  
      const {sdp, roomId} = recievedMsg;
      const findRoom = roomManager.findRoom(roomId);
      if(findRoom){
        findRoom?.sender?.send(JSON.stringify({message: "answer-recieved",roomId: roomId, sdp: sdp}));
      }
      else{
        console.log("Room not found" + message);
      }
    }
    else if (message === "candidate-created"){
      const {candidate, roomId, userRole} = recievedMsg;
      const findRoom = roomManager.findRoom(roomId);
      const usertoSend = userRole === "sender" ? "reciever" : "sender";
      if(findRoom){
          findRoom?.[usertoSend]?.send(JSON.stringify({message: "add-ice-candidate", candidate: candidate, roomId: roomId}));
      }
      
      
      
    }
    else if(message === "audio-disconnected"){
      const {roomid,userrole} = recievedMsg
      const findRoom = roomManager.findRoom(roomid)
      const usertoSend = userrole === "sender" ? "reciever" : "sender";
      if(findRoom){
        findRoom?.[usertoSend]?.send(JSON.stringify({message:"partner-audio-disconnected"}))
      }

    }
    else if(message === "audio-connected"){
      const {roomid,userrole} = recievedMsg
      const findRoom = roomManager.findRoom(roomid)
      const usertoSend = userrole === "sender" ? "reciever" : "sender";
      if(findRoom){
        findRoom?.[usertoSend]?.send(JSON.stringify({message:"partner-audio-connected"}))
      }

    }
    else if(message === "video-disconnected"){
      const {roomid,userrole} = recievedMsg
      const findRoom = roomManager.findRoom(roomid)
      const usertoSend = userrole === "sender" ? "reciever" : "sender";
      if(findRoom){
        findRoom?.[usertoSend]?.send(JSON.stringify({message:"partner-video-disconnected"}))
      }
    }
    else if(message === "video-connected"){
      const {roomid,userrole} = recievedMsg
      const findRoom = roomManager.findRoom(roomid)
      const usertoSend = userrole === "sender" ? "reciever" : "sender";
      if(findRoom){
        findRoom?.[usertoSend]?.send(JSON.stringify({message:"partner-video-connected"}))
      }

    }
    else if(message === "send-message"){
      const {user,roomid,userrole,usermessage} = recievedMsg
      const findRoom = roomManager.findRoom(roomid)
      if(findRoom){
        const usertoSend = userrole === "sender" ? "reciever" : "sender";
        findRoom?.[usertoSend]?.send(JSON.stringify({message:"recieved-message",userDetails:user,roomid:roomid,userMessage:usermessage}))
      }
    }
    // when a loby message is recieved
    // need to call room manager
    // inside room manger check the que . lenght is ther we will do shift and take the first participant and create a room with him 
    //else we will push the participant to the room and send a message like waiting for a partner
    //room creation logic will be in room manager
    //we will create a room id
    //we eill store the sender and reciever websocket
    //store the roomid and the room details as a map
    //sends the message that the user has joiined the room with room id 
    // sender will sent an offer from offer from frontend with room id
    // signaling server recieves it and send to the reciever to create answer
    //reciever acces the option set the remote description and send the answer and set the local description
    // singlaing server sends the ansewer to sneder it add the remote description 
    // when a user click on leave a ws will triger remove room will be destoyed and both the user will add to the que again
    
  });

  ws.send("something");
});
