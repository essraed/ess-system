import React, { useState } from 'react';
import Breadcrumbs from "../common/breadcrumbs";
import Lightbox from 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css';
import Header from '../common/header';
import Footer from '../common/footer';

const Gallerys: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    '/assets/img/gallery/gallery-01.png',
    '/assets/img/gallery/gallery-02.png',
    '/assets/img/gallery/gallery-03.png',
    '/assets/img/gallery/gallery-04.png',
    '/assets/img/gallery/gallery-05.png',
    '/assets/img/gallery/gallery-06.png',
    '/assets/img/gallery/gallery-07.png',
    '/assets/img/gallery/gallery-09.png',
    '/assets/img/gallery/gallery-10.png',
    '/assets/img/gallery/gallery-11.png',
    '/assets/img/gallery/gallery-12.png',
  ];

  return (
    <>
    <Header/>
     

      <div className="section gallery-section">
        <div className="custom-container">
          <div className="row g-4">
            {images.map((img, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-12">
                <img
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  onClick={() => setSelectedImage(img)}
                  style={{
                    cursor: 'pointer',
                    width: '100%',
                    height: 'auto',
                    borderRadius: '10px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedImage && (
        <Lightbox
          image={selectedImage}
          title="Gallery"
          onClose={() => setSelectedImage(null)}
        />
      )}
      <Footer/>
    </>
  );
};

export default Gallerys;
