import { useContext } from "react";
import { ContentContext } from "../hooks/contexts/TabUiContext";
import AllUser from "../contents/AllUser";
import UserOnline from "../contents/OnlineUser";
import AddFriend from "../contents/AddFriend";
const Main = () => {
    const { activeContent } = useContext(ContentContext)
    return (
        <>
            <div>
            
                {activeContent === 1 && (<UserOnline />)}
                {activeContent === 2 && (<AllUser />)}
                {activeContent === 5 && (<AddFriend />)}
            </div>
        </>
    );
};

export default Main;