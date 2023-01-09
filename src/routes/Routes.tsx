//Basic Imports
import { Route, Routes } from "react-router";
import ProtectedRoute, { ProtectedRouteProps } from "./ProtectedRouter";


// Pages
import Auth from "../components/pages/Auth/Auth";

import SessionExpired from "../components/pages/Auth/SessionExpired";
import UserProfile from "../components/pages/Profile/Profile";
import UserDashboard from "../components/pages/Dashboard/Dashboard";
import MySports from "../components/pages/Profile/MySports/MySports";
import SelectedProfile from "../components/pages/Profile/SelectedProfile/SelectedProfile";
import TimelinePost from "../components/pages/Timeline/TimelinePost"
//Types
const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
  authenticationPath: "/login",
};

const ApplicationRoutes: React.FunctionComponent= () => {
    

  return (
    <>
      <Routes>
        {/* Guest Routes */}
        <Route path="/login" element={<Auth comp={"signIn"} />} />
        <Route path="/signup" element={<Auth comp={"signUp"} />} />
        <Route path="/forgot" element={<Auth comp={"forgot"} />} />
        <Route path="/verify" element={<Auth comp={"activate"} />} />
        <Route path="/reset" element={<Auth comp={"reset"} />} />

        {/* Authenticated Routes */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<UserDashboard />}
            />

          }
        />
        <Route
          path="mySports"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}

              outlet={<MySports />}

            />
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}

              outlet={<UserProfile />}

            />
          }
        />
        <Route
          path="sessionExpired"
          element={<SessionExpired />}
          
        />


        <Route
          path="/"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<UserProfile />}

            />
          }
        />

        <Route
          path="publicProfile"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<SelectedProfile />}

            />
          }
        />
     
        <Route
          path="timeline"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<TimelinePost />}

            />
          }
        />
      </Routes>
    </>
  );
};

export default ApplicationRoutes;
