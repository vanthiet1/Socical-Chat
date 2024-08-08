import { useContext, useEffect } from "react";
import { ContentContext } from "../hooks/contexts/TabUiContext";
import AllUser from "../contents/AllUser";
import AddFriend from "../contents/AddFriend";
import Chat from "../contents/Room/Chat";
import PendingConfirm from "../contents/PendingConfirm";
import { UserContext } from "../hooks/contexts/UserLogin";
import userService from "../services/User";
const Main = () => {

  const { activeContent } = useContext(ContentContext)
  const { user } = useContext(UserContext);
  const saveUserMutation = userService.useSaveUser();

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
    <>
      <div  >
        {activeContent === 2 && (<AllUser />)}
        {activeContent === 3 && (<PendingConfirm />)}
        {activeContent === 5 && (<AddFriend />)}
        {activeContent === 6 && (<Chat />)}

      </div>
    </>
  );
};

export default Main;