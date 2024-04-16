import IUser from "../interfaces/IUser"

let users:IUser[]=[]

// add user 
export const addUser:(user:IUser)=>IUser[]=(user:IUser)=>{
    users.push(user);
    return users
}

// remove user 
export const removeUser:(userId:string)=>any =(userId:string)=>{
    const user:IUser|number|undefined=users.findIndex((user)=>user.socketId===userId)
    if(user !== -1 || user != undefined) return users.splice(user,1)
}

export const getUser:(id:any)=>any=(userID:any)=>{
    return users.find((user:any)=>user.socketId===userID)
}

export const getUsersInRoom:(roomID:string)=>IUser[]=(roomID:string)=>{
    return users.filter((user:IUser)=>roomID===user.roomID)
}
module.exports={
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}