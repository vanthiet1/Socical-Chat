import { useState } from "react";
import { FaUserCheck } from "react-icons/fa6";
const SidebarRoom = (props) => {
    const { avatar_user_room, name_user_room , handleUnFriend} = props;
    const [showRemoveFriend, setShowRemoveFriend] = useState(false);
    return (
        <div className="w-[30%] bg-[#232428]  relative max-md:hidden">
            <div>
                <div className="flex justify-end items-center bg-[#d1d2d0] p-5 gap-3 relative">
                    <div className="bg-[#60605F] hover:bg-black duration-300 flex justify-center items-center rounded-[50%] w-[30px] h-[30px] p-2 cursor-pointer relative" >
                        <FaUserCheck className="text-red-50" onClick={() => setShowRemoveFriend(!showRemoveFriend)} />
                        {showRemoveFriend && (
                            <div className="bg-[#333] absolute w-[100px] left-[-110px] p-2 rounded-[5px] cursor-pointer z-50" onClick={handleUnFriend}>
                                <span className="block w-max text-red-500 ">Xóa kết bạn</span>
                            </div>
                        )}

                    </div>
                    <div className="absolute left-[20px] bottom-[-70px]">
                        <div className="bg-[#232428] w-max rounded-[50%] p-2">
                            <img className="w-[70px] rounded-[50px]" src={avatar_user_room} alt="" />
                        </div>
                        <span className="text-[#fff] font-bold block">{name_user_room}</span>
                        <span className="text-[#fff] font-bold block text-[12px]">{name_user_room}</span>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 p-3 left-[30%] z-10">
                <span className="text-[#9c9c9c] cursor-pointer hover:text-[#fff]" >Xem hồ sơ</span>
            </div>
        </div>
    );
};

export default SidebarRoom;
