import { Socket } from "socket.io-client"
import {ChangeEvent, MouseEvent, useState} from 'react'
import uuid from "../../../utils/uuid"
import { useNavigate } from "react-router-dom"
import IUser from "../../../interfaces/Iuser"


interface Iprops{
    socket:Socket,
    setUser:React.Dispatch<React.SetStateAction<IUser | null>>
}

const JoinForm=(props:Iprops)=>{
    const [roomID,setRoomID]=useState("");
    const [name,setName]=useState("");
    const navigate=useNavigate();
    
    const handleJoinRoom=(e:MouseEvent<HTMLButtonElement, globalThis.MouseEvent>)=>{
        e.preventDefault();
        const userData:IUser={
            name,
            roomID,
            userID: uuid(),
            isPresenter: false,
            isHost: false
        }
        props.setUser(userData)
        navigate(`/${roomID}`)
        props.socket.emit("userJoined",userData);
    }
    const handleOnChangeNameInput=(e:ChangeEvent<HTMLInputElement>)=>{
        setName(e.target.value)
    }
    const handleOnChangeRoomIDInput=(e:ChangeEvent<HTMLInputElement>)=>{
        setRoomID(e.target.value)
    }

    return(
        <>  
            <form className="">
                <div className="mb-3">
                    <input type="text" required className="form-control" onChange={handleOnChangeNameInput}  placeholder="Enter Your Name"/>
                </div>
                <div className="mb-3 d-flex gap-1">
                    <input type="text" required className="form-control" onChange={handleOnChangeRoomIDInput} placeholder="Enter Room Code"/>   
                </div>
                <button type="submit" onClick={handleJoinRoom} disabled={roomID=="" || name==""} className="btn btn-primary w-100">Join Room</button>
            </form>
        </>
    )
}
export default JoinForm