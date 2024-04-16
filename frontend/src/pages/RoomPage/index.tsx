import {   useEffect, useRef, useState, MutableRefObject } from "react"
import WhiteBoard from "../../components/whiteBoard";
import "./index.css"
import IUser from "../../interfaces/Iuser";
import { Socket } from "socket.io-client";
import Shapes from "../../components/Shapes/Shapes";
import Colors from "../../components/Colors/colors";
import UndoRedo from "../../components/Undo-Redo/undo-redo";
import ClearCanvasbtn from "../../components/ClearCanvas/ClearCanvas";
import OnlineUsersTap from "../../components/OnlineUsersTap/onlineUsersTap";

interface Iprops{
    user:IUser|null,
    socket:Socket,
    users:IUser[]|null
}

const RoomPage=(props:Iprops)=>{
    const canvasRef:MutableRefObject<HTMLCanvasElement | null> = useRef<HTMLCanvasElement| null>(null);
    const contextRef:MutableRefObject<CanvasRenderingContext2D | null> = useRef<CanvasRenderingContext2D|null>(null)
    const [elements,setElements]=useState<number[]>([])
    const [Color,setColor]=useState('black');
    const [tool,setTool]=useState('pencil');
    const [history,setHistory]=useState<number[]>([]);
    const [openUsersTap,setOpenUsersTap]=useState(false);

    useEffect(()=>{
        return ()=>{
            props.socket.disconnect()
        }
    },[])
    const width:string=openUsersTap?'75%':'100%'
    return(
        <div className="d-flex w-100 gap-1 h-100">  
           <div id="main-content" style={{width:width}}>
                <div className="header mb-3">
                    <h1>White Board Sharing App </h1>
                    <div className="d-flex justify-content-center gap-3 align-items-center">
                        <span>Online Users {props.users?.length?props.users?.length:0} </span>
                        <button className="rounded-2 bg-black shadow text-white border" onClick={()=>{setOpenUsersTap(true)}}>Show Online Users</button>
                    </div>
                </div>
                {
                    props.user?.isPresenter &&(
                    <div className="btns d-flex gap-5 align-item-center justify-content-between " >
                        <div className="shapes d-flex gap-2"> 
                            <Shapes setTool={setTool} tool={tool}/>
                        </div>
                        <div className="color d-flex">
                            <Colors setColor={setColor} />
                        </div>
                        <div className="d-flex gap-1">
                            <UndoRedo setElements={setElements} setHistory={setHistory} elements={elements} history={history}/>                      
                        </div>
                        <div className="clear">
                            <ClearCanvasbtn canvasRef={canvasRef} setElements={setElements}/>
                        </div>
                    </div>
                    )
                }
                <div className="whiteboard ">
                    <WhiteBoard socket={props.socket} canvasRef={canvasRef } user={props.user} color={Color} tool={tool} elements={elements} setElements={setElements}  contextRef={contextRef} />
                </div>
            </div>
            {
                openUsersTap&& (
                    <OnlineUsersTap   setOpenUsersTap={setOpenUsersTap} openUsersTap={openUsersTap} users={props.users} user={props.user}/>
                )
            }
        </div>
    )
}
export default RoomPage