import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient()
import App from './App.jsx'
import './index.css'
import ContentProvider from './hooks/contexts/TabUiContext.jsx';
import UserProvider from './hooks/contexts/UserLogin.jsx';
import UserRomProvider from './hooks/contexts/UserContext.jsx';
import UserOnlineProvider from './hooks/contexts/UserOnlineContext.jsx';
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
ReactDOM.createRoot(document.getElementById('root')).render(
    <ClerkProvider publishableKey={clerkPubKey}>
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <UserOnlineProvider>
                    <UserRomProvider>
                        <ContentProvider>
                            <Router>
                                <App />
                            </Router>
                        </ContentProvider>
                    </UserRomProvider>
                </UserOnlineProvider>
            </UserProvider>
        </QueryClientProvider>
    </ClerkProvider>
)
