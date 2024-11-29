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
import { MdOutlineDescription } from "react-icons/md";
import Slider from "react-slick"; // Import slick carousel slider

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
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // Optional: To remove arrows if needed
  };

  return (
    <div className="main-wrapper">
      {/* Detail Page Head */}
      <section className="product-detail-head">
        <div className="container">
          <div className="detail-page-head">
            <div className="detail-headings">
              <div className="star-rated">
                <ul className="felx flex-col gap-3 list-rating">
                  <li>
                    <div className="car-brand">
                      <span>
                        <ImageWithBasePath
                          lazyLoad={true}
                          src={currentService.filePath || "assets/img/icons/service-01.svg"}
                          alt="img"
                        />
                      </span>
                      {currentService.categoryName || "Category"}
                    </div>
                    <div className="car-brand">
                      {currentService.description || ""}
                    </div>
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
