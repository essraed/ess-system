import { Button } from '@nextui-org/react'
import axios from 'axios';
import React from 'react'
import { useTranslation } from 'react-i18next';

const downloadPdfReport = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/documents/download-pdf', {
            responseType: 'blob'
        });
        
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'DocumentReport.pdf'); 
        document.body.appendChild(link);
        link.click();
    } catch (error) {
        console.error("Error downloading PDF report", error);
    }
}


const DocumentReport = () => {
    const { t } = useTranslation();
  return (
    <Button onClick={downloadPdfReport} color='secondary' variant='bordered'>
        { t ('Download PDF Report')}
    </Button>
  )
}

export default DocumentReport