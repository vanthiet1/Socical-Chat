import { useEffect, useContext, useState } from "react";
import { UserContext } from "../hooks/contexts/UserLogin";
import userService from "../services/User";
import {
    AiOutlineClose,
    AiOutlineCheck
} from '../icons/ReactIcon/PendingRequestIcon'
import Banner from "../components/DataNull/Banner";
const PendingConfirm = () => {
    const [friendRequestsCount, setFriendRequestsCount] = useState(0);
    const [dataFriendRequests, setDataFriendRequests] = useState([]);

    const { user } = useContext(UserContext);
    const googleId = user?.id;
    const { data } = userService.useGetAnUser(googleId);
    const sendAcceptFriendRequest = userService.useAcceptFriendRequest();
    const cancelFriendRequest = userService.useCancelFriendRequest();



    useEffect(() => {
        const countFriendRequest = data?.friendRequests?.length || 0;
        const dataFriendRequets = data?.friendRequests;
        setDataFriendRequests(dataFriendRequets)
        setFriendRequestsCount(countFriendRequest);
    }, [data])
    const handleAcceptFriendRequest = (fromUserId) => {
        const DataAcceptFriendRequest = {
            fromUserId: fromUserId,
            toUserId: data?._id 
        }
        if (sendAcceptFriendRequest) {
            sendAcceptFriendRequest.mutate(DataAcceptFriendRequest)
        }
    }
    const handleCancelFriendRequest = (fromUserId) => {
        const DataCancelFriendRequest = {
            fromUserId: fromUserId,
            toUserId: data?._id 
        }

        if (cancelFriendRequest) {
         cancelFriendRequest.mutate(DataCancelFriendRequest)
        }
    }
    return (
        <>
            <div className="bg-[#2b2d31] p-5">
                {friendRequestsCount > 0 ? (
                    dataFriendRequests && dataFriendRequests.map((userRequest) => (
                        <>
                            <div className="bg-[#2b2d31] p-5" key={userRequest._id}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <img className="w-[50px] rounded-[50%]" src={userRequest?.fromUserId?.profileImage} alt="avatar" />
                                            <div className="absolute bottom-0 right-0 rounded-full w-[15px] h-[15px] bg-green-600 border-2 border-slate-700">
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-[#fff] block">{userRequest?.fromUserId.name}</span>
                                            <span className="text-red-500 block">Yêu cầu kết bạn đến</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="bg-slate-700 rounded-full w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:bg-slate-600 duration-300">
                                            <AiOutlineCheck onClick={() => handleAcceptFriendRequest(userRequest?.fromUserId?._id)} className="text-[#fff] rounded-full w-[20px] h-[20px] " />
                                        </div>
                                        <div className="bg-slate-700 rounded-full w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:bg-slate-600 duration-300 ">
                                            <AiOutlineClose onClick={()=>handleCancelFriendRequest(userRequest?.fromUserId?._id)} className="text-[#fff] rounded-full w-[20px] h-[20px]" />
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </>
                    ))
                ) : (
                    <>
                      <Banner contentNull={"Tạm thời chưa có lời mời nào"} />
                    </>)}
            </div>
        </>

    );
};

export default PendingConfirm;