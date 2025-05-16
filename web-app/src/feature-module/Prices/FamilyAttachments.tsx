import React from 'react';
import { IMAGE_SERVER_PATH } from '../../environment';
import Header from '../common/header';
import Footer from '../common/footer';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const FamilyAttachments = () => {
  const filePath = `${IMAGE_SERVER_PATH}/seed/files/Theattachmentsrequiredforfamilyresidencesoutside.docx`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      {/* Main content takes available space */}
      <div style={{ flex: 1, padding: '40px 20px', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '16px' }}>Download The Attachments Required For Family Residences Outside</h3>
        <Button
          type="primary"
          shape="round"
          icon={<DownloadOutlined />}
          size="large"
          href={filePath}
          target="_blank"
          className='bg-[#0f8992]'
        >
          Download Word
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default FamilyAttachments;
