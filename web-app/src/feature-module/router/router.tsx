import React from "react";
import {
  authenticationRoute,
  blogroutes,
  listingroutes,
  pageroutes,
  publicRoutes,
  usermodule,
} from "./router.link";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Header from "../common/header";
import Footer from "../common/footer";
import Progress from "../common/progressbar";
import { all_routes } from "./all_routes";
import RequireAuth from "./RequireAuth";

const AllRoutes = () => {
  const routes =all_routes
  const HeaderLayout = () => (
    <>
      <Outlet />
      <Progress />
    </>
  );

  const PageLayout = () => (
    <>
      <Header />
      <Outlet />
      <Progress />
      <Footer />
    </>
  );
  const UserLayout = () => (
    <>
      <Header />
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
            element={<Navigate to={routes.homeOne} />}
          />
        <Route path={"/"} element={<HeaderLayout />}>
          {publicRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
        <Route path={"/pages"} element={<PageLayout />}>
          {pageroutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
        <Route path={"/blog"} element={<PageLayout />}>
          {blogroutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
        <Route element={<RequireAuth />}>

              <Route path={"/listings"} element={<PageLayout />}>
                {listingroutes.map((route, idx) => (
                  <Route path={route.path} element={route.element} key={idx} />
                ))}
              </Route>
        </Route>
        <Route path={"/user"} element={<UserLayout />}>
          {usermodule.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
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
export default AllRoutes;
