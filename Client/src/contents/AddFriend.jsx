import debounce from 'lodash.debounce';
import { useContext, useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import SearchFriends from "../components/Search/SearchFriends";
import userService from "../services/User";
import { IoCloseSharp } from '../icons/ReactIcon/AddFriendIcon.js';
import { UserContext } from '../hooks/contexts/UserLogin';
import { showToastSuccess, showToastError } from '../config/toastConfig.js';
import socket from '../config/socketConfig.js';

const AddFriend = () => {
    const { user } = useContext(UserContext);
    const googleId = user?.id;

    const [searchFriend, setSearchFriend] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [valuePlaceholder, setValuePlaceholder] = useState("Bạn có thể thêm bạn bè bằng tên người dùng");
    const [friendSelect, setFriendSelect] = useState({});
    const [showFriendSelected, setShowFriendSelected] = useState(false);

    // Mutation to send friend request
    const sendFriendRequestMutation = userService.useSendFriendRequest();

    // Fetch current user details
    const { data: userDetails } = userService.useGetAnUser(googleId);
    // Search for friends
    const { data, isLoading, error } = userService.useSearchAddFriend(debouncedSearch);

    useEffect(() => {

        showToastError(sendFriendRequestMutation.error?.response?.data?.message);
        showToastSuccess(sendFriendRequestMutation.data?.message);
    }, [sendFriendRequestMutation.data, sendFriendRequestMutation.error]);

    useEffect(() => {
        const delaySearch = debounce(() => {
            setDebouncedSearch(searchFriend.trim());
        }, 800);
        delaySearch();
        return () => {
            delaySearch.cancel();
        };
    }, [searchFriend]);

    const handleSearchFriend = (event) => {
        setSearchFriend(event.target.value);
    };

    const handleSelectFriend = (selectedFriend) => {
        setFriendSelect(selectedFriend);
        setShowFriendSelected(true);
    };
    const handleSendRequest = () => {
        if (!friendSelect?._id || !userDetails?.name) {
            return;
        }
        const dataSend = {
            username: userDetails.name, //gửi
            toUserId: friendSelect._id,     //nhận
        }
        console.log( dataSend);
        if (socket && socket.emit) {
            socket.emit('sendFriendRequest', dataSend);
        } else {
            console.error("socket chưa được khởi tạo hoặc không có phương thức emit");
        }

        if (sendFriendRequestMutation && sendFriendRequestMutation.mutate) {
            sendFriendRequestMutation.mutate(
                { fromUserId: userDetails._id, toUserId: friendSelect._id }
            );
        } else {
            console.error("sendFriendRequestMutation chưa được khởi tạo hoặc không có phương thức mutate");
        }

        if (handleCancelAddFriend && typeof handleCancelAddFriend === 'function') {
            handleCancelAddFriend();
        } else {
            console.error("handleCancelAddFriend không được định nghĩa hoặc không phải là một hàm");
        }
    };

    const handleCancelAddFriend = () => {
        setSearchFriend("");
        setFriendSelect({});
        setShowFriendSelected(false);
        setValuePlaceholder('Bạn có thể thêm bạn bè bằng tên người dùng');
    };

    return (
        <>
            <div className="p-5 bg-[#313338]">
                <h1 className="text-[#fff] my-2">THÊM BẠN BÈ</h1>
                <span className="text-[#a8a8a8]">Bạn có thể thêm bạn bè bằng tên người dùng </span>
                <div className="mt-3 relative">
                    <SearchFriends
                        style="bg-[#1E1F22] pl-3 py-3 rounded-[5px] w-full text-[#fff] border border-gray-300 focus:border-blue-500 focus:outline-none"
                        placeholder={valuePlaceholder}
                        nameButtonSearch="Gửi Yêu cầu"
                        onChange={handleSearchFriend}
                        value={searchFriend}
                        friendSelect={friendSelect}
                        onSendRequest={handleSendRequest}
                        CloseAddFriend={<IoCloseSharp className='text-[#fff] cursor-pointer text-[25px]' />}
                        handleCancelAddFriend={handleCancelAddFriend}
                        showFriendSelected={showFriendSelected}
                    />
                    {isLoading && (
                        <div className="absolute left-0 right-0 bg-[#1E1F22] py-2 px-4 rounded-b-md flex justify-center items-center">
                            <ClipLoader color="#fff" size={30} />
                        </div>
                    )}
                    {error && (
                        <div className="absolute left-0 right-0 bg-[#1E1F22] py-2 px-4 rounded-b-md text-red-500">
                            Error: {error.message}
                        </div>
                    )}
                    {data && data.length > 0 && (
                        <div className="absolute left-0 right-0 bg-[#1E1F22] p-2 rounded-b-md mt-1 max-h-60 overflow-y-auto">
                            {data.map((friendSearch) => (
                                <div
                                    onClick={() => handleSelectFriend(friendSearch)}
                                    className="flex items-center gap-3 my-3 cursor-pointer w-full hover:bg-[#292929] duration-300 p-2 rounded-[5px]"
                                    key={friendSearch._id}
                                >
                                    <img className="w-[30px] rounded-full" src={friendSearch.profileImage} alt="" />
                                    <span className="block text-[#fff] text-[14px]">{friendSearch.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AddFriend;
