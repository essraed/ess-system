import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { all_routes } from "./all_routes";
import { observer } from "mobx-react-lite";
import { initializeUserAndLanguageSettings } from "../../lib/userLanguageSettings";

export default observer( function RequireAuth() {
    const {userStore} = useStore();
    const location = useLocation();

    useEffect(() => {
      initializeUserAndLanguageSettings(userStore).then(() => {
        if (!userStore.isLoggedIn) {
          toast.error('Unauthorized!');
          return <Navigate to={all_routes.homeOne} state={{from: location}} />
      }
      });
    }, [userStore]);

    return <Outlet />
})