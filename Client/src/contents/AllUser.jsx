import { IoIosChatbubbles } from "react-icons/io";
import { GoMultiSelect } from "react-icons/go";
import userService from "../services/User";
import { useContext, useState } from "react";
import { UserContext } from "../hooks/contexts/UserLogin";
import ActionMenu from "../components/ActionMenuUser/ActionMenu";
import Banner from "../components/DataNull/Banner";
import { UserRomChatContext } from "../hooks/contexts/UserContext";
import { ContentContext } from "../hooks/contexts/TabUiContext";
const AllUser = () => {
    const { user } = useContext(UserContext)
    const { handleGetUserRoom } = useContext(UserRomChatContext);
    const { handleContentChange } = useContext(ContentContext);

    const [selectedUserId, setSelectedUserId] = useState(null);
    const { data: User, isLoading, error } = userService.useGetAnUser(user?.id);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    const handleShowActionMenu = (id) => {
        setSelectedUserId(id === selectedUserId ? null : id);
    }
    return (
        <>
            <div className="bg-[#2b2d31] p-5" >
                {User.friends.length > 0 ? (
                    User && User?.friends?.map((friend) => (
                        <div className="flex items-center justify-between mb-3" key={friend.id}>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <img className="w-[50px] rounded-[50%]" src={friend.profileImage} alt="avatar" />
                                    <div className="absolute bottom-0 right-0 rounded-full w-[15px] h-[15px] bg-green-600 border-2 border-slate-700">
                                    </div>
                                </div>
                                <div>
                                    <span className="text-[#fff] block">{friend.name}</span>
                                    <span className="text-[#cbcbcb] block">Online</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="bg-slate-700 rounded-full w-[40px] h-[40px] flex items-center justify-center cursor-pointer">
                                    <IoIosChatbubbles onClick={() => { handleContentChange(6), handleGetUserRoom(friend?._id) }} className="text-[#fff] rounded-full w-[20px] h-[20px]" />
                                </div>

                                <div className="bg-slate-700 rounded-full w-[40px] h-[40px] flex items-center justify-center cursor-pointer relative" onClick={() => handleShowActionMenu(friend._id)} >
                                    {selectedUserId === friend._id && <ActionMenu toUserId={friend._id} fromUserId={user?.id} />}
                                    <GoMultiSelect className="text-[#ffffffbf] rounded-full w-[20px] h-[20px]" />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <Banner contentNull={"Danh sách bạn bè đang trống"} />
                )}
            </div>
        </>
    );
};

export default AllUser;