import React, { useEffect } from "react";
import AllRoutes from "./router/router";
import { useSelector } from "react-redux";
import { observer } from "mobx-react-lite";
import { useStore } from "../app/stores/store";
import { initializeUserAndLanguageSettings } from "../lib/userLanguageSettings";
// import { useLocation } from "react-router-dom";

const Feature = () => {
  const mobileSidebar = useSelector((state: any) => state.mobileSidebar);
  const { userStore } = useStore();

  useEffect(() => {
    initializeUserAndLanguageSettings(userStore);
  }, [userStore]);

  return (
    <>
      <div className={`main-wrapper ${mobileSidebar ? "menu-opened true" : "false"}`}>
        <AllRoutes />
      </div>
    </>
  );
};

export default observer (Feature);
