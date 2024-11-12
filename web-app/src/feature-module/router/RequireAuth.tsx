import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import React from "react";
import toast from "react-hot-toast";
import { all_routes } from "./all_routes";

export default function RequireAuth() {
    const {userStore: {isLoggedIn}} = useStore();
    const location = useLocation();

    if (!isLoggedIn) {
        toast.error('Unauthorized!');
        return <Navigate to={all_routes.homeOne} state={{from: location}} />
    }

    return <Outlet />
}