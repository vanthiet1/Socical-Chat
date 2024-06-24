import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient()
import App from './App.jsx'
import './index.css'
import ContentProvider from './hooks/contexts/TabUiContext.jsx';
import UserProvider from './hooks/contexts/UserLogin.jsx';
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
ReactDOM.createRoot(document.getElementById('root')).render(
    <ClerkProvider publishableKey={clerkPubKey}>
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <ContentProvider>
                    <Router>
                        <App />
                    </Router>
                </ContentProvider>
            </UserProvider>
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    </ClerkProvider>
)
