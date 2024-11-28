import React, { useEffect } from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Link, useNavigate, useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "yet-another-react-lightbox/styles.css";
import BookingIndex from "../booking/BookingIndex";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import ServiceDetailSidebar from "./ServiceDetailSidebar";
import BackToButton from "../common/BackToButton";
import LoadingSpinner from "../common/LoadingSpinner";

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
    <div className="main-wrapper">
      {/* Detail Page Head */}
      <section className="product-detail-head">
        <div className="container">
          <div className="detail-page-head">
            <div className="detail-headings">
              <div className="star-rated">
                <ul className="list-rating">
                  <li>
                    <div className="car-brand">
                      <span>
                        <ImageWithBasePath
                          lazyLoad={true}
                          src={currentService.filePath || "assets/img/icons/default-icon.svg"}
                          alt="img"
                        />
                      </span>
                      {currentService.categoryName || "Category"}
                    </div>
                  </li>
                  <li>
                    2024
                    {/* <span className="year">{new Date(currentService.createDate).getFullYear()}</span> */}
                  </li>
                
                </ul>
              </div>
            </div>
            <div className="details-btn">
              <span className="total-badge">
                <i className="bx bx-calendar-edit" />
                Total Booking: 300
              </span>
              <Link to="#">
                <i className="bx bx-git-compare" />
                Compare
              </Link>
            </div>
          </div>
          <div className="container bg-slate-100 p-2 mt-4 rounded">
            <BackToButton href={`/services/${currentService.categoryId}`} label="Back" />
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="section product-details">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <BookingIndex service={currentService} />
            </div>
            <ServiceDetailSidebar />
          </div>
        </div>
      </section>
    </div>
  );
};

export default observer(ListingDetails);
