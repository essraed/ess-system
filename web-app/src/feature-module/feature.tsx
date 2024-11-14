import React, { useEffect } from "react";
import AllRoutes from "./router/router";
import { useDispatch, useSelector } from "react-redux";
import {
  // set_current_route,
  // set_current_route_array,
  set_is_mobile_sidebar,
} from "../core/data/redux/action";
import { observer } from "mobx-react-lite";
import { useStore } from "../app/stores/store";
import { initializeUserAndLanguageSettings } from "../lib/userLanguageSettings";
// import { useLocation } from "react-router-dom";

const Feature = () => {
  const mobileSidebar = useSelector((state: any) => state.mobileSidebar);
  // const [currentRoute, setCurrentRoute] = useState(location.pathname);
  // const location = useLocation();
  const dispatch = useDispatch();

  // const getRoutes = () => {
  //   setCurrentRoute(location.pathname);
  //   const splitVal = location.pathname.split("/");
  //   const route_data = {
  //     base: splitVal[1],
  //     page: splitVal[2] || "",
  //     last: splitVal[3] || "",
  //   };
  //   dispatch(set_current_route_array(splitVal));
  //   dispatch(set_current_route(route_data));
  //   dispatch(set_is_mobile_sidebar(false));
  // };

  const { userStore } = useStore();

  useEffect(() => {
    initializeUserAndLanguageSettings(userStore);
  }, [userStore]);

  useEffect(() => {
    dispatch(set_is_mobile_sidebar(false));
  }, [location, dispatch]);

  return (
    <>
      <div className={`main-wrapper ${mobileSidebar ? "menu-opened true" : "false"}`}>
        <AllRoutes />
      </div>
    </>
  );
};

export default observer (Feature);
