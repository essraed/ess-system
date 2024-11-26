import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { useStore } from "../../../app/stores/store";
import { useTranslation } from "react-i18next";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

type Props = {
  aiGeneratedResult?: string
}

const AIAssistedLetterEditor = () => {
  const { documentStore, userStore } = useStore();
  const { aiGeneratedResult, updateGeneratedResult, currentDocument} = documentStore;
  const editorRef = useRef(null); // Reference for the CKEditor content
  const { t } = useTranslation();

  // Determine text direction based on the user's language setting
  const direction = userStore.language === "ar" ? "rtl" : "ltr";

  // Apply the text direction to the CKEditor content
  useEffect(() => {
    const elements = document.getElementsByClassName("ck-content");
    if (elements.length > 0) {
      const firstElement = elements[0];
      firstElement.setAttribute("dir", direction);
    }
  }, [userStore.language, direction]);

  return (
    <div className="space-y-4 pb-2">
      <h2 className="flex text-lg font-bold">{t("Result")}</h2>
      <div ref={editorRef}>
        <CKEditor
          editor={ClassicEditor}
          data={aiGeneratedResult || currentDocument?.aiResult} // Initialize with data from the store
          onChange={(event, editor) => {
            const data = editor.getData();
            updateGeneratedResult(data); // Update the store with the edited content
          }}
        />
      </div>
    </div>
  );
};

export default observer(AIAssistedLetterEditor);
