import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });
console.log("Server is running on port  8080");

let GLOBAL_ROOM_ID = 0;

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

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    let recievedMsg = JSON.parse(data.toString());
    //console.log(recievedMsg)
    //fix the problem in receiver id there is some problem debug it
    const { user, message,usermessage,roomId,reciever} = recievedMsg;
    //console.log(user,message)

    if (message === "user-joined") {
      createUser(user.name, user.id, ws);
      //console.log(userQue)
      createRoom();
      //console.log(rooms[0].users)
    }
    if (message === "send-message") {
      sendMessage(user,reciever,usermessage,roomId)
    }
  });

  ws.send("something");
});
