import { useEffect, useState, useContext, useRef } from "react";
import { FaTrashAlt } from "react-icons/fa";
import socket from "../../config/socketConfig";
import { UserContext } from "../../hooks/contexts/UserLogin";
import { UserRomChatContext } from "../../hooks/contexts/UserContext";
import NavProfileRoom from "../../components/Room/NavProfileRoom";
import SidebarRoom from "../../components/Room/SidebarRoom";
import friendService from "../../services/Friend";
import messageService from "../../services/Message";
import userService from "../../services/User";
import { showToastSuccess, showToastError } from "../../config/toastConfig";
import FormatDateAndTime from "../../config/timeMessage";
import { ContentContext } from "../../hooks/contexts/TabUiContext";
const Chat = () => {
  const { user } = useContext(UserContext);
  const {handleContentChange} = useContext(ContentContext)
  const { idUserSelecteRom } = useContext(UserRomChatContext);
  const { data: selectedUser } = userService.useGetAnUserById(idUserSelecteRom);
  const { data: userLogin } = userService.useGetAnUser(user?.id);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const { data: initialMessages } = messageService.useGetMessage({
    fromUserId: userLogin?._id,
    toUserId: idUserSelecteRom,
  });
  const deleteMessageMutation = messageService.useDeleteMessageUser();
  const [hoveredMessageId, setHoveredMessageId] = useState(null);
  const [lastMessageTime, setLastMessageTime] = useState(0);

  const [isUserOnline] = useState(() => {
 const storedStatus = JSON.parse(localStorage.getItem("onlineStatus"));
    return storedStatus || {};
  });

  useEffect(() => {
    if (initialMessages) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  useEffect(() => {
    const handleReceiveMessage = (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    };

    const handleMessageDeleted = ({ id }) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === id ? { ...msg, message: 'Đã thu hồi tin nhắn' } : msg
        )
      );
    };

    const handleReconnect = () => {
      console.log("Đã quay lại", user._id);
      socket.emit('join', user._id);
    };

    const handleReconnectAttempt = () => {
      console.log("Attempting to reconnect...");
    };

    const sendHeartbeat = () => {
      console.log("Sending heartbeat");
      socket.emit('heartbeat');
    };

    let heartbeatInterval;

    if (user && idUserSelecteRom) {
      socket.connect();
      socket.emit('join', user._id);
      socket.on('receiveMessage', handleReceiveMessage);
      socket.on('messageDeleted', handleMessageDeleted);
      socket.on('reconnect', handleReconnect);
      socket.on('reconnect_attempt', handleReconnectAttempt);
      heartbeatInterval = setInterval(sendHeartbeat, 30000);

      return () => {
        socket.off('receiveMessage', handleReceiveMessage);
        socket.off('messageDeleted', handleMessageDeleted);
        socket.off('reconnect', handleReconnect);
        socket.off('reconnect_attempt', handleReconnectAttempt);
        socket.emit('leave', user._id);
        clearInterval(heartbeatInterval);
      };
    }
  }, [user, idUserSelecteRom, isUserOnline, userLogin?._id]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      socket.emit('userDisconnected', { userId: user._id });
      const updatedStatus = { ...isUserOnline, [user._id]: false };
      localStorage.setItem("onlineStatus", JSON.stringify(updatedStatus));
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [user, isUserOnline]);

  const handleSendMessage = () => {
    const currentTime = Date.now();
    if (!inputMessage.trim() || currentTime - lastMessageTime < 1000) return;

    const messageData = {
      fromUserId: userLogin?._id,
      toUserId: idUserSelecteRom,
      message: inputMessage,
      timestamp: new Date().toISOString()
    };

    socket.emit('sendMessage', messageData);
    setMessages((prevMessages) => [...prevMessages, messageData]);
    setInputMessage("");
    setLastMessageTime(currentTime);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const unFriendMutation = friendService.useUnFriendRequest();
  const handleUnFriend = () => {
    const DataUnFriend = {
      fromUserId: selectedUser?._id,
      toUserId: userLogin?._id,
    };
    if (unFriendMutation) {
      unFriendMutation.mutate(DataUnFriend);
    }
  };

  const handleDeleteChat = async (id) => {
    if (!id) {
      showToastError("Tạm thời chưa xóa được đợi ít phút");
      return;
    }
    const deleteData = await deleteMessageMutation.mutateAsync(id);
    showToastSuccess(deleteData.message);
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg._id === id ? { ...msg, message: 'Đã thu hồi tin nhắn' } : msg
      )
    );
    socket.emit('deleteMessage', { id });
  };

  return (
    <div>

      <div className="flex h-lvh">
        <div className="w-[70%]  bg-[#272729] relative  flex flex-col">
        <NavProfileRoom
        avatar_user_room={selectedUser?.profileImage}
        name_user_room={selectedUser?.name}
        userId={selectedUser?._id}
      />
          <div className="border-b-[1px] pb-3 mb-5 flex items-center gap-2 p-3">
            <div>
              <img className="w-[70px] rounded-[50px]" src={selectedUser?.profileImage} alt="" />
          
            </div>
            <div>
            <span className="text-[#fff] font-bold block pt-3">
                {selectedUser?.name}
              </span>
              <p className="text-[#fff]">Hãy tạo cuộc trò chuyện cùng với những người bạn của bạn</p>
              <div className="flex gap-2">
              <button
                className="mt-2 bg-red-600 p-1 w-[200px] rounded-[5px] text-[#fff] hover:bg-red-500  duration-300"
                onClick={handleUnFriend}
              >
                Xóa kết bạn
              </button>
              <button
                className="mt-2 bg-[#4a4a4a] p-1 w-[200px] rounded-[5px] text-[#fff] hover:bg-[#616161] duration-300"
                onClick={()=>handleContentChange(1)}
              >
                Quay lại
              </button>
              </div>
            </div>
          </div>
          <div className="overflow-y-auto overflow-x-hidden scrollbar-thin h-[60%] scroll-hidden p-2">
            <div className="flex flex-col">
              {messages.map((msg, index) => (
                <>
                  <div key={msg._id} className={`flex flex-col mb-2 ${msg.fromUserId === userLogin?._id ? 'items-end' : 'items-start'}`}>
                    <span className="text-[#fff] pb-1">{FormatDateAndTime(msg.
                      timestamp)}</span>
                    <div
                      key={msg._id}
                      className={`p-3 rounded-lg w-max flex items-center gap-3 ${msg.fromUserId === userLogin?._id ? 'bg-blue-500' : 'bg-gray-700'} text-white max-w-xs break-words`}
                      onMouseEnter={() => setHoveredMessageId(index)}
                      onMouseLeave={() => setHoveredMessageId(null)}
                    >

                      <div>
                        <span>{msg.message}</span>
                      </div>
                      {msg.fromUserId === userLogin?._id && hoveredMessageId === index && (
                        <div
                          className="cursor-pointer"
                          onClick={() => handleDeleteChat(msg._id)}
                        >
                          <FaTrashAlt />
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="absolute bottom-0 w-full left-0 p-2">
            <div className="relative">
              <input
                type="text"
                className="w-full border-2 p-3 bg-[#494949] text-[#fff] rounded-[5px]"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className="absolute right-[5px] top-[6px]">
                <button
                  disabled={!inputMessage}
                  onClick={handleSendMessage}
                  className={`${inputMessage ? 'bg-blue-500 text-[#fff] font-bold' : 'bg-[#dcdcdc]'} w-[100px] p-2 block rounded-[5px]`}
                >
                  Gửi
                </button>
              </div>
            </div>
          </div>
        </div>
        <SidebarRoom
          avatar_user_room={selectedUser?.profileImage}
          name_user_room={selectedUser?.name}
          handleUnFriend={handleUnFriend}
        />
      </div>
    </div>
  );
};

export default Chat;
