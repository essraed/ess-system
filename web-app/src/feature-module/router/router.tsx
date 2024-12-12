import React, { useEffect } from "react";
import {
  authenticationRoute,
  listingroutes,
  publicRoutes,
} from "./router.link";
import { Outlet, Route, Routes } from "react-router-dom";
import Header from "../common/header";
import Footer from "../common/footer";
import Progress from "../common/progressbar";

import RequireAuth from "./RequireAuth";
import { observer } from "mobx-react-lite";
import { initializeUserAndLanguageSettings } from "../../lib/userLanguageSettings";
import { useStore } from "../../app/stores/store";
import HomeOne from "../home/home-one/home-one";
import { FloatingWhatsApp } from "react-floating-whatsapp";

const AllRoutes = () => {

  const { userStore } = useStore();

  useEffect(() => {
    initializeUserAndLanguageSettings(userStore);
  }, [userStore]);

  const HeaderLayout = () => (
    <>
     <FloatingWhatsApp
        phoneNumber="97143426666"
        accountName="Karama Business Center"
        avatar="assets/img/logo-small.png"
        allowEsc
        allowClickAway
        notification
        notificationSound
      />
      <Outlet />
      <Progress />
    </>
  );

  const PageLayout = () => (
    <>
      <Header />
      <FloatingWhatsApp
        phoneNumber="97143426666"
        accountName="Karama Business Center"
        avatar="assets/img/logo-small.png"
        allowEsc
        allowClickAway
        notification
        notificationSound
      />
      <Outlet />
      <Progress />
      <Footer />
    </>
  );

  return (
    <>
      <Routes>
        <Route

          path="/"
          element={<HomeOne />}
        />

        <Route path={"/"} element={<HeaderLayout />}>
          {publicRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
        {/* <Route path={"/pages"} element={<PageLayout />}>
          {pageroutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route> */}
        <Route element={<RequireAuth />}>
          <Route path={"/listings"} element={<PageLayout />}>
            {listingroutes.map((route, idx) => (
              <Route path={route.path} element={route.element} key={idx} />
            ))}
          </Route>

        </Route>
        <Route path={"/"}>
          {authenticationRoute.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
      </Routes>
    </>
  );
};

export default observer(AllRoutes);

