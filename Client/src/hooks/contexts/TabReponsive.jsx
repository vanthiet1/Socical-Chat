import { createContext, useState } from "react";

export const ReponsiveContext = createContext()
const TabReponsive = ({children}) => {
    const [sidebar,setSidebar] = useState(true)
    const showSIdeBar = ()=>{
        setSidebar(!sidebar)
    }
    const data = {
        sidebar,
        showSIdeBar
    }
    return (
        <div>
            <ReponsiveContext.Provider value={{data}}>
                {children}
            </ReponsiveContext.Provider>
        </div>
    );
};

export default TabReponsive;