
const NavProfile = (props) => {
    const { avatar_user_room , name_user_room , isOnline} = props
    console.log(isOnline);
    
    
    return (
        <>
            <div className="flex justify-between items-center py-2 px-4 bg-[#313338] ">
                <div className="flex items-center gap-2">
                <div className="relative">
                    <img className="w-[30px] h-[30px] rounded-full" src={avatar_user_room} alt="" />
                    <div className={`absolute bottom-0 right-0 rounded-full w-[12px] h-[12px] border-2 border-slate-700 ${isOnline ? 'bg-green-600' : 'bg-gray-400'}`}>
                    </div>
                </div>
                    <span className="text-[16px] text-[#fff]">{name_user_room}</span>
                
                </div>
               
            </div>
        </>
    );
};

export default NavProfile;