import ClipLoader from "react-spinners/ClipLoader";
import { useContext, useEffect, useState } from "react";
import userService from "../../services/User";
import { UserContext } from "../../hooks/contexts/UserLogin";
import { ContentContext } from "../../hooks/contexts/TabUiContext";
import { UserRomChatContext } from "../../hooks/contexts/UserContext";
const UserList = () => {
    const [listFriend, setLIstFriend] = useState([])
    const { user } = useContext(UserContext);
    const {handleGetUserRoom} = useContext(UserRomChatContext);
    const { data: userDetail, isLoading } = userService.useGetAnUser(user?.id)
    const { handleContentChange } = useContext(ContentContext);
 
    useEffect(() => {
        setLIstFriend(userDetail?.friends)
    }, [userDetail])


    return (
        <>
            <div >
                {isLoading && (
                    <div className="absolute left-0 right-0  py-2 px-4 rounded-b-md flex justify-center items-center">
                        <ClipLoader color="#fff" size={30} />
                    </div>
                )}
                {listFriend && listFriend.length > 0 ? (
                    listFriend.map((user) => (
                        <div key={user.id} className="flex gap-3 my-4 p-2 items-center cursor-pointer hover:bg-[#37393e] rounded-[5px] duration-300" onClick={() => {handleContentChange(6) ,handleGetUserRoom(user?._id) }}>
                            <img src={user.profileImage} className="w-[35px] rounded-full" alt="avartar" />
                            <span className="block text-[#fff]">
                                {user.name}
                            </span>
                        </div>
                    ))
                ) : null}

            </div>
        </>
    );
};

export default UserList;
