import './App.css'
import Form from './components/Forms'
import {Routes,Route} from "react-router-dom"
import RoomPage from './pages/RoomPage'
import io from "socket.io-client";
import { useEffect, useState } from 'react';
import IUser from './interfaces/Iuser';
import toast, { Toaster } from 'react-hot-toast';
import uuid from './utils/uuid';

const server:string="http://localhost:4000";

const connectionOptions:object={
    "force new connections":true,
    reconnectionAttemps:"Infinity",
    timeout:10000,
    transporsts:["websockets"]
}

const socket = io(server,connectionOptions);

const joinToastStyling:Record<string,string>={
    border: '1px solid green',
    backgroundColor: 'green',
    color:"white"
}
const leftToastStyling:Record<string,string>={
  border: '1px solid red',
  backgroundColor: 'red',
  color:"white"
}

function App() {
  const [user,setUser]=useState<null|IUser>(null);
  const [users,setUsers]=useState([]);

  useEffect(()=>{
    socket.on("userIsJoined",(data)=>{
      if(data.success){
        setUsers(data.allusersInRoom);
      }
    })
    socket.on("allUsers",(data)=>{
      setUsers(data.allusersInRoom)
    })
    socket.on("userJoinedMessage",(user:IUser)=>{
      toast(`${user.name} joined`,{
        style: joinToastStyling,
      })
    })
    socket.on("userLeftMessage",(user:object)=>{
      toast(`${user} Left`, {
        style: leftToastStyling,
      })
    })
  },[])
  return (
    <>
    <Toaster />
    <Routes>
      <Route path="/" element={<Form id={uuid()} socket={socket} setUser={setUser}/>}/>
      <Route path="/:roomId" element={<RoomPage  user={user} users={users} socket={socket}/>} />
    </Routes>
    </>
  )
}

export default App
