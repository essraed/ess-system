
import React, { useEffect } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

import { useTranslation } from "react-i18next";

import { useParams } from "react-router-dom";

import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import ServiceForm from "./ServiceForm";
import BackToButton from "../common/BackToButton";
import { all_routes } from "../router/all_routes";
import LoadingSpinner from "../common/LoadingSpinner";

const ServiceUpdate = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const {
    serviceStore: { getService, currentService },
  } = useStore();

  useEffect(() => {
    if (id) {

      getService(id); // Fetch the existing service if we have an id
    }
  }, [getService, id]);

  if (!currentService) return <LoadingSpinner />;
  return (
    <>
      <Card className="mt-5 mb-20 custom-container">
        <CardHeader className="flex justify-between gap-3 flex-wrap">

          <div>
            <BackToButton
              href={all_routes.serviceDashboard}
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
          <ServiceForm
            service={currentService}
            id={id}
            key={currentService.id || "new"}
          />
        </CardBody>
      </Card>
    </>

  );
};

export default observer(ServiceUpdate);
