import Sidebar from "../layout/Sidebar";
import Navigation from "../layout/Navigation";
import Main from "../layout/Main";
const Friends = () => {
  return (
    <>
  
      <div className="flex justify-between w-full h-dvh">
        <div className="w-[25%] ">
          <Sidebar />
        </div>
        <div className="w-[75%]  overflow-hidden">
          <Navigation />
          <Main />
        </div>
      </div>

    </>
  );
};

export default Friends;
