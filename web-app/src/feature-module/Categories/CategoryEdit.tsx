import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { GiBriefcase } from "react-icons/gi";
import toast from "react-hot-toast";

import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import handleErrors from "../../lib/utils";
import BackToButton from "../common/BackToButton";
import { all_routes } from "../router/all_routes";
import Breadcrumbs from "../common/breadcrumbs";
import AIAssistedLetterEditor from "../letters/create/AIAssistedLetterEditor";

const LetterEdit = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    documentStore: {
      getDocument,
      updateDocument,
      brief,
      aiGeneratedResult
    },
  } = useStore();

  const [summaryErrors, setSummaryErrors] = useState<string[] | null>(null);

  useEffect(() => {
    getDocument(id!);

    const theme = localStorage.getItem("theme");
    setTimeout(() => {
      if (theme === "dark") {
        const editor = document.getElementsByClassName("ck-content")[0];

        if (editor) {
          const paragraphs = editor.getElementsByTagName("p");
          paragraphs[0].classList.add("text-slate-900");
        }
      }
    }, 1000);
  }, [getDocument, id]);

  const handleSaveDocument = async () => {
    const result = await updateDocument(id!, aiGeneratedResult as string);

    if (result.status === "success") {
      toast.success(result.data);
      navigate(`listings/letters/view/${id}`);
    } else {
      setSummaryErrors(handleErrors(result.error));
    }
  };

  return (
    <>
      <div className="listing-page">
        <Breadcrumbs title="Edit" subtitle="Listings / Letters" />
      </div>
      <Card className="rounded-none p-10">
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-2 items-center text-secondary">
            <div className="flex flex-row items-center gap-3">
              <GiBriefcase size={40} />
              <h1 className="text-3xl font-semibold">
                {t("Generate ChatGPT Result")}
              </h1>
            </div>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col">
          {summaryErrors && (
            <div className="bg-red-200 p-2 text-sm rounded-md">
              {summaryErrors.map((err, idx) => (
                <p key={idx} className="text-red-600 mb-2 text-sm">
                  {err}
                </p>
              ))}
            </div>
          )}
          <p>{brief}</p>
          <AIAssistedLetterEditor  />

          <div className="flex items-center gap-5 justify-between">
            <BackToButton
              href={all_routes.letterDashboard}
              label="Back to letters"
            />

            <Button
              className="w-5"
              isDisabled={!brief && !aiGeneratedResult}
              color="primary"
              type="submit"
              onClick={handleSaveDocument}
            >
              {t("Save")}
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default observer(LetterEdit);
