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


const listingDetails = () => {
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

  if (!currentService) return <LoadingSpinner />

  return (
    <div className="main-wrapper">
      <>
        {/* Detail Page Head*/}
        <section className="product-detail-head">
          <div className="container">
            <BackToButton href={`/services/${currentService.categoryId}`} label="Back" />
            <div className="detail-page-head">
              <div className="detail-headings">
                <div className="star-rated">
                  <ul className="list-rating">
                    <li>
                      <div className="car-brand">
                        <span>
                          <ImageWithBasePath
                            src="assets/img/icons/car-icon.svg"
                            alt="img"
                          />
                        </span>
                        Sedan
                      </div>
                    </li>
                    <li>
                      <span className="year">2023</span>
                    </li>
                    <li className="ratings">
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <span className="d-inline-block average-list-rating">
                        (5.0)
                      </span>
                    </li>
                  </ul>
                  <div className="camaro-info">
                    <h3>{currentService.name}</h3>
                    <div className="camaro-location">
                      <div className="camaro-location-inner">
                        <i className="bx bx-map" />
                        <span>Location : Miami St, Destin, FL 32550, USA </span>
                      </div>
                      <div className="camaro-location-inner">
                        <i className="bx bx-show" />
                        <span>Views : 250 </span>
                      </div>
                      <div className="camaro-location-inner">
                        <i className="bx bx-car" />
                        <span>Views : Listed on: 01 Jan, 2024 </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="details-btn">
                <span className="total-badge">
                  <i className="bx bx-calendar-edit" />
                  Total Booking : 300
                </span>
                <Link to="#">
                  {" "}
                  <i className="bx bx-git-compare" />
                  Compare
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* /Detail Page Head*/}
      </>

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

export default observer(listingDetails);
