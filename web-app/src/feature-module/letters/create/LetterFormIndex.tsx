import React, { useState } from "react";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { GiBriefcase } from "react-icons/gi";
import toast from "react-hot-toast";

import { useTranslation } from "react-i18next";

import UserPromptForm from "./UserPromptForm";
import { all_routes } from "../../router/all_routes";
import { useNavigate } from "react-router-dom";
import handleErrors from "../../../lib/utils";
import { useStore } from "../../../app/stores/store";
import BackToButton from "../../common/BackToButton";
import { observer } from "mobx-react-lite";

import AIAssistedLetterEditor from "./AIAssistedLetterEditor";
import { TfiSave } from "react-icons/tfi";
import LanguageSelector from "../../common/LanguageSelector";

const LetterFormIndex = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [summaryErrors, setSummaryErrors] = useState<string[] | null>(null);
  const {
    documentStore,
    documentStore: { brief, aiGeneratedResult, authorityId },
  } = useStore();

  const handleSaveDocument = async () => {
    const formData = new FormData();
    formData.append("brief", brief as string);
    formData.append("aiResult", aiGeneratedResult as string);
    formData.append("authorityId", authorityId as string);

    const result = await documentStore.addDocument(formData);

    if (result.status === "success") {
      toast.success("Letter created successfully");
      navigate(all_routes.letterDashboard);
    } else {
      setSummaryErrors(handleErrors(result.error));
    }
  };

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

          <UserPromptForm />

          <AIAssistedLetterEditor />

          <div className="flex items-center gap-5 justify-between">
            <BackToButton
              href={all_routes.letterDashboard}
              label="Back to letters"
            />
            <Button
              className="btn-view-custom"
              isDisabled={!brief && !aiGeneratedResult}
              type="submit"
              onClick={handleSaveDocument}
            >
              {t("Save")}
              <TfiSave />
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default observer(LetterFormIndex);
