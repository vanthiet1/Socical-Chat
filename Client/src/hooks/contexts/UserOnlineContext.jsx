import { createContext, useState, useEffect, useRef, useContext } from "react";
import socket from "../../config/socketConfig";
import { showToastSuccess } from "../../config/toastConfig";
import { UserContext } from "./UserLogin";
import userService from "../../services/User";
export const UserOnlineContext = createContext();

const UserOnlineProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const { data: userLogin } = userService.useGetAnUser(user?.id);

  const [isUserOnline, setIsUserOnline] = useState(() => {
    const storedStatus = JSON.parse(localStorage.getItem("onlineStatus"));
    return storedStatus || {};
  });
  
  const socketRef = useRef(socket);
  const isFriend = (userId) => {
    return userLogin?.friends?.some(friend => friend._id === userId); 
  };
  const data = {
    isUserOnline,
  }
  const handleUserConnected = ({ username, userId }) => {
    if (userId === userLogin?._id || !isFriend(userId)) return;

    showToastSuccess(`Người dùng ${username} đã online`);
    setIsUserOnline((prevStatus) => {
      const updatedStatus = { ...prevStatus, [userId]: true };
      localStorage.setItem("onlineStatus", JSON.stringify(updatedStatus));
      return updatedStatus;
    });
  };

  const handleUserDisconnected = ({ username, userId }) => {
    if (userId === userLogin?._id || !isFriend(userId)) return;

    showToastSuccess(`Người dùng ${username} đã ngắt kết nối`);
    setIsUserOnline((prevStatus) => {
      const updatedStatus = { ...prevStatus, [userId]: false };
      localStorage.setItem("onlineStatus", JSON.stringify(updatedStatus));
      return updatedStatus;
    });
  };
  const handleDisconnect = () => {
    console.log("Đã ngắt kết nối");
    setIsUserOnline((prevStatus) => {
      const updatedStatus = { ...prevStatus, [userLogin?._id]: false };
      localStorage.setItem("onlineStatus", JSON.stringify(updatedStatus));
      return updatedStatus;
    });
  };
  useEffect(() => {

    const socketCurrent = socketRef.current;
    socketCurrent.connect();
    socketCurrent.on('userConnected', handleUserConnected);
    socketCurrent.on('userDisconnected', handleUserDisconnected);
    socketCurrent.on('disconnect', handleDisconnect);

    return () => {
      socketCurrent.off('userConnected', handleUserConnected);
      socketCurrent.off('userDisconnected', handleUserDisconnected);
      socketCurrent.off('disconnect', handleDisconnect);
      socketCurrent.disconnect();
    };
  }, [userLogin]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      socket.emit('userDisconnected', { userId: user?._id });
      const updatedStatus = { ...isUserOnline, [user?._id]: false };
      localStorage.setItem("onlineStatus", JSON.stringify(updatedStatus));
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [user, isUserOnline]);

  return (
    <UserOnlineContext.Provider value={{ data }}>
      {children}
    </UserOnlineContext.Provider>
  );
};

export default UserOnlineProvider;
