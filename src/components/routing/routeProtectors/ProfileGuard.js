import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { api } from "../../../helpers/api";

/**
 * @Guard
 * ProfileGuard interfaces can tell the router whether or not it should allow navigation to a requested route.
 * They are functional components. Based on the condition, a route gets rendered.
 * In this case, it checks if the user list is empty by fetching the users. If it's empty, redirects to the /register.
 * If the user is authenticated (i.e., a token is stored in local storage), <Outlet /> is rendered,
 * allowing the content inside the <ProfileGuard> in the App.js file to be accessed.
 * If the user isn't authenticated, the component redirects to the /login screen.
 * @param props
 */
export const ProfileGuard = () => {
    // Function to fetch users
    async function fetchUsers() {
        try {
            const response = await api.get('/users');
            if (!response.data.length) {
                localStorage.clear();
                return <Navigate to="/register" replace />;
            }
        } catch (error) {
            alert("No users in DataBase, please click on Logout!");
        }
    }

    // Immediately invoke the async function to fetch users
    fetchUsers();

    // Check if the user is authenticated
    if (localStorage.getItem("token")) {
        // If authenticated, render the Outlet to allow navigating to the child route
        return <Outlet />;
    }

    // If not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
};

// Define propTypes for the component
ProfileGuard.propTypes = {
    children: PropTypes.node
};
