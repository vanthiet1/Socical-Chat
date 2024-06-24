import { useContext, useEffect , useState} from 'react';
import { ContentContext } from '../hooks/contexts/TabUiContext';
import { FaUserFriends, BiSolidMessageRoundedAdd, BsMailbox2Flag } from '../icons/ReactIcon/NavigationIcon';
import socket from '../config/socketConfig';
// import { showToastSuccess } from '../config/toastConfig';
import { UserContext } from '../hooks/contexts/UserLogin'
import userService from '../services/User';

const Navigation = () => {
    const [friendRequestsCount, setFriendRequestsCount] = useState(0);
    const { handleContentChange } = useContext(ContentContext);
    const { user } = useContext(UserContext);
    const googleId = user?.id;
    const {data} = userService.useGetAnUser(googleId)
 console.log(data);
    useEffect(() => {
        if (data) {
            socket.emit('join', data?._id);
        }
        setFriendRequestsCount(data?.friendRequests?.length)
        return () => {
            socket.off('friendRequestReceived');
        };
    }, [data]);

    return (
        <>
            <div className="flex justify-between px-5 py-7 h-[30px] items-center bg-[#313338] border-b-2 border-black">
                <div className="flex items-center gap-10"         >
                    <div className="flex items-center gap-2">
                        <FaUserFriends className=' text-[#fff] text-[20px] font-semibold ' />
                        <span className='text-[#fff] font-semibold'>Bạn Bè</span>
                    </div>
                    <span className='text-[#fff] cursor-pointer' onClick={() => handleContentChange(1)}>Hoạt động</span>
                    <span className='text-[#fff] cursor-pointer' onClick={() => handleContentChange(2)}>Tất cả</span>
                    <span className='text-[#fff] cursor-pointer' onClick={() => handleContentChange(3)}>Chờ xác nhận</span>
                    <span className='text-[#fff] cursor-pointer' onClick={() => handleContentChange(4)}>Chặn</span>
                    <button className='text-[#fff] bg-[#248046] px-1 rounded-[3px]' onClick={() => handleContentChange(5)}>Thêm bạn bè</button>
                </div>
                <div className='flex items-center gap-3'>
                    <div className="relative">
                        <BiSolidMessageRoundedAdd className='text-[#fff] text-[25px]' />
                        <div className="absolute top-0 right-0">
                            <span className='bg-red-500 text-[#fff] w-[20px]  flex justify-center rounded-full'>{friendRequestsCount}</span>
                        </div>
                    </div>
                    <BsMailbox2Flag className='text-[#fff]  text-[25px] ' />
                </div>
            </div>

        </>
    );
};

export default Navigation;
