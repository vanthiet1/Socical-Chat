import { useContext, useEffect, useState } from 'react';
import { ContentContext } from '../hooks/contexts/TabUiContext';
import { FaUserFriends, BsMailbox2Flag, FaUsers } from '../icons/ReactIcon/NavigationIcon';
import socket from '../config/socketConfig';
import { UserContext } from '../hooks/contexts/UserLogin';
import userService from '../services/User';
import { showToastSuccess } from '../config/toastConfig';
const Navigation = (props) => {
    const { showSIdeBar } = props
    const { activeContent } = useContext(ContentContext)
    const [friendRequestsCount, setFriendRequestsCount] = useState(
        parseInt(localStorage.getItem('friendRequestsCount'), 10) || 0
    );
    const { handleContentChange } = useContext(ContentContext);
    const { user } = useContext(UserContext);
    const googleId = user?.id;
    const { data } = userService.useGetAnUser(googleId);
    useEffect(() => {
        if (data) {
            socket.emit('join', data?._id);
            const initialCount = data?.friendRequests?.length || 0;
            setFriendRequestsCount(initialCount);
            localStorage.setItem('friendRequestsCount', initialCount);
        }
    }, [data]);

    useEffect(() => {
        const handleFriendRequestReceived = ({ username, fromUserId }) => {
            if (!username || !fromUserId) return;
            const isRequestAlreadySent = data?.friendRequests?.some(request => request.fromUserId._id === fromUserId);
            if (isRequestAlreadySent ||
                isRequestAlreadySent === undefined) {
                return;
            }
            setFriendRequestsCount(prev => {
                const newCount = prev + 1;
                localStorage.setItem('friendRequestsCount', newCount);
                return newCount;
            });
            showToastSuccess(`${username} đã gửi cho bạn một lời mời kết bạn.`);
        };

        socket.on('friendRequestReceived', handleFriendRequestReceived);

        return () => {
            socket.off('friendRequestReceived', handleFriendRequestReceived);
        };
    }, [data]);

    return (
        <div className="flex justify-between px-5  py-7 items-center bg-navigation max-sm:px-2 max-sm:py-3 max-sm:order-2 max-sm:flex-col">
            <div className="flex items-center gap-10 max-sm:gap-2 max-sm:order-2 max-sm:w-full max-sm:flex max-sm:justify-between">

                <div className="flex items-center gap-2 ">
                    <FaUserFriends className='text-[#fff] text-[20px] font-semibold' />
                    <span className='text-[#fff] font-semibold max-sm:w-max' onClick={() => showSIdeBar(false)}>Bạn Bè</span>
                </div>

                <span className={`text-[#fff] block cursor-pointer max-sm:text-[16px] max-sm:w-max  ${activeContent === 2 ? 'border-b-2 border-slate-100 rounded-sm ' : ''}`} onClick={() => handleContentChange(2)}>Tất cả</span>
                <div className='relative '>
                    <span className={`text-[#fff] cursor-pointer max-sm:text-[16px] max-sm:w-max
                     ${activeContent === 3 ? 'border-b-2 border-slate-100 rounded-sm ' : ''}`} onClick={() => handleContentChange(3)}>Chờ xác nhận</span>
                    {friendRequestsCount > 0 && (
                        <div className="absolute top-[-5px] right-[-5px]">
                            <span className='text-[12px] bg-red-500 text-[#fff] w-[15px] flex justify-center rounded-full'>{friendRequestsCount}</span>
                        </div>
                    )}
                </div>
                <button className='text-[#fff] bg-[#248046] px-1 rounded-[3px]' onClick={() => handleContentChange(5)}>Thêm bạn bè</button>
            </div>
            <div className='flex items-center gap-3 group max-sm:py-2 max-sm:order-1 max-sm:flex max-md:justify-end max-sm:w-full'>
                <div className='relative group'>
                    <FaUsers className='text-[#fff] text-[25px] cursor-pointer' />
                    {friendRequestsCount > 0 && (
                        <>
                            <div className="absolute top-[-5px] right-[-5px]">
                                <span className='text-[12px] bg-red-500 text-[#fff] w-[15px] flex justify-center rounded-full'>{friendRequestsCount}</span>
                            </div>
                            <div className='absolute bg-[#676767] w-[200px] left-[-200px] p-3 rounded-[5px] hidden group-hover:block'>
                                <span className='text-[#ffffff]'>Bạn có {friendRequestsCount} lời mời kết bạn </span>
                            </div>
                        </>
                    )}
                </div>

                <BsMailbox2Flag className='text-[#fff] text-[25px]' />
            </div>
        </div>
    );
};

export default Navigation;
