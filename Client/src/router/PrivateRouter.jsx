import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import PathRouterUser from '../config/pathRouter';

const PrivateRoute = ({ children }) => {
    return (
        <>
            <SignedIn>
                {children}
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn redirectUrl={PathRouterUser.Home} />
            </SignedOut>
        </>
    );
};

export default PrivateRoute;
