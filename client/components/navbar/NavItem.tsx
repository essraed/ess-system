import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  title: string;
  href?: string;
}

const NavItem = ({ title, href = "" }: Props) => {
  const pathname = usePathname();
  const { t } = useTranslation();

  const isActive = pathname === href;
  return (
    <Link href={href}>
      <div
        className={`text-slate-100 text-md font-semibold
            ${
              isActive
                ? "text-slate-400 font-bold text-xl"
                : ''
            } `}
      >
        { t(title)}
      </div>
    </Link>
  );
};

export default NavItem;
