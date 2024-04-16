import express from 'express';
const app = express();
import http from 'http';
import { Server, Socket } from "socket.io";
import cors from 'cors';
import {addUser, getUser, getUsersInRoom, removeUser} from "./utils/user"
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {origin:"*", methods: ["GET", "POST"]},
});
 
app.get('/',(req,res)=>{
    res.send("Hello from new project")
})
let roomId=''
let img=''



io.on("connection",(socket:Socket)=>{
    socket.on("userJoined",(data:any)=>{
        const {name,isHost,isPresenter,roomID,userID} = data
        roomId=roomID
        const users=addUser({name,isHost,isPresenter,roomID,userID,socketId:socket.id})
        const allusersInRoom=getUsersInRoom(roomID);
        socket.join(roomID);
        socket.emit("userIsJoined",({success:true ,allusersInRoom}))
        socket.broadcast.to(roomId).emit("userJoinedMessage",({name}))
        socket.broadcast.to(roomId).emit("allUsers",({allusersInRoom}))
        socket.broadcast.to(roomId).emit("whiteboardDataResponse",{
            img 
        })
    })
    socket.on("disconnect",(data:any)=>{
        const user:any=getUser(socket.id)
        const removeuser=removeUser(socket.id);
        socket.broadcast.to(roomId).emit("userLeftMessage",(user?.name));
    })
    socket.on("whiteBoardData",(data:any)=>{
        img=data
        socket.broadcast.to(roomId).emit("whiteboardDataResponse",{
            img 
        })
    })
})

server.listen(4000, () => { console.log("listening on *:4000"); });
