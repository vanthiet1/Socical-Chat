import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useClerk } from '@clerk/clerk-react';
import { useContext } from 'react';
import { ListPage } from "../components/ListPage/page.jsx"
import { GoPlus, IoSettingsSharp, ImExit } from '../icons/ReactIcon/SideBarIcon.js'
import User from '../components/Friend/ListFriend.jsx';
import { FaArrowLeft } from "react-icons/fa";
import userService from '../services/User.js';
import { UserContext } from '../hooks/contexts/UserLogin.jsx';
import { ContentContext } from '../hooks/contexts/TabUiContext.jsx';
const Sidebar = (props) => {
    const { showSIdeBar } = props
    const { signOut } = useClerk();
    const { user } = useContext(UserContext);
    const saveUserMutation = userService.useSaveUser();
    const { handleContentChange } = useContext(ContentContext)


    useEffect(() => {
        if (user) {
            saveUserMutation.mutate({
                googleId: user.id,
                name: user.fullName,
                email: user.externalAccounts[0].emailAddress,
                profileImage: user.imageUrl,
            });
        }
    }, [user]);

    return (
        <div className=" bg-sidebar p-5 relative h-full">
            <div className="bg-[#1E1F22] pl-2 py-1 rounded-[5px] w-full cursor-pointer mb-3 flex justify-between max-sm:p-4 items-center">
                <span className="text-[#acacac]">Tìm hoặc bắt đầu cuộc trò chuyện</span>
                <div>
                    <span className='text-[#fff] max-sm:hidden' onClick={()=>handleContentChange(2)}>Quay lại</span>
                    <FaArrowLeft className=' hidden max-sm:block text-[#fff]' onClick={() => showSIdeBar(true)} />
                </div>

            </div>
            <div>
                {ListPage.map((page, index) => (
                    <div key={index}>
                        <Link>
                            <div className="bg-[#404148] py-2 pl-2 rounded-[5px] hover:bg-[#36363a]" onClick={() => handleContentChange(2)}>
                                <li className="flex items-center gap-3 text-[#fff]">
                                    {page.iconPage} {page.namePage}</li>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <div className='my-3 flex justify-between items-center'>
                <span className='text-[#c2c2c2] group-hover:text-[#fff] hover:text-[#fff]  '>Chọn bạn bè để nhắn</span>
                <GoPlus className='text-[#c2c2c2]  hover:cursor-pointer hover:text-[#fff] text-[20px]' />
            </div>
            <User showSIdeBar={showSIdeBar} />
            <div className=" w-full absolute bottom-0 left-0 p-2 bg-[#161616] flex items-center justify-between ">
                <div className='flex items-end gap-2 '>
                    <img src={user.imageUrl} className="w-[50px] rounded-full" alt="avartar" />
                    <div>
                        <span className="block text-[#fff] text-[16px]">
                            {user.fullName}
                        </span>
                        <span className="block text-[#fff] text-[12px]">Online</span>
                    </div>

                </div>
                <div className='flex gap-3 '>

                    <IoSettingsSharp className='text-[#fff] cursor-pointer text-[20px]' />
                    <ImExit className='text-[#fff] cursor-pointer text-[20px]' onClick={() => signOut()} />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;