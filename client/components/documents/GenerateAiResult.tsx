'use client';
import { useStore } from '@/stores/store';
import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useTranslation } from 'react-i18next';

const GenerateAiResult = () => {
    const { documentStore } = useStore();
    const { aiGeneratedResult, updateGeneratedResult } = documentStore;
    const editorRef = useRef(null); // Reference for the CKEditor content
    const { t } = useTranslation();
    
    return (
        <div className='space-y-4'>
            <h2 className="flex text-lg font-bold">{ t ('Result')}</h2>
            <div ref={editorRef}>
        
                <CKEditor
                    editor={ClassicEditor}
                    data={aiGeneratedResult} // Use data from the store
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        updateGeneratedResult(data); // Call the method to update the store
                    }}
                    config={{
                        // toolbar: [
                        //     'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
                        //     'blockQuote', 'insertTable', 'undo', 'redo'
                        // ],
                    }}
                />
            </div>
        </div>
    );
}

export default observer(GenerateAiResult);
