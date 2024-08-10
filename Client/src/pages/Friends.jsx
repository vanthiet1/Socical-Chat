import Sidebar from "../layout/Sidebar";
import Navigation from "../layout/Navigation";
import Main from "../layout/Main";
import { useState } from "react";
// import { useContext } from "react";
// import { ReponsiveContext } from "../hooks/contexts/TabReponsive";

const Friends = () => {
  // const { sidebar } = useContext(ReponsiveContext);
  const [sidebar,setSidebar] = useState(true)
  const showSIdeBar = (isShow)=>{
    setSidebar(isShow)
}

   
  return (
    <div className="flex justify-between w-full h-dvh">
      <div 
        className={`max-md:w-full max-sm:fixed ${sidebar ? 'max-sm:left-[-100%]' : 'max-sm:left-[0px]'} max-md:z-50 w-[25%] max-md:h-dvh transition-all duration-300`}>
        <Sidebar showSIdeBar={showSIdeBar} />
      </div>
      <div className="max-md:w-[100%] w-[75%] overflow-hidden">
        <Navigation showSIdeBar={showSIdeBar} />
        <Main />
      </div>
    </div>
  );
};

export default Friends;
