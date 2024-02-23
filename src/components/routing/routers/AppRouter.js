import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {GameGuard} from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import {LoginGuard} from "../routeProtectors/LoginGuard";
import Login from "../../views/Login";
import Register from "components/views/Register";
import ProfilePage from "components/views/Profile";
import EditProfile from "components/views/EditProfile";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reactrouter.com/en/main/start/tutorial 
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/game/*" element={<GameGuard />}>
          <Route index element={<GameRouter base="/game" />} />
        </Route>

        {/* Assuming LoginGuard and GameGuard components are updated to work with React Router v6 */}
        <Route path="/login" element={<LoginGuard />}>
          <Route index element={<Login />} />
        </Route>


        {/* guard to rergister */}
        <Route path="/register" element={<LoginGuard />}>
          <Route index element={<Register />} />
        </Route>

        {/* guard to user profile page */}
        <Route path="/user/:id" element={<GameGuard />}>
          <Route index element={<ProfilePage />} />
        </Route>

        <Route path="/editprofile" element={<GameGuard />}>
          <Route index element={<EditProfile />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;