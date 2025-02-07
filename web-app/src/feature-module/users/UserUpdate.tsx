
import React, { useEffect } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

import { useTranslation } from "react-i18next";

import { useNavigate, useParams } from "react-router-dom";

import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import BackToButton from "../common/BackToButton";
import { all_routes } from "../router/all_routes";
import LoadingSpinner from "../common/LoadingSpinner";
import toast from "react-hot-toast";
import UserUpdateForm from "./UserUpdateForm";

const UserUpdate = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    userStore: { getUSer, editUser,isAdmin,token },
  } = useStore();

  useEffect(() => {
    if (id) {

      getUSer(id);
    }
  }, [getUSer, id]);

  useEffect(() => {
    if (!isAdmin()) {
      navigate("/login");
      toast.error("Unauthorized");
    } 
  }, [token]);

  if (!editUser) return <LoadingSpinner />;
  return (
    <>
      <Card className="mt-5 mb-20 custom-container">
        <CardHeader className="flex justify-between gap-3 flex-wrap">

          <div>
            <BackToButton
              href={all_routes.UserDashboard}
              label="Back To Services"
            />
          </div>
          <div>
            <h1 className="text-3xl font-semibold">
              {t("Create Service")}
            </h1>
          </div>
          <div className="w-2/12"></div>
        </CardHeader>
        <CardBody className="flex flex-col gap-10">
          <UserUpdateForm
            user={editUser}
            id={id}
            key={editUser.id || "new"}
          />
        </CardBody>
      </Card>
    </>

  );
};

export default observer(UserUpdate);
