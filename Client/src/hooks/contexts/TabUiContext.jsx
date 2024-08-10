import { createContext, useState } from "react";

export const ContentContext = createContext();

const ContentProvider = ({ children }) => {
    const [activeContent, setActiveContent] = useState(2);
    
    const handleContentChange = (index) => {
        setActiveContent(index);
    };

    const contextValue = {
        activeContent,
        handleContentChange,
    };

    return (
        <div>
            <ContentContext.Provider value={contextValue}>
                {children}
            </ContentContext.Provider>
        </div>
    );
};

export default ContentProvider;
