import PathRouterUser from "../config/pathRouter"
import SignInPage from "../pages/Auth/SignInPage"
import SignUpPage from "../pages/Auth/SignUpPage"
import Friends from "../pages/Friends"
const PublicRouterUser = [
    {
        path: PathRouterUser.SignInPage,
        component: SignInPage,
        private: false,
    },
    {
        path: PathRouterUser.SignUpPage,
        component: SignUpPage,
        private: false,
    },
    {
        path: PathRouterUser.Frinends,
        component: Friends,
        private: true,
    },

    

   
]
export default PublicRouterUser