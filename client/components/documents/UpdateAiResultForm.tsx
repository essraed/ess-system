"use client";
import { useStore } from "@/stores/store";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

type Props = {
  aiGeneratedResult: string | null | undefined;
};

const UpdateAiResultForm = ({ aiGeneratedResult }: Props) => {
  const { documentStore, userStore } = useStore();
  const { updateGeneratedResult } = documentStore;
  const editorRef = useRef(null);

  const { t } = useTranslation();

  const direction = userStore.language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    const elements = document.getElementsByClassName("ck-content");
    if (elements.length > 0) {
      const firstElement = elements[0];
      firstElement.setAttribute("dir", direction);
    }
  }, [userStore.language, direction]);

  const elements = document.getElementsByClassName("ck-content");
  if (elements.length > 0) {
    const firstElement = elements[0];
    firstElement.setAttribute("dir", direction);
  }

  return (
    <div className="space-y-4 pb-2">
      <h2 className="flex text-lg font-bold">{t("Result")}</h2>
      <div ref={editorRef}>
        <CKEditor
          editor={ClassicEditor}
          data={aiGeneratedResult} // Use data from the store
          onChange={(event, editor) => {
            const data = editor.getData();
            updateGeneratedResult(data); // Call the method to update the store
          }}
        />
      </div>
    </div>
  );
};

export default observer(UpdateAiResultForm);
