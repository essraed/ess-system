import { Navbar, NavbarContent } from "@nextui-org/react";
import React from "react";
import { BurguerButton } from "./burguer-button";
import { NotificationsDropdown } from "./notifications-dropdown";
import UserDropdown from "./user-dropdown";

import Logo from "../Logo";
import MainNavbar from "./MainNavbar";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <div className="py-2">
        <Logo />
      </div>
      <MainNavbar />
      {children}
    </div>
  );
};
