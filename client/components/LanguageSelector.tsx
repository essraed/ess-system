
"use client";
import React from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Button,
} from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/store";
import { GrLanguage } from "react-icons/gr";

const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const { userStore } = useStore();

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    userStore.setLanguage(lang);

    // Set direction based on the selected language
    if (lang === 'ar') {
      document.documentElement.setAttribute('lang', 'ar');
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('lang', 'en');
      document.documentElement.setAttribute('dir', 'ltr');
    }
  };
  

  return (
    <Dropdown radius="none">
      <DropdownTrigger>
        <span className="text-3xl cursor-pointer text-slate-800">
        <GrLanguage size={30} />
        </span>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Page size options"
        selectionMode="single"
        onSelectionChange={(key) =>
          handleChangeLanguage(String(key.currentKey))
        }
      >
        <DropdownItem key="en">
          <div className="flex items-center">
            <span className="ml-2">English</span>
          </div>
        </DropdownItem>
        <DropdownItem key="ar">
          <div className="flex items-center">
            <span className="ml-2">عربي</span>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default observer(LanguageSwitcher);
