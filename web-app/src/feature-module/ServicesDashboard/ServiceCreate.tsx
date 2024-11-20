import React, { useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { GiBriefcase } from "react-icons/gi";

import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";

import { observer } from "mobx-react-lite";
import ServiceForm from "./ServiceForm";
import { useStore } from "../../app/stores/store";

const ServiceCreate = () => {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [summaryErrors, setSummaryErrors] = useState<string[] | null>(null);
  const {
    userStore,
  } = useStore();

  

  const isRTL = userStore.language === "ar";

  return (
    <>
      <Card className="my-10 container">
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-3">
              <GiBriefcase size={40} />
              <h1 className="text-3xl font-semibold">
                {t("Generate ChatGPT Result")}
              </h1>
            </div>
          </div>
          <div></div>
        </CardHeader>
        <CardBody className="flex flex-col gap-10">
          {summaryErrors && (
            <div className="bg-red-200 p-2 text-sm rounded-md">
              {summaryErrors.map((err, idx) => (
                <p key={idx} className="text-red-600 mb-2 text-sm">
                  {err}
                </p>
              ))}
            </div>
          )}

          <ServiceForm />

        </CardBody>
      </Card>
    </>
  );
};

export default observer (ServiceCreate);
