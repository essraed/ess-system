import React, { useEffect, useRef, useState } from "react";
import Breadcrumbs from "../common/breadcrumbs";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Link, useParams } from "react-router-dom";
import { Calendar } from "primereact/calendar";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Aos from "aos";
import { all_routes } from "../router/all_routes";
import { Dropdown } from "primereact/dropdown";

import dayjs from "dayjs";
import "yet-another-react-lightbox/styles.css";
import BookingForm from "../booking/BookingForm";
import Dayjs from "dayjs";
import BookingIndex from "../booking/BookingIndex";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

const listingDetails = () => {

  const { id } = useParams();
  const {
    serviceStore: { getService, currentService },
  } = useStore();


  useEffect(() => {
    if (id) {
      getService(id);
    }
  }, [getService]);







  const routes = all_routes;
  const [date1, setDate1] = useState(null);
  const bigImgSliderRef = useRef(null);
  const thumbnailSliderRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedLocation1, setSelectedLocation1] = useState(null);
  const [date2, setDate2] = useState(null);
  const types = [
    { name: " Newyork Office - 78, 10th street Laplace USA" },
    { name: "Newyork Office - 12, 5th street USA" },
  ];
  const Location = [
    { name: " Newyork Office - 78, 10th street Laplace USA" },
    { name: "Newyork Office - 12, 5th street USA" },
  ];
  const onChange = (time: Dayjs, timeString: string) => {
    console.log(time, timeString);
  };
  const [selectedItems, setSelectedItems] = useState(Array(10).fill(false));
  const handleItemClick = (index: number) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = [...prevSelectedItems];
      updatedSelectedItems[index] = !updatedSelectedItems[index];
      return updatedSelectedItems;
    });
  };
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    {
      thumb: "assets/img/gallery/gallery-thumb-01.jpg",
      big: "/assets/img/gallery/gallery-big-01.jpg",
    },
    {
      thumb: "assets/img/gallery/gallery-thumb-02.jpg",
      big: "/assets/img/gallery/gallery-big-02.jpg",
    },
    {
      thumb: "assets/img/gallery/gallery-thumb-03.jpg",
      big: "/assets/img/gallery/gallery-big-03.jpg",
    },
    {
      thumb: "assets/img/gallery/gallery-thumb-04.jpg",
      big: "/assets/img/gallery/gallery-big-04.jpg",
    },
  ];

  const settings = {
    dots: false,
    autoplay: false,
    slidesToShow: 3,
    speed: 500,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 776,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    if (bigImgSliderRef.current && thumbnailSliderRef.current) {
      bigImgSliderRef.current.slickGoTo(0);
      thumbnailSliderRef.current.slickGoTo(0);
    }
  }, []);
  useEffect(() => {
    Aos.init({ duration: 1200, once: true });
  }, []);

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
  }, []);

  const settings1 = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: nav2 || undefined, 
    ref: (slider: any) => (sliderRef1.current = slider), 
  };

  const settings2 = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
    asNavFor: nav1 || undefined,
    ref: (slider: any) => (sliderRef2.current = slider), 
  };

  if (!currentService) return <p>Loading...</p>;


  return (
    <div className="main-wrapper">
      <Breadcrumbs title="Chevrolet Camaro" subtitle="Listings" />
      <>
        {/* Detail Page Head*/}
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
              <div className="detail-product">
                <div className="pro-info">
                  <div className="pro-badge">
                    <span className="badge-km">
                      <i className="fa-solid fa-person-walking" />
                      4.2 Km Away
                    </span>
                    <Link to="#" className="fav-icon">
                      <i className="fa-regular fa-heart" />
                    </Link>
                  </div>
                  <ul>
                    <li className="del-airport">
                      <i className="fa-solid fa-check" />
                      Airport delivery
                    </li>
                    <li className="del-home">
                      <i className="fa-solid fa-check" />
                      Home delivery
                    </li>
                  </ul>
                </div>

                <div className="slider detail-bigimg">
                  <Slider {...settings1}>
                    <div className="product-img">
                      <ImageWithBasePath
                        src="assets/img/cars/slider-01.jpg"
                        alt="Slider"
                      />
                    </div>
                    <div className="product-img">
                      <ImageWithBasePath
                        src="assets/img/cars/slider-02.jpg"
                        alt="Slider"
                      />
                    </div>
                    <div className="product-img">
                      <ImageWithBasePath
                        src="assets/img/cars/slider-03.jpg"
                        alt="Slider"
                      />
                    </div>
                    <div className="product-img">
                      <ImageWithBasePath
                        src="assets/img/cars/slider-04.jpg"
                        alt="Slider"
                      />
                    </div>
                    <div className="product-img">
                      <ImageWithBasePath
                        src="assets/img/cars/slider-05.jpg"
                        alt="Slider"
                      />
                    </div>
                  </Slider>
                </div>
                <div className="slider slider-nav-thumbnails">
                  <Slider {...settings2}>
                    <div>
                      <ImageWithBasePath
                        src="assets/img/cars/slider-thum-01.jpg"
                        alt="product image"
                      />
                    </div>
                    <div>
                      <ImageWithBasePath
                        src="assets/img/cars/slider-thum-02.jpg"
                        alt="product image"
                      />
                    </div>
                    <div>
                      <ImageWithBasePath
                        src="assets/img/cars/slider-thum-03.jpg"
                        alt="product image"
                      />
                    </div>
                    <div>
                      <ImageWithBasePath
                        src="assets/img/cars/slider-thum-04.jpg"
                        alt="product image"
                      />
                    </div>
                    <div>
                      <ImageWithBasePath
                        src="assets/img/cars/slider-thum-05.jpg"
                        alt="product image"
                      />
                    </div>
                  </Slider>
                </div>
              </div>
              <>
                <div className="review-sec pb-0">
                  <div className="review-header">
                    <h4>Extra Service</h4>
                  </div>
                  <div className="lisiting-service">
                    <div className="row">
                      <div className="servicelist d-flex align-items-center col-xxl-3 col-xl-4 col-sm-6">
                        <div className="service-img">
                          <ImageWithBasePath
                            src="assets/img/icons/service-01.svg"
                            alt="Icon"
                          />
                        </div>
                        <div className="service-info">
                          <p>GPS Navigation Systems</p>
                        </div>
                      </div>
                      <div className="servicelist d-flex align-items-center col-xxl-3 col-xl-4 col-sm-6">
                        <div className="service-img">
                          <ImageWithBasePath
                            src="assets/img/icons/service-02.svg"
                            alt="Icon"
                          />
                        </div>
                        <div className="service-info">
                          <p>Wi-Fi Hotspot</p>
                        </div>
                      </div>
                      <div className="servicelist d-flex align-items-center col-xxl-3 col-xl-4 col-sm-6">
                        <div className="service-img">
                          <ImageWithBasePath
                            src="assets/img/icons/service-03.svg"
                            alt="Icon"
                          />
                        </div>
                        <div className="service-info">
                          <p>Child Safety Seats</p>
                        </div>
                      </div>
                      <div className="servicelist d-flex align-items-center col-xxl-3 col-xl-4 col-sm-6">
                        <div className="service-img">
                          <ImageWithBasePath
                            src="assets/img/icons/service-04.svg"
                            alt="Icon"
                          />
                        </div>
                        <div className="service-info">
                          <p>Fuel Options</p>
                        </div>
                      </div>
                      <div className="servicelist d-flex align-items-center col-xxl-3 col-xl-4 col-sm-6">
                        <div className="service-img">
                          <ImageWithBasePath
                            src="assets/img/icons/service-05.svg"
                            alt="Icon"
                          />
                        </div>
                        <div className="service-info">
                          <p>Roadside Assistance</p>
                        </div>
                      </div>
                      <div className="servicelist d-flex align-items-center col-xxl-3 col-xl-4 col-sm-6">
                        <div className="service-img">
                          <ImageWithBasePath
                            src="assets/img/icons/service-06.svg"
                            alt="Icon"
                          />
                        </div>
                        <div className="service-info">
                          <p>Satellite Radio</p>
                        </div>
                      </div>
                      <div className="servicelist d-flex align-items-center col-xxl-3 col-xl-4 col-sm-6">
                        <div className="service-img">
                          <ImageWithBasePath
                            src="assets/img/icons/service-07.svg"
                            alt="Icon"
                          />
                        </div>
                        <div className="service-info">
                          <p>Additional Accessories</p>
                        </div>
                      </div>
                      <div className="servicelist d-flex align-items-center col-xxl-3 col-xl-4 col-sm-6">
                        <div className="service-img">
                          <ImageWithBasePath
                            src="assets/img/icons/service-08.svg"
                            alt="Icon"
                          />
                        </div>
                        <div className="service-info">
                          <p>Express Check-in/out</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Listing Section */}
                <div className="review-sec mb-0">
                  <div className="review-header">
                    <h4>Description of Listing</h4>
                  </div>
                  <div className="description-list">
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the
                      industry`&apos;`s standard dummy text ever since the
                      1500s, when an unknown printer took a galley of type and
                      scrambled it to make a type specimen book. It has survived
                      not only five centuries, but also the leap into electronic
                      typesetting, remaining essentially unchanged.
                    </p>
                    <p>
                      It was popularised in the 1960s with the release of
                      Letraset sheets containing Lorem Ipsum passages, and more
                      recently with desktop publishing software like Aldus
                      PageMaker including versions of Lorem Ipsum.It was
                      popularised in the 1960s with the release of Letraset
                      sheets containing Lorem Ipsum passages, and more recently
                      with desktop publishing software like Aldus PageMaker
                      including versions of Lorem Ipsum.
                    </p>
                    <p>
                      It was popularised in the 1960s with the release of
                      Letraset sheets containing Lorem Ipsum passages, and more
                      recently with desktop publishing software like Aldus
                      PageMaker including versions of Lorem Ipsum.
                    </p>
                    <div className="read-more">
                      <div className="more-text">
                        <p>
                          It was popularised in the 1960s with the release of
                          Letraset sheets containing Lorem Ipsum passages, and
                          more recently with desktop publishing software like
                          Aldus PageMaker including versions of Lorem Ipsum.It
                          was popularised in the 1960s with the release of
                          Letraset sheets containing Lorem Ipsum passages, and
                          more recently with desktop publishing software like
                          Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                      </div>
                      <Link to="#" className="more-link">
                        Show More
                      </Link>
                    </div>
                  </div>
                </div>
                {/* /Listing Section */}
                {/* Specifications */}
                <div className="review-sec specification-card ">
                  <div className="review-header">
                    <h4>Specifications</h4>
                  </div>
                  <div className="card-body">
                    <div className="lisiting-featues">
                      <div className="row">
                        <div className="featureslist d-flex align-items-center col-xl-3 col-md-4 col-sm-6">
                          <div className="feature-img">
                            <ImageWithBasePath
                              src="assets/img/specification/specification-icon-1.svg"
                              alt="Icon"
                            />
                          </div>
                          <div className="featues-info">
                            <span>Body </span>
                            <h6> Sedan</h6>
                          </div>
                        </div>
                        <div className="featureslist d-flex align-items-center col-xl-3 col-md-4 col-sm-6">
                          <div className="feature-img">
                            <ImageWithBasePath
                              src="assets/img/specification/specification-icon-2.svg"
                              alt="Icon"
                            />
                          </div>
                          <div className="featues-info">
                            <span>Make </span>
                            <h6> Nisssan</h6>
                          </div>
                        </div>
                        <div className="featureslist d-flex align-items-center col-xl-3 col-md-4 col-sm-6">
                          <div className="feature-img">
                            <ImageWithBasePath
                              src="assets/img/specification/specification-icon-3.svg"
                              alt="Icon"
                            />
                          </div>
                          <div className="featues-info">
                            <span>Transmission </span>
                            <h6> Automatic</h6>
                          </div>
                        </div>
                        <div className="featureslist d-flex align-items-center col-xl-3 col-md-4 col-sm-6">
                          <div className="feature-img">
                            <ImageWithBasePath
                              src="assets/img/specification/specification-icon-4.svg"
                              alt="Icon"
                            />
                          </div>
                          <div className="featues-info">
                            <span>Fuel Type </span>
                            <h6> Diesel</h6>
                          </div>
                        </div>
                        <div className="featureslist d-flex align-items-center col-xl-3 col-md-4 col-sm-6">
                          <div className="feature-img">
                            <ImageWithBasePath
                              src="assets/img/specification/specification-icon-5.svg"
                              alt="Icon"
                            />
                          </div>
                          <div className="featues-info">
                            <span>Mileage </span>
                            <h6>16 Km</h6>
                          </div>
                        </div>
                        <div className="featureslist d-flex align-items-center col-xl-3 col-md-4 col-sm-6">
                          <div className="feature-img">
                            <ImageWithBasePath
                              src="assets/img/specification/specification-icon-6.svg"
                              alt="Icon"
                            />
                          </div>
                          <div className="featues-info">
                            <span>Drivetrian </span>
                            <h6>Front Wheel</h6>
                          </div>
                        </div>
                        <div className="featureslist d-flex align-items-center col-xl-3 col-md-4 col-sm-6">
                          <div className="feature-img">
                            <ImageWithBasePath
                              src="assets/img/specification/specification-icon-7.svg"
                              alt="Icon"
                            />
                          </div>
                          <div className="featues-info">
                            <span>Year</span>
                            <h6> 2018</h6>
                          </div>
                        </div>
                        <div className="featureslist d-flex align-items-center col-xl-3 col-md-4 col-sm-6">
                          <div className="feature-img">
                            <ImageWithBasePath
                              src="assets/img/specification/specification-icon-8.svg"
                              alt="Icon"
                            />
                          </div>
                          <div className="featues-info">
                            <span>AC </span>
                            <h6> Air Condition</h6>
                          </div>
                        </div>
                        <div className="featureslist d-flex align-items-center col-xl-3 col-md-4 col-sm-6">
                          <div className="feature-img">
                            <ImageWithBasePath
                              src="assets/img/specification/specification-icon-9.svg"
                              alt="Icon"
                            />
                          </div>
                          <div className="featues-info">
                            <span>VIN </span>
                            <h6> 45456444</h6>
                          </div>
                        </div>
                        <div className="featureslist d-flex align-items-center col-xl-3 col-md-4 col-sm-6">
                          <div className="feature-img">
                            <ImageWithBasePath
                              src="assets/img/specification/specification-icon-10.svg"
                              alt="Icon"
                            />
                          </div>
                          <div className="featues-info">
                            <span>Door </span>
                            <h6> 4 Doors</h6>
                          </div>
                        </div>
                        <div className="featureslist d-flex align-items-center col-xl-3 col-md-4 col-sm-6">
                          <div className="feature-img">
                            <ImageWithBasePath
                              src="assets/img/specification/specification-icon-11.svg"
                              alt="Icon"
                            />
                          </div>
                          <div className="featues-info">
                            <span>Brake </span>
                            <h6> ABS</h6>
                          </div>
                        </div>
                        <div className="featureslist d-flex align-items-center col-xl-3 col-md-4 col-sm-6">
                          <div className="feature-img">
                            <ImageWithBasePath
                              src="assets/img/specification/specification-icon-12.svg"
                              alt="Icon"
                            />
                          </div>
                          <div className="featues-info">
                            <span>Engine (Hp) </span>
                            <h6> 3,000</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Specifications */}
                {/* Car Features */}

                {/* /Car Features */}
                {/* Gallery */}

                {/* /Gallery */}
                {/* Video */}

                {/* /Video */}
                {/* FAQ */}
                <div className="review-sec faq-feature">
                  <div className="review-header">
                    <h4>FAQ’s</h4>
                  </div>
                  <div className="faq-info">
                    <div className="faq-card">
                      <h4 className="faq-title">
                        <Link
                          className="collapsed"
                          data-bs-toggle="collapse"
                          to="#faqOne"
                          aria-expanded="false"
                        >
                          How old do I need to be to rent a car?
                        </Link>
                      </h4>
                      <div id="faqOne" className="card-collapse collapse">
                        <p>
                          We offer a diverse fleet of vehicles to suit every
                          need, including compact cars, sedans, SUVs and luxury
                          vehicles. You can browse our selection online or
                          contact us for assistance in choosing the right
                          vehicle for you
                        </p>
                      </div>
                    </div>
                    <div className="faq-card">
                      <h4 className="faq-title">
                        <Link
                          className="collapsed"
                          data-bs-toggle="collapse"
                          to="#faqTwo"
                          aria-expanded="false"
                        >
                          What documents do I need to rent a car?
                        </Link>
                      </h4>
                      <div id="faqTwo" className="card-collapse collapse">
                        <p>
                          We offer a diverse fleet of vehicles to suit every
                          need, including compact cars, sedans, SUVs and luxury
                          vehicles. You can browse our selection online or
                          contact us for assistance in choosing the right
                          vehicle for you
                        </p>
                      </div>
                    </div>
                    <div className="faq-card">
                      <h4 className="faq-title">
                        <Link
                          className="collapsed"
                          data-bs-toggle="collapse"
                          to="#faqThree"
                          aria-expanded="false"
                        >
                          What types of vehicles are available for rent?
                        </Link>
                      </h4>
                      <div id="faqThree" className="card-collapse collapse">
                        <p>
                          We offer a diverse fleet of vehicles to suit every
                          need, including compact cars, sedans, SUVs and luxury
                          vehicles. You can browse our selection online or
                          contact us for assistance in choosing the right
                          vehicle for you
                        </p>
                      </div>
                    </div>
                    <div className="faq-card">
                      <h4 className="faq-title">
                        <Link
                          className="collapsed"
                          data-bs-toggle="collapse"
                          to="#faqFour"
                          aria-expanded="false"
                        >
                          Can I rent a car with a debit card?
                        </Link>
                      </h4>
                      <div id="faqFour" className="card-collapse collapse">
                        <p>
                          We offer a diverse fleet of vehicles to suit every
                          need, including compact cars, sedans, SUVs and luxury
                          vehicles. You can browse our selection online or
                          contact us for assistance in choosing the right
                          vehicle for you
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /FAQ */}
                {/* Policies */}
                <div className="review-sec">
                  <div className="review-header">
                    <h4>Policies</h4>
                  </div>
                  <div className="policy-list">
                    <div className="policy-item">
                      <div className="policy-info">
                        <h6>Cancellation Charges</h6>
                        <p>
                          Cancellation charges will be applied as per the policy
                        </p>
                      </div>
                      <Link to={routes.privacyPolicy}>Know More</Link>
                    </div>
                    <div className="policy-item">
                      <div className="policy-info">
                        <h6>Policy</h6>
                        <p>
                          I hereby agree to the terms and conditions of the
                          Lease Agreement with Host
                        </p>
                      </div>
                      <Link to={routes.privacyPolicy}>View Details</Link>
                    </div>
                  </div>
                </div>
                {/* /Policies */}
                {/* Reviews */}
                <div className="review-sec listing-review">
                  <div className="review-header">
                    <h4>Reviews</h4>
                  </div>
                  <div className="rating-wrapper">
                    <div className="rating-wraps">
                      <h2>
                        4.5<span>/5</span>
                      </h2>
                      <p>Excellent</p>
                      <h6>Based on 256 Reviews</h6>
                    </div>
                    <div className="rating-progress">
                      <div className="progress-info">
                        <h6>Service</h6>
                        <div className="progress" role="progressbar">
                          <div
                            className="progress-bar bg-primary"
                            style={{ width: "70%" }}
                          />
                        </div>
                        <div className="progress-percent">4.6</div>
                      </div>
                      <div className="progress-info">
                        <h6>Location</h6>
                        <div className="progress" role="progressbar">
                          <div
                            className="progress-bar bg-primary"
                            style={{ width: "85%" }}
                          />
                        </div>
                        <div className="progress-percent">4.8</div>
                      </div>
                      <div className="progress-info">
                        <h6>Value for Money</h6>
                        <div className="progress" role="progressbar">
                          <div
                            className="progress-bar bg-primary"
                            style={{ width: "60%" }}
                          />
                        </div>
                        <div className="progress-percent">3.0</div>
                      </div>
                      <div className="progress-info">
                        <h6>Facilities</h6>
                        <div className="progress" role="progressbar">
                          <div
                            className="progress-bar bg-primary"
                            style={{ width: "65%" }}
                          />
                        </div>
                        <div className="progress-percent">4.5</div>
                      </div>
                      <div className="progress-info">
                        <h6>Cleanliness</h6>
                        <div className="progress" role="progressbar">
                          <div
                            className="progress-bar bg-primary"
                            style={{ width: "90%" }}
                          />
                        </div>
                        <div className="progress-percent">4.8</div>
                      </div>
                    </div>
                  </div>
                  <div className="review-card">
                    <div className="review-head">
                      <h6>Showing 3 guest reviews</h6>
                    </div>
                    <ul>
                      <li>
                        <div className="review-wraps">
                          <div className="review-header-group">
                            <div className="review-widget-header">
                              <span className="review-widget-img">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-01.jpg"
                                  className="img-fluid"
                                  alt="User"
                                />
                              </span>
                              <div className="review-design">
                                <h6>Johnson</h6>
                                <p>02 Jan 2023</p>
                              </div>
                            </div>
                            <div className="reviewbox-list-rating">
                              <p>
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <span> (5.0)</span>
                              </p>
                            </div>
                          </div>
                          <p>
                            It was popularised in the 1960s with the release of
                            Letraset sheets containing Lorem Ipsum passages, and
                            more recently with desktop publishing software like
                            Aldus PageMaker including versions of Lorem Ipsum.It
                            was popularised in the 1960s{" "}
                          </p>
                          <div className="review-reply">
                            <Link className="btn" to="#">
                              <i className="fa-solid fa-reply" />
                              Reply
                            </Link>
                            <div className="review-action">
                              <Link to="#">
                                <i className="fa-regular fa-thumbs-up" />
                                10
                              </Link>
                              <Link to="#">
                                <i className="fa-regular fa-thumbs-down" />
                                12
                              </Link>
                              <Link to="#">
                                <i className="fa-regular fa-heart" />
                                15
                              </Link>
                            </div>
                          </div>
                        </div>
                        <ul>
                          <li>
                            <div className="review-wraps">
                              <div className="review-header-group">
                                <div className="review-widget-header">
                                  <span className="review-widget-img">
                                    <ImageWithBasePath
                                      src="assets/img/profiles/avatar-01.jpg"
                                      className="img-fluid"
                                      alt="User"
                                    />
                                  </span>
                                  <div className="review-design">
                                    <h6>Johnson</h6>
                                    <p>02 Jan 2023</p>
                                  </div>
                                </div>
                                <div className="reviewbox-list-rating">
                                  <p>
                                    <i className="fas fa-star filled" />
                                    <i className="fas fa-star filled" />
                                    <i className="fas fa-star filled" />
                                    <i className="fas fa-star filled" />
                                    <i className="fas fa-star filled" />
                                    <span> (5.0)</span>
                                  </p>
                                </div>
                              </div>
                              <p>
                                It was popularised in the 1960s with the release
                                of Letraset sheets containing Lorem Ipsum
                                passages, and more recently with desktop
                                publishing software like Aldus PageMaker
                                including versions of Lorem Ipsum.It was
                                popularised in the 1960s{" "}
                              </p>
                              <div className="review-reply">
                                <Link className="btn" to="#">
                                  <i className="fa-solid fa-reply" />
                                  Reply
                                </Link>
                                <div className="review-action">
                                  <Link to="#">
                                    <i className="fa-regular fa-thumbs-up" />
                                    10
                                  </Link>
                                  <Link to="#">
                                    <i className="fa-regular fa-thumbs-down" />
                                    12
                                  </Link>
                                  <Link to="#">
                                    <i className="fa-regular fa-heart" />
                                    15
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <div className="review-wraps wrap-card">
                          <div className="review-header-group">
                            <div className="review-widget-header">
                              <span className="review-widget-img">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-02.jpg"
                                  className="img-fluid"
                                  alt="User"
                                />
                              </span>
                              <div className="review-design">
                                <h6>Casandra</h6>
                                <p>Reviewed 25 March 2024</p>
                              </div>
                            </div>
                            <div className="reviewbox-list-rating">
                              <p>
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <span> (5.0)</span>
                              </p>
                            </div>
                          </div>
                          <p>
                            It was popularised in the 1960s with the release of
                            Letraset sheets containing Lorem Ipsum passages, and
                            more recently with desktop publishing software like
                            Aldus PageMaker including versions of Lorem Ipsum.It
                            was popularised in the 1960s with the elease of
                            Letraset sheets containing Lorem Ipsum passages, and
                            more recently with desktop publishing software like
                            Aldus Page Maker including versions of Lorem Ipsum.
                          </p>
                          <div className="review-reply">
                            <Link className="btn" to="#">
                              <i className="fa-solid fa-reply" />
                              Reply
                            </Link>
                            <div className="review-action">
                              <Link to="#">
                                <i className="fa-regular fa-thumbs-up" />
                                10
                              </Link>
                              <Link to="#">
                                <i className="fa-regular fa-thumbs-down" />
                                12
                              </Link>
                              <Link to="#">
                                <i className="fa-regular fa-heart" />
                                15
                              </Link>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* /Reviews */}
                {/* Leave a Reply */}
                <div className="review-sec leave-reply-form mb-0">
                  <div className="review-header">
                    <h4>Leave a Reply</h4>
                  </div>
                  <div className="review-list-rating">
                    <div className="row">
                      <div className="col-xl-4 col-md-6">
                        <div className="set-rating">
                          <p>Service</p>
                          <div className="rating-selection">
                            <input
                              type="checkbox"
                              id="service1"
                              defaultValue={1}
                            />
                            <label htmlFor="service1" />
                            <input
                              type="checkbox"
                              id="service2"
                              defaultValue={2}
                            />
                            <label htmlFor="service2" />
                            <input
                              type="checkbox"
                              id="service3"
                              defaultValue={3}
                            />
                            <label htmlFor="service3" />
                            <input
                              type="checkbox"
                              id="service4"
                              defaultValue={4}
                            />
                            <label htmlFor="service4" />
                            <input
                              type="checkbox"
                              id="service5"
                              defaultValue={5}
                            />
                            <label htmlFor="service5" />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4 col-md-6">
                        <div className="set-rating">
                          <p>Location</p>
                          <div className="rating-selection">
                            <input type="checkbox" id="loc1" defaultValue={1} />
                            <label htmlFor="loc1" />
                            <input type="checkbox" id="loc2" defaultValue={2} />
                            <label htmlFor="loc2" />
                            <input type="checkbox" id="loc3" defaultValue={3} />
                            <label htmlFor="loc3" />
                            <input type="checkbox" id="loc4" defaultValue={4} />
                            <label htmlFor="loc4" />
                            <input type="checkbox" id="loc5" defaultValue={5} />
                            <label htmlFor="loc5" />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4 col-md-6">
                        <div className="set-rating">
                          <p>Facilities</p>
                          <div className="rating-selection">
                            <input type="checkbox" id="fac1" defaultValue={1} />
                            <label htmlFor="fac1" />
                            <input type="checkbox" id="fac2" defaultValue={2} />
                            <label htmlFor="fac2" />
                            <input type="checkbox" id="fac3" defaultValue={3} />
                            <label htmlFor="fac3" />
                            <input type="checkbox" id="fac4" defaultValue={4} />
                            <label htmlFor="fac4" />
                            <input type="checkbox" id="fac5" defaultValue={5} />
                            <label htmlFor="fac5" />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4 col-md-6">
                        <div className="set-rating">
                          <p>Value for Money</p>
                          <div className="rating-selection">
                            <input type="checkbox" id="val1" defaultValue={1} />
                            <label htmlFor="val1" />
                            <input type="checkbox" id="val2" defaultValue={2} />
                            <label htmlFor="val2" />
                            <input type="checkbox" id="val3" defaultValue={3} />
                            <label htmlFor="val3" />
                            <input type="checkbox" id="val4" defaultValue={4} />
                            <label htmlFor="val4" />
                            <input type="checkbox" id="val5" defaultValue={5} />
                            <label htmlFor="val5" />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4 col-md-6">
                        <div className="set-rating">
                          <p>Cleanliness</p>
                          <div className="rating-selection">
                            <input
                              type="checkbox"
                              id="clean1"
                              defaultValue={1}
                            />
                            <label htmlFor="clean1" />
                            <input
                              type="checkbox"
                              id="clean2"
                              defaultValue={2}
                            />
                            <label htmlFor="clean2" />
                            <input
                              type="checkbox"
                              id="clean3"
                              defaultValue={3}
                            />
                            <label htmlFor="clean3" />
                            <input
                              type="checkbox"
                              id="clean4"
                              defaultValue={4}
                            />
                            <label htmlFor="clean4" />
                            <input
                              type="checkbox"
                              id="clean5"
                              defaultValue={5}
                            />
                            <label htmlFor="clean5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="review-list">
                      <ul>
                        <li className="review-box feedbackbox mb-0">
                          <div className="review-details">
                            <form className="#">
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="input-block">
                                    <label>
                                      Full Name{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="input-block">
                                    <label>
                                      Email Address{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <input
                                      type="email"
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="input-block">
                                    <label>Comments </label>
                                    <textarea
                                      rows={4}
                                      className="form-control"
                                      defaultValue={""}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="submit-btn text-end">
                                <button
                                  className="btn btn-primary submit-review"
                                  type="submit"
                                >
                                  {" "}
                                  Submit Review
                                </button>
                              </div>
                            </form>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* /Leave a Reply */}
              </>
            </div>
















         <BookingIndex service={currentService}/>





















          </div>
        </div>
      </section>
    </div>
  );
};

export default observer (listingDetails);
