import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import ServiceForm from "./ServiceForm";

const ServiceCreate = () => {

  const { t } = useTranslation();

  return (
    <>
      <Card className="my-10 container">
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-3">
              <h1 className="text-3xl font-semibold">
                {t("Create Service")}
              </h1>
            </div>
          </div>
          <div></div>
        </CardHeader>
        <CardBody className="flex flex-col gap-10">
          <ServiceForm />
        </CardBody>
      </Card>
    </>
  );
};

export default observer (ServiceCreate);
