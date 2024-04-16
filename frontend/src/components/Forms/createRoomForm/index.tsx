import { ChangeEvent, MouseEvent, useState } from "react"
// import {uuid} from '../../../App'
import { Socket } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import IUser from "../../../interfaces/Iuser";
import uuid from "../../../utils/uuid";

interface Iprops{
    id:string,
    socket:Socket,
    setUser:React.Dispatch<React.SetStateAction<IUser | null>>
}

const CreateForm=(props:Iprops)=>{
    const [roomID,setRoomID]=useState(props.id);
    const [name,setName]=useState('');
    const [copy,setCopy]=useState(false);
    const navigate=useNavigate();

    const handleCreateRoom=(e:MouseEvent<HTMLButtonElement, globalThis.MouseEvent>)=>{
        e.preventDefault()
        const userData:IUser={
            name,
            isHost:true,
            roomID,
            userID:uuid(),
            isPresenter:true 
        }
        props.setUser(userData);
        navigate(`/${roomID}`)
        props.socket.emit("userJoined",userData);
    }
    const handleOnChangeNameInput=(e:ChangeEvent<HTMLInputElement>)=>{
        setName(e.target.value)
    }
    const handleCopyBtn=async (e:MouseEvent<HTMLButtonElement, globalThis.MouseEvent>)=>{
        e.preventDefault();
        await navigator.clipboard.writeText(props.id);
        setCopy(true);
    }
    return (
        <>
            <form >
                <div className="mb-3">
                    <input type="text" className="form-control" required onChange={handleOnChangeNameInput}  placeholder="Enter Your Name"/>
                </div>
                <div className="mb-3 d-flex gap-1">
                    <input type="text" value={roomID} disabled className="form-control"  placeholder="Generate Room Code"/>
                    <button type="submit"  onClick={()=>setRoomID(props.id)}  className="btn btn-primary">Generate</button>
                    <button type="submit"  onClick={handleCopyBtn} className="btn btn-danger ">{copy==true?"Copied":"Copy"}</button>   
                </div>
                <button type="submit" disabled={name==""} onClick={handleCreateRoom} className="btn btn-primary w-100">Generate Room</button>
            </form>
        </>
    )
}
export default CreateForm