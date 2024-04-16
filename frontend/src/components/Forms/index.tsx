
import { Socket } from "socket.io-client"
import "./index.css"
import JoinForm from "./joinRoomForm"
import IUser from "../../interfaces/Iuser"
import CreateForm from "./createRoomForm"

interface Iprops{
    id:string,
    socket:Socket,
    setUser:React.Dispatch<React.SetStateAction<IUser | null>>
}

const Form=(props:Iprops)=>{
    return (
        <>
            <div className="row h-100 pt-5 rounded">
                <div className="col-md-4 mt-5 form-box p-3 border border-2 rounded-2 mx-auto border-primary">
                    <h1 className="fw-bold box-header text-primary mb-5">Create Room</h1>
                    <CreateForm id={props.id} socket={props.socket} setUser={props.setUser}/>
                </div>
                <div className="col-md-4 mt-5  form-box p-3 border border-2 rounded-2 mx-auto border-primary">
                    <h1 className=" ml-5 box-header text-primary fw-bold mb-5">Join Room</h1>
                    <JoinForm  socket={props.socket} setUser={props.setUser}/>
                </div>
            </div>
        </>
    )
}
export default Form 