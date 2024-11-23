import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { GiBriefcase } from "react-icons/gi";

import { useTranslation } from "react-i18next";

import { useNavigate, useParams } from "react-router-dom";

import { observer } from "mobx-react-lite";
import ServiceForm from "./ServiceForm";
import { useStore } from "../../app/stores/store";

const ServiceUpdate = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [summaryErrors, setSummaryErrors] = useState<string[] | null>(null);
  const {
    serviceStore: { getService, currentService },
    userStore,
  } = useStore();


  useEffect(() => {
    if (id) {

      getService(id); // Fetch the existing service if we have an id
    }
  }, [getService, id]);

  if (!currentService) return <p>Loading...</p>

  
  return (
    <>
      <Card className="my-10 container">
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-3">
              <h1 className="text-3xl font-semibold">
                {t("Update Service")}
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

          <ServiceForm service={currentService} id={id} key={currentService.id || 'new'}/>
        </CardBody>
      </Card>
    </>
  );
};

export default observer(ServiceUpdate);
