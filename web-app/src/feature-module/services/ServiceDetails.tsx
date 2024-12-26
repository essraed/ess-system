import React, { useEffect } from "react";
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

  // Slick Carousel settings


  return (
    <div className="main-wrapper mt-0 ">
      <Header />

      {/* Detail Page Head */}
      <section className="product-detail-head py-3">
        <div className="custom-container mx-auto bg-slate-100 p-3 lg:p-4 rounded-lg">
          {/* Header Section */}
          <div className="flex lg:flex gap-20">
            {/* Service Info */}
            <div className="detail-headings lg:flex-1">
              <h2 className="text-xl font-semibold text-gray-800">
                {currentService.categoryName || "Category"}
              </h2>
            </div>
            {/* Action Buttons */}

            <BackToButton
              href={`/services/${currentService.categoryId}`}
              label="Back"
            />
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
      <section className="section product-details custom-container">
        <div>
          <div className="row">
            <div className="col-lg-8">
              <BookingIndex service={currentService} />
            </div>
            <ServiceDetailSidebar />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default observer(ListingDetails);
