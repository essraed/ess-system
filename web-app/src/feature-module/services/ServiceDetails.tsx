import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import { useParams } from "react-router-dom";
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
import BookingWithDocuments from "../booking/BookingWithDocuments";

const ListingDetails = () => {
  const { id } = useParams();
  const {
    serviceStore: { getService, currentService },
  } = useStore();

  useEffect(() => {
    if (id) {
      getService(id);
   
    }
  }, [id]);

  if (!currentService) return <LoadingSpinner />;

  return (
    <>
      <div className="main-wrapper mt-0">
        <Header />

        {currentService.isRequiredFiles  ? (
          <BookingWithDocuments service={currentService}/>
        ) : (
          <>
            <section className="product-detail-head py-3">
              <div className="custom-container mx-auto bg-slate-100 p-0.5 lg:p-4 rounded-lg">
                {/* Header Section */}
                <div className="flex lg:flex gap-20">
                  {/* Service Info */}
                  <div className="detail-headings lg:flex-1">
                    <h2 className="text-sm md:text-lg font-semibold text-gray-800">
                      {`${currentService.categoryName || "Category"} >> ${currentService.name}`}
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
          </>
        )}

        <Footer />
      </div>
    </>
  );
};

export default observer(ListingDetails);
