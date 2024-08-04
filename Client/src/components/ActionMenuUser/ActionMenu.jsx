import friendService from "../../services/Friend";
import userService from "../../services/User";
const ActionMenu = (props) => {
    const {toUserId , fromUserId} = props;
    const {data} = userService.useGetAnUser(fromUserId)

    const unFriendMutation = friendService.useUnFriendRequest();

    const handleUnFriend= () => {
        const DataUnFriend= {
            fromUserId: data?._id,
            toUserId: toUserId
        }
        if (unFriendMutation) {
            unFriendMutation.mutate(DataUnFriend)
        }
    }

    return (
        <>
            <div className="w-[200px] absolute z-10 bg-[#343434] p-2 bottom-[-130px] left-[-150px] rounded-[5px]">
                <span className=" w-full block rounded-[5px] p-1 mb-1 cursor-pointer duration-300   text-[#fff] hover:bg-[#525252]" onClick={handleUnFriend}>Hủy Kết Bạn</span>
                <span className=" w-full block rounded-[5px] p-1 mb-1  text-[#fff] hover:bg-[#525252]">Cuộc Gọi Thoại</span>
                <span className=" w-full block rounded-[5px] p-1 mb-1 text-[#fff] hover:bg-[#525252]"> Cuộc Gọi Thoại Video</span>
            </div>
        </>
    );
};

export default ActionMenu;