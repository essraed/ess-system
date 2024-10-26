"use client";
import { useStore } from "@/stores/store";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { GiBriefcase } from "react-icons/gi";
import toast from "react-hot-toast";
import handleErrors from "@/lib/utils";
import { useRouter } from "next/navigation";
import { IoIosArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import UpdateAiResultForm from "@/components/documents/UpdateAiResultForm";
import { useTranslation } from "react-i18next";

const UpdatePage = ({ params }: { params: { id: string } }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const {
    documentStore: {
      currentDocument,
      getDocument,
      updateDocument,
      brief,
      aiGeneratedResult,
    },
    userStore: { language },
  } = useStore();

  const [summaryErrors, setSummaryErrors] = useState<string[] | null>(null);

  useEffect(() => {
    getDocument(params.id);

    const theme = localStorage.getItem("theme");
    setTimeout(() => {
      if (theme === "dark") {
        let editor = document.getElementsByClassName("ck-content")[0];

        if (editor) {
          let paragraphs = editor.getElementsByTagName("p");
          paragraphs[0].classList.add("text-slate-900");
        }
      }
    }, 1000);
  }, [getDocument, params.id]);

  const handleSaveDocument = async () => {
    const result = await updateDocument(params.id, aiGeneratedResult as string);

    if (result.status === "success") {
      toast.success(result.data);
      router.push(`/documents/details/${params.id}`);
    } else {
      setSummaryErrors(handleErrors(result.error));
    }
  };

  return (
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
        <UpdateAiResultForm aiGeneratedResult={currentDocument?.aiResult} />

        <div className="flex items-center gap-5 justify-between">
          <Link
            className="flex items-center align-middle gap-2 text-blue-700"
            href="/documents"
          >
            <IoIosArrowRoundBack
              style={{
                transform:
                  language === "ar" ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
              }}
              size={30}
            />{" "}
            {t("Back")}
          </Link>
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
  );
};

export default observer(UpdatePage);
