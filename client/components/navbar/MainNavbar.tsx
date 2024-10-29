import { Navbar, NavbarContent } from '@nextui-org/react'
import React from 'react'
import { NotificationsDropdown } from './notifications-dropdown'
import UserDropdown from './user-dropdown'
import { BurguerButton } from './burguer-button'
import LanguageSwitcher from "@/components/LanguageSelector";
import NavItem from './NavItem'

const MainNavbar = () => {

    return (
        <Navbar
        className="w-full border-y-1 bg-teal-600"
        classNames={{
            wrapper: "w-full max-w-full",
        }}
    >
        <NavbarContent className="md:hidden">
            <BurguerButton />
        </NavbarContent>
        <NavbarContent className=" flex items-center gap-5 w-full max-md:hidden">
            <NavItem  title='Letters' href='/documents'  />
            <NavItem title='Authorities' href='/authority'  />
        </NavbarContent>
        <NavbarContent
            justify="end"
            className="w-fit data-[justify=end]:flex-grow-0"
        >
            <LanguageSwitcher />

            <NotificationsDropdown />

            <NavbarContent>
                <UserDropdown />
            </NavbarContent>
        </NavbarContent>
    </Navbar>
    )
}

export default MainNavbar