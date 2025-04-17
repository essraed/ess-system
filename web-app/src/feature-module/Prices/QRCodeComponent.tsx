import { QRCode } from 'antd';
import React from 'react';
import { IMAGE_SERVER_PATH } from '../../environment';
import Header from '../common/header';
import Footer from '../common/footer';

const QRCodeComponent = () => {
  const qrValue = "assets/files/fileservicespricecopy.pdf";

  return (
    <>
      <Header />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '70vh',
        }}
      >
        <h3 style={{ marginBottom: '10px' }}>Scan this QR Code</h3>
        <QRCode value={qrValue} size={180} />
      </div>
      <Footer />
    </>
  );
};

export default QRCodeComponent;
