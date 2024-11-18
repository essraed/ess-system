import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@nextui-org/react";
import html2pdf from "html2pdf.js";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { all_routes } from "../router/all_routes";
import BackToButton from "../common/BackToButton";
import Breadcrumbs from "../common/breadcrumbs";
import CardDetails from "../common/CardDetails";

const CategoryDetails = () => {
  // const { t } = useTranslation();
  // const navigate = useNavigate();
  const { id } = useParams();
  const {
    categoryStore: { currentCategory, getCategory },
  } = useStore();

  // Ref to store the content for PDF generation

  useEffect(() => {
    if (id) {
      getCategory(id); // Fetch the document using the id
    }
  }, [getCategory, id]);

  return (
<>
<div className="listing-page">
      <Breadcrumbs title="Details" subtitle="Listings / Letters" />
    </div>
    
<div className="rounded-none p-10 space-y-4">
     <BackToButton href={all_routes.categoryDashboard} label="Back to categories" />

      <CardDetails data={currentCategory} />
    </div>
</>
  );
};

export default observer(CategoryDetails);
