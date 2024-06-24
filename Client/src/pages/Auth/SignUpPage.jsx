import { SignUp } from '@clerk/clerk-react';
import PathRouterUser from '../../config/pathRouter';

const SignUpPage = () => (
  <div>
    <SignUp path={PathRouterUser.SignUpPage} routing="path" signInUrl={PathRouterUser.SignInPage} />
  </div>
);

export default SignUpPage;
