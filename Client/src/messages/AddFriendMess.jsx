import { useEffect, useState } from "react";
import socket from "../config/socketConfig";
const AddFriendMessage = () => {
    const [userName,setUserName] = useState("")
  useEffect(()=>{
    socket.on('friendRequestReceived', ({ username }) => {
        setUserName(username)
    });
  },[])
    return (
        <>
            {userName}
        </>
    );
};

export default AddFriendMessage;