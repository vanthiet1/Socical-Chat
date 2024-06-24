import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { SignedOut } from '@clerk/clerk-react';
import PublicRouterUser from "./router/UserRouter";
import PrivateRoute from "./router/PrivateRouter";
import PathRouterUser from './config/pathRouter';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        {PublicRouterUser.map((route, index) => {
          if (route.private) {
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <PrivateRoute>
                    <route.component />
                  </PrivateRoute>
                }
              />
            );
          } else {
            return (
              <Route
                key={index}
                path={route.path}
                element={<SignedOut><route.component /></SignedOut>}
              />
            );
          }
        })}
        <Route path="*" element={<Navigate to={PathRouterUser.Frinends} />} />
      </Routes>
    </div>
  );
};

export default App;
