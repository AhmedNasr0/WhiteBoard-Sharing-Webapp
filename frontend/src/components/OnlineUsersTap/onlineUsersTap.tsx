import {  SetStateAction } from "react";
import IUser from "../../interfaces/Iuser";

interface IProps{
    users:IUser[] |null, 
    user:IUser |null,
    setOpenUsersTap:React.Dispatch<SetStateAction<boolean>>
    openUsersTap:boolean 
}


const OnlineUsersTap=(props:IProps)=>{

    function handleUsersTap(){
        props.setOpenUsersTap(!props.openUsersTap);
    }
    return(
        <>
            <div className="Chat position-relative border border-black overflow-hidden rounded-1 border-2" style={{width:"300px"}}>
                        <div className="header text-white position-absloute top-0 bg-black d-flex px-2 justify-content-between" style={{height:"30px"}}>
                            <p className="font-weight-bold">Online Users</p>
                            <span className="" onClick={handleUsersTap} style={{cursor:"pointer"}}>X</span>
                        </div>
                        <div className="users-names text-white w-100 h-100 bg-secondary" >
                            {
                                // console.log(props.users)
                                props.users?.map((USER:IUser)=>{
                                    return <p  className="d-flex justify-content-center border-bottom border-1 shadow pb-1">
                                        { USER.userID==props.user?.userID?USER.name+" (YOU)":USER.name}  
                                        </p>
                                })
                            }

                        </div>  
            </div>
        </>
    )
}
export default OnlineUsersTap