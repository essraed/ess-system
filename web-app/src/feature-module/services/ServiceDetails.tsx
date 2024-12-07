import React, { useEffect } from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { useNavigate, useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "yet-another-react-lightbox/styles.css";
import BookingIndex from "../booking/BookingIndex";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import ServiceDetailSidebar from "./ServiceDetailSidebar";
import BackToButton from "../common/BackToButton";
import LoadingSpinner from "../common/LoadingSpinner";
import Header from "../common/header";
import Footer from "../common/footer";

const ListingDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    serviceStore: { getService, currentService },
  } = useStore();

  useEffect(() => {
    if (id) {
      getService(id);
    }
  }, [getService, navigate]);

  if (!currentService) return <LoadingSpinner />;
  
  return (
    
    <div className="main-wrapper mt-0">
      <Header/>

      {/* Detail Page Head */}
      <section className="product-detail-head py-3">
        <div className="container mx-auto bg-slate-100 p-4 rounded-lg">
          {/* Header Section */}
          <div className="detail-page-head flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Service Info */}
            <div className="detail-headings flex-1 lg:mb-0 mb-7 ">
              <div className="star-rated space-y-4">
                <div className="car-brand flex items-center gap-4">
                  <ImageWithBasePath
                    lazyLoad={true}
                    src={
                      currentService.filePath ||
                      "assets/img/icons/service-01.svg"
                    }
                    alt="Service Icon"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <h2 className="text-xl font-semibold text-gray-800">
                    {currentService.categoryName || "Category"}
                  </h2>
                </div>
                {/* <p className="text-gray-600 text-sm">
                  {currentService.description || "No description available."}
                </p> */}
              </div>
            </div>
            {/* Action Buttons */}
            <div className="details-btn">
              <BackToButton
                href={`/services/${currentService.categoryId}`}
                label="Back"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Car Image Carousel Section */}
      {/* <section className="section car-images">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h3 className="text-center mb-4">Our Cars for Pick and Drop Service</h3>
              <Slider {...carouselSettings}>

                <div className="car-image-item">
                  <img
                    src= "/assets/img/64dc49b73c0c3.jpg"// Default image if not available
                    alt="car"
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </section> */}

      {/* Booking Section */}
      <section className="section product-details">
        <div className="custom-container">
          <div className="row">
            <div className="col-lg-8">
              <BookingIndex service={currentService} />
            </div>
            <ServiceDetailSidebar />
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
};

export default observer(ListingDetails);
