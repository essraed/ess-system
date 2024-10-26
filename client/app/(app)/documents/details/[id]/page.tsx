"use client";
import { useStore } from "@/stores/store";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import html2pdf from "html2pdf.js";
import { Button, Divider } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

const DocumentDetailsPage = ({ params }: { params: { id: string } }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    documentStore: { currentDocument, getDocument },
    userStore: { language },
  } = useStore();

  // Ref to store the content for PDF generation
  const pdfContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getDocument(params.id);
  }, [getDocument, params.id]);

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
    <div className="rounded-none p-10 space-y-4">
      <Link
        className="flex items-center align-middle gap-2 text-blue-700"
        href="/documents"
      >
        <IoIosArrowRoundBack
          style={{
            transform: language === "ar" ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s",
          }}
          size={30}
        />
        {t("Back")}
      </Link>

      <div className="p-10 border-2 text-lg text-wrap">
        <div ref={pdfContentRef}>

        <div className="flex items-center justify-between">
          {/* First Logo */}
          <Image src="/logo.png" width={300} height={40} alt="logo" />
          {/* Second Logo */}
          <Image src="/logo.png" width={300} height={40} alt="logo" />
        </div>
      
        <div
          className="ck-content"
          style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}
          dangerouslySetInnerHTML={{ __html: currentDocument?.aiResult ?? "" }}
        ></div>
        </div>
      </div>

      {/* Button to save the document as PDF */}
      <Button onClick={handleSaveAsPdf}>Save as PDF</Button>
    </div>
  );
};

export default observer(DocumentDetailsPage);
