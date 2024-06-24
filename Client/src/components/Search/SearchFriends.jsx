
const SearchFriends = (props) => {
    const { placeholder, style, nameButtonSearch, value, onChange, friendSelect, onSendRequest, CloseAddFriend, handleCancelAddFriend, showFriendSelected } = props;
    return (
        <>
            <div className="relative">
                <input
                    className={` ${style}`}
                    type="text"
                    placeholder={placeholder || undefined}
                    value={value}
                    onChange={onChange}
                    disabled={!!friendSelect._id}
                />
                <div className="absolute top-2 right-4">
                    <button className={`px-[30px] py-[5px] rounded-[5px] font-semibold ${friendSelect._id ? 'bg-[#5865f2] text-[#fff]' : 'text-[#8D8D91] bg-[#3b428a]'}`}
                        disabled={!friendSelect._id} 
                        onClick={onSendRequest}
                    >
                        {nameButtonSearch}
                    </button>
                </div>

                {showFriendSelected && (
                    <div className="absolute top-[5px] left-1 flex items-center gap-2 h-[40px] bg-[#5865F2] rounded-[5px] ">
                        <img className="w-[30px] rounded-full" src={friendSelect?.profileImage} alt="" />
                        <span className="text-[#fff]">{friendSelect?.name}</span>
                        <span onClick={() => handleCancelAddFriend()}>{CloseAddFriend}</span>
                    </div>
                )
                }
            </div>
        </>
    );
};

export default SearchFriends;