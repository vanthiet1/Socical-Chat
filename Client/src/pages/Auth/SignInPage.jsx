import { SignIn } from '@clerk/clerk-react';
import PathRouterUser from '../../config/pathRouter';
const SignInPage = () => (
    <div>
         <SignIn path={PathRouterUser.SignInPage} routing="path" signUpUrl={PathRouterUser.SignUpPage}  forceRedirectUrl={PathRouterUser.Home} />
    </div>
);

export default SignInPage;
