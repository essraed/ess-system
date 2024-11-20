import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { all_routes } from "../router/all_routes";
import BackToButton from "../common/BackToButton";
import Breadcrumbs from "../common/breadcrumbs";
import CardDetails from "../common/CardDetails";

const ServiceDashboardDetails = () => {
  // const { t } = useTranslation();
  // const navigate = useNavigate();
  const { id } = useParams();
  const {
    serviceStore: { currentService, getService },
  } = useStore();

  // Ref to store the content for PDF generation

  useEffect(() => {
    if (id) {
      getService(id); 
      console.log("service",currentService);// Fetch the document using the id
    }
  }, [getService, id]);

  return (
    <>
      <div className="listing-page">
        <Breadcrumbs title="Details" subtitle="Listings / Services" />
      </div>

      <div className="rounded-none p-10 space-y-4">
        <BackToButton
          href={all_routes.serviceDashboard}
          label="Back To Services"
        />

        <CardDetails data={currentService} />
      </div>
    </>
  );
};

export default observer(ServiceDashboardDetails);
