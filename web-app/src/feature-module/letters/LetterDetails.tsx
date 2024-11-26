import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@nextui-org/react";
import html2pdf from "html2pdf.js";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { all_routes } from "../router/all_routes";
import BackToButton from "../common/BackToButton";
import Breadcrumbs from "../common/breadcrumbs";

const LetterDetails = () => {
  // const { t } = useTranslation();
  // const navigate = useNavigate();
  const { id } = useParams();
  const {
    documentStore: { currentDocument, getDocument },
  } = useStore();

  // Ref to store the content for PDF generation
  const pdfContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      getDocument(id); // Fetch the document using the id
    }
  }, [getDocument, id]);

  const handleSaveAsPdf = () => {
    if (pdfContentRef.current) {
      // Get the content inside the pdfContentRef (the entire document content including images and text)
      const contentForPdf = pdfContentRef.current;

      // Generate the PDF
      html2pdf()
        .set({
          margin: 1,
          filename: "document.pdf",
          html2canvas: {
            scale: 4,
            logging: true,
            useCORS: true,
          },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        })
        .from(contentForPdf)
        .save();
    }
  };

  return (
<>
<div className="listing-page">
      <Breadcrumbs title="Details" subtitle="Listings / Letters" />
    </div>
    
<div className="rounded-none p-10 space-y-4">
     <BackToButton href={all_routes.letterDashboard} label="Back to letters" />

      <div className="p-10 border-2 text-lg text-wrap">
        <div ref={pdfContentRef}>
          <div className="flex items-center justify-between">
            {/* <Image src="/logo.png" width={300} height={40} alt="logo" /> */}
          </div>

          <div
            className="ck-content"
            style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}
            dangerouslySetInnerHTML={{
              __html: currentDocument?.aiResult ?? "",
            }}
          ></div>
        </div>
      </div>

      {/* Button to save the document as PDF */}
      <Button onClick={handleSaveAsPdf}>Save as PDF</Button>
    </div>
</>
  );
};

export default observer(LetterDetails);
