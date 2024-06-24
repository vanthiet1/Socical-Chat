import { createContext } from "react";
import {useUser } from '@clerk/clerk-react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const { user } = useUser();

    return (
        <div>
            <UserContext.Provider value={{user}}>
                {children}
            </UserContext.Provider>
        </div>
    );
};

export default UserProvider;
