import { createContext, useState } from "react";
export const UserRomChatContext = createContext()
const UserRomProvider = ({ children }) => {
    const [idUserSelecteRom,setIdUserSelecteRom] = useState(null)
   
    const handleGetUserRoom = (id)=>{
        setIdUserSelecteRom(id)
    }
  
    return (
        <div>
            <UserRomChatContext.Provider value={{handleGetUserRoom,idUserSelecteRom }}>
                {children}
            </UserRomChatContext.Provider>
        </div>
    );
};

export default UserRomProvider;