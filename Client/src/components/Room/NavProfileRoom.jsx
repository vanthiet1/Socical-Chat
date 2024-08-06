import { useContext } from "react";
import { UserOnlineContext } from "../../hooks/contexts/UserOnlineContext";

const NavProfile = (props) => {
    const { data } = useContext(UserOnlineContext);
    const { isUserOnline } = data; 
    const { avatar_user_room, name_user_room, userId } = props;

    const userOnlineStatus = isUserOnline[userId];
   
    return (
        <div className="flex justify-between items-center py-2 px-4 bg-[#313338]">
            <div className="flex items-center gap-2">
                <div className="relative">
                    <img className="w-[30px] h-[30px] rounded-full" src={avatar_user_room} alt="" />
                    <div className={`absolute bottom-0 right-0 rounded-full w-[12px] h-[12px] border-2 border-slate-700 ${userOnlineStatus ? 'bg-green-600' : 'bg-gray-400'}`} />
                </div>
                <span className="text-[16px] text-[#fff]">{name_user_room}</span>
            </div>
        </div>
    );
};

export default NavProfile;
