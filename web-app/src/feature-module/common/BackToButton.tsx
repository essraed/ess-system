
import { observer } from "mobx-react-lite";
import React from "react";
import { CornerDownLeft } from "react-feather";
import { useStore } from "../../app/stores/store";
import { Link } from "react-router-dom";

type Props = {
  href: string;
  label: string;
};

const BackToButton = ({ href, label }: Props) => {
  const { userStore } = useStore();
  const isRTL = userStore.language === "ar";

  return (
    <Link to={href} className="flex flex-row items-center gap-3 btn sign-up btn btn-view-custom">
      <span>
        <CornerDownLeft
          style={{ transform: isRTL ? "rotate(180deg)" : "none" }}
        />
      </span>{" "}
      {label}
    </Link>
  );
};

export default observer(BackToButton);
