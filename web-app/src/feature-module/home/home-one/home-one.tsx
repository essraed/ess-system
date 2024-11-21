import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Calendar } from "primereact/calendar";
import CountUp from "react-countup";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";

import dayjs from "dayjs";
import { TimePicker } from "antd";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import { all_routes } from "../../router/all_routes";
import { testimonialsData } from "../../../core/data/json/testimonials_data";
import Footer from "../../common/footer";
import Header from "../../common/header";
import CategoryList from "../../Categories/CategoryList";
import { observer } from "mobx-react-lite";


import ServiceList from "../../services/ServiceList";
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

const HomeOne = () => {
  const routes = all_routes;
  const testimonials = testimonialsData;
  const [selectedItems, setSelectedItems] = useState(Array(10).fill(false));
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);
  // const onChange = (time: Dayjs, timeString: string) => {
  //   console.log(time, timeString);
  // };

  
  const handleItemClick = (index: number) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = [...prevSelectedItems];
      updatedSelectedItems[index] = !updatedSelectedItems[index];
      return updatedSelectedItems;
    });
  };

  const settings = {
    dots: false,
    nav: true,

    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
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
  const imgslideroption = {
    dots: true,
    nav: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const rentalslideroption = {
    dots: false,
    nav: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const setting = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nav: false,
  };

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);
  return (
    <>
      <Header />
      {/* Banner */}

<div className="float-sm">
  <div className="fl-fl float-fb">
  <i className="feather feather-facebook"></i>
      <a href="" target="_blank"> Like us!</a>
  </div>
  <div className="fl-fl float-tw">
    <i className="fa fa-twitter"></i>
    <a href="" target="_blank">Follow us!</a>
  </div>
  <div className="fl-fl float-gp">
    <i className="fa fa-google-plus"></i>
    <a href="" target="_blank">Recommend us!</a>
  </div>
  <div className="fl-fl float-rs">
    <i className="fa fa-rss"></i>
    <a href="" target="_blank">Follow via RSS</a>
  </div>
  <div className="fl-fl float-ig">
    <i className="fa fa-instagram"></i>
    <a href="" target="_blank">Follow us!</a>
  </div>
  <div className="fl-fl float-pn">
    <i className="fa fa-pinterest"></i>
    <a href="" target="_blank">Follow us!</a>
  </div>
</div>

      <section className="banner-section banner-slider">
        <div className="container-fluid">
          <div className="home-banner">
            <div className="row align-items-center">




            </div>
          </div>
        </div>
      </section>
      {/* /Banner */}

      <section className="section-top">
        <div id="Services" className="homesection servicessection saa viewon">
          <div className="custom-container">
            <div className="row">
              <h2 className="section-title">Our Services</h2>
              <div className="col-lg-3 col-md-3 col-6 aos-init aos-animate" data-aos="fade-down">
                <div className="listing-item">
                  <div className="listing-img">
                    <div className="img-slider owl-carousel owl-loaded owl-drag">
                      <div className="owl-stage-outer">
                        <div className="owl-stage">
                          <div className="owl-item cloned">
                            <div className="slide-images">
                              <a href="listing-details.html">
                                <img src="assets/img/shini photos for web-07.png" className="img-fluid" alt="DHA" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="listing-content">
                        <div className="listing-features d-flex align-items-end justify-content-between">
                          <div className="list-rating">
                            <h3 className="listing-title">
                              <a href="listing-details.html">MEDICAL DHA</a>
                            </h3>
                            <p>Medical Fitness Services and Occupational Health Screening Services for Visa</p>
                          </div>
                        </div>
                        <div className="view-more-btn text-center">
                          <a href="listing-grid.html" className="btn btn-secondary">View  More</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-6 aos-init aos-animate" data-aos="fade-down">
                <div className="listing-item">
                  <div className="listing-img">
                    <div className="img-slider owl-carousel owl-loaded owl-drag">
                      <div className="owl-stage-outer">
                        <div className="owl-stage">
                          <div className="owl-item cloned">
                            <div className="slide-images">
                              <a href="listing-details.html">
                                <img src="assets/img/shini photos for web-05.png" className="img-fluid" alt="Amer" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="listing-content">
                        <div className="listing-features d-flex align-items-end justify-content-between">
                          <div className="list-rating">
                            <h3 className="listing-title">
                              <a href="listing-details.html">Typing Services</a>
                            </h3>
                            <p>Our Typing services are designed to simplify the documentation process</p>
                          </div>
                        </div>
                        <div className="view-more-btn text-center">
                          <a href="listing-grid.html" className="btn btn-secondary">View  More</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-3 col-6 aos-init aos-animate" data-aos="fade-down">
                <div className="listing-item">
                  <div className="listing-img">
                    <div className="img-slider owl-carousel owl-loaded owl-drag">
                      <div className="owl-stage-outer">
                        <div className="owl-stage">
                          <div className="owl-item cloned">
                            <div className="slide-images">
                              <a href="listing-details.html">
                                <img src="assets/img/shini photos for web-02.png" className="img-fluid" alt="Amer" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="listing-content">
                        <div className="listing-features d-flex align-items-end justify-content-between">
                          <div className="list-rating">
                            <h3 className="listing-title">
                              <a href="listing-details.html">Amer Services</a>
                            </h3>
                            <p>Simplify Your Entry Process with Our Amer Services</p>
                          </div>
                        </div>
                        <div className="view-more-btn text-center">
                          <a href="listing-grid.html" className="btn btn-secondary">View  More</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-3 col-6 aos-init aos-animate" data-aos="fade-down">
                <div className="listing-item">
                  <div className="listing-img">
                    <div className="img-slider owl-carousel owl-loaded owl-drag">
                      <div className="owl-stage-outer">
                        <div className="owl-stage">
                          <div className="owl-item cloned">
                            <div className="slide-images">
                              <a href="listing-details.html">
                                <img src="assets/img/shini photos for web-01.png" className="img-fluid" alt="Amer" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="listing-content">
                        <div className="listing-features d-flex align-items-end justify-content-between">
                          <div className="list-rating">

                            <h3 className="listing-title">
                              <a href="listing-details.html">DET Services</a>
                            </h3>
<p>
Center ensures a smooth conduit for individuals and businesses to engage with DET
</p>
                          </div>
                        </div>
                        <div className="view-more-btn text-center">
                          <a href="listing-grid.html" className="btn btn-secondary">View  More</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-3 col-6 aos-init aos-animate" data-aos="fade-down">
                <div className="listing-item">
                  <div className="listing-img">
                    <div className="img-slider owl-carousel owl-loaded owl-drag">
                      <div className="owl-stage-outer">
                        <div className="owl-stage">
                          <div className="owl-item cloned">
                            <div className="slide-images">
                              <a href="listing-details.html">
                                <img src="assets/img/shini photos for web-08.png" className="img-fluid" alt="Amer" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="listing-content">
                        <div className="listing-features d-flex align-items-end justify-content-between">
                          <div className="list-rating">

                            <h3 className="listing-title">
                              <a href="listing-details.html">Golden Visa Services</a>
                            </h3>
<p>Golden visa is one of the services provided by the Federal Authority for Identity</p>
                          </div>
                        </div>
                        <div className="view-more-btn text-center">
                          <a href="listing-grid.html" className="btn btn-secondary">View  More</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-3 col-6 aos-init aos-animate" data-aos="fade-down">
                <div className="listing-item">
                  <div className="listing-img">
                    <div className="img-slider owl-carousel owl-loaded owl-drag">
                      <div className="owl-stage-outer">
                        <div className="owl-stage">
                          <div className="owl-item cloned">
                            <div className="slide-images">
                              <a href="listing-details.html">
                                <img src="assets/img/shini photos for web-08.png" className="img-fluid" alt="Amer" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="listing-content">
                        <div className="listing-features d-flex align-items-end justify-content-between">
                          <div className="list-rating">

                            <h3 className="listing-title">
                              <a href="listing-details.html">Premium Services</a>
                            </h3>
<p>Golden visa is one of the services provided by the Federal Authority for Identity</p>
                          </div>
                        </div>
                        <div className="view-more-btn text-center">
                          <a href="listing-grid.html" className="btn btn-secondary">View  More</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-3 col-6 aos-init aos-animate" data-aos="fade-down">
                <div className="listing-item">
                  <div className="listing-img">
                    <div className="img-slider owl-carousel owl-loaded owl-drag">
                      <div className="owl-stage-outer">
                        <div className="owl-stage">
                          <div className="owl-item cloned">
                            <div className="slide-images">
                              <a href="listing-details.html">
                                <img src="assets/img/shini photos for web-06.png" className="img-fluid" alt="Amer" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="listing-content">
                        <div className="listing-features d-flex align-items-end justify-content-between">
                          <div className="list-rating">

                            <h3 className="listing-title">
                              <a href="listing-details.html">Tasheel Services</a>
                            </h3>
<p>Golden visa is one of the services provided by the Federal Authority for Identity</p>
                          </div>
                        </div>
                        <div className="view-more-btn text-center">
                          <a href="listing-grid.html" className="btn btn-secondary">View  More</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-3 col-6 aos-init aos-animate" data-aos="fade-down">
                <div className="listing-item">
                  <div className="listing-img">
                    <div className="img-slider owl-carousel owl-loaded owl-drag">
                      <div className="owl-stage-outer">
                        <div className="owl-stage">
                          <div className="owl-item cloned">
                            <div className="slide-images">
                              <a href="listing-details.html">
                                <img src="assets/img/shini photos for web-04.png" className="img-fluid" alt="Amer" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="listing-content">
                        <div className="listing-features d-flex align-items-end justify-content-between">
                          <div className="list-rating">

                            <h3 className="listing-title">
                              <a href="listing-details.html">Fast Track Services</a>
                            </h3>
<p>Golden visa is one of the services provided by the Federal Authority for Identity</p>
                          </div>
                        </div>
                        <div className="view-more-btn text-center">
                          <a href="listing-grid.html" className="btn btn-secondary">View  More</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* services */}
      <section className="section services">
        <div className="service-right">
          <ImageWithBasePath
            src="assets/img/bg/service-right.svg"
            className="img-fluid"
            alt="services right"
          />
        </div>
        <div className="container">
          {/* Heading title*/}
          <div className="section-heading" data-aos="fade-down">
            <h2>How It Works</h2>
            <p>
              Booking a car rental is a straightforward process that typically
              involves the following steps
            </p>
          </div>
          {/* /Heading title */}
          <div className="services-work">
            <div className="row">
              <div
                className="col-lg-4 col-md-4 col-12 d-flex"
                data-aos="fade-down"
              >
                <div className="services-group service-date flex-fill">
                  <div className="services-icon border-secondary">
                    <ImageWithBasePath
                      className="icon-img bg-secondary"
                      src="assets/img/icons/services-icon-01.svg"
                      alt="Choose Locations"
                    />
                  </div>
                  <div className="services-content">
                    <h3>1. Choose Date & Locations</h3>
                    <p>
                      Determine the date & location for your car rental.
                      Consider factors such as your travel itinerary,
                      pickup/drop-off locations (e.g., airport, city center),
                      and duration of rental.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-4 col-12  d-flex"
                data-aos="fade-down"
              >
                <div className="services-group service-loc flex-fill">
                  <div className="services-icon border-warning">
                    <ImageWithBasePath
                      className="icon-img bg-warning"
                      src="assets/img/icons/services-icon-02.svg"
                      alt="Choose Locations"
                    />
                  </div>
                  <div className="services-content">
                    <h3>2. Pick-Up Locations</h3>
                    <p>
                      Check the availability of your desired vehicle type for
                      your chosen dates and location. Ensure that the rental
                      rates, taxes, fees, and any additional charges.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-4 col-12 d-flex"
                data-aos="fade-down"
              >
                <div className="services-group service-book flex-fill">
                  <div className="services-icon border-dark">
                    <ImageWithBasePath
                      className="icon-img bg-dark"
                      src="assets/img/icons/services-icon-03.svg"
                      alt="Choose Locations"
                    />
                  </div>
                  <div className="services-content">
                    <h3>3. Book your Car</h3>
                    <p>
                      Once you`&lsquo;`ve found car rental option, proceed to
                      make a reservation. Provide the required information,
                      including your details, driver`&lsquo;`s license, contact
                      info, and payment details.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /services */}
      {/* Popular Services */}

      {/* /Popular Services */}
      {/* Popular Cartypes */}

      {/* /Popular Cartypes */}
      {/* Facts By The Numbers */}
      <section className="section facts-number">
        <div className="facts-left">
          <ImageWithBasePath
            src="assets/img/bg/facts-left.png"
            className="img-fluid"
            alt="facts left"
          />
        </div>
        <div className="facts-right">
          <ImageWithBasePath
            src="assets/img/bg/facts-right.png"
            className="img-fluid"
            alt="facts right"
          />
        </div>
        <div className="container">
          {/* Heading title*/}
          <div className="section-heading" data-aos="fade-down">
            <h2 className="title text-white">Facts By The Numbers</h2>
            <p className="description text-white">
              Here are some dreamsrent interesting facts presented by the
              numbers
            </p>
          </div>
          {/* /Heading title */}
          <div className="counter-group">
            <div className="row">
              <div
                className="col-lg-3 col-md-6 col-12 d-flex"
                data-aos="fade-down"
              >
                <div className="count-group flex-fill">
                  <div className="customer-count d-flex align-items-center">
                    <div className="count-img">
                      <ImageWithBasePath
                        src="assets/img/icons/bx-heart.svg"
                        alt=""
                      />
                    </div>
                    <div className="count-content">
                      <h4>
                        <CountUp
                          className="counterUp"
                          end={16000}
                          duration={3}
                          separator=","
                        />
                        K<br />
                      </h4>
                      <p> Happy Customer </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-12 d-flex"
                data-aos="fade-down"
              >
                <div className="count-group flex-fill">
                  <div className="customer-count d-flex align-items-center">
                    <div className="count-img">
                      <ImageWithBasePath
                        src="assets/img/icons/bx-car.svg"
                        alt=""
                      />
                    </div>
                    <div className="count-content">
                      <h4>
                        <CountUp
                          className="counterUp"
                          end={2547}
                          duration={3}
                          separator=","
                        />
                        +<br />
                      </h4>
                      <p>Count of Cars</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-12 d-flex"
                data-aos="fade-down"
              >
                <div className="count-group flex-fill">
                  <div className="customer-count d-flex align-items-center">
                    <div className="count-img">
                      <ImageWithBasePath
                        src="assets/img/icons/bx-headphone.svg"
                        alt=""
                      />
                    </div>
                    <div className="count-content">
                      <h4>
                        <CountUp
                          className="counterUp"
                          end={625}
                          duration={3}
                          separator=","
                        />
                        K+
                        <br />
                      </h4>
                      <p>Car Center Solutions</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-12 d-flex"
                data-aos="fade-down"
              >
                <div className="count-group flex-fill">
                  <div className="customer-count d-flex align-items-center">
                    <div className="count-img">
                      <ImageWithBasePath
                        src="assets/img/icons/bx-history.svg"
                        alt=""
                      />
                    </div>
                    <div className="count-content">
                      <h4>
                        <CountUp
                          className="counterUp"
                          end={200}
                          duration={3}
                          separator=","
                        />
                        K+
                        <br />
                      </h4>
                      <p>Total Kilometer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Facts By The Numbers */}
      {/* Rental deals */}

      {/* /Rental deals */}
      {/* Why Choose Us */}
      <section className="section why-choose popular-explore">
        <div className="choose-left">
          <ImageWithBasePath
            src="assets/img/bg/choose-left.png"
            className="img-fluid"
            alt="Why Choose Us"
          />
        </div>
        <div className="container">
          {/* Heading title*/}
          <div className="section-heading" data-aos="fade-down">
            <h2>Why Choose Us</h2>
            <p>
              Lorem Ipsum has been the industry standard dummy text ever since
              the 1500s,
            </p>
          </div>
          {/* /Heading title */}
          <div className="why-choose-group">
            <div className="row">
              <div
                className="col-lg-4 col-md-6 col-12 d-flex"
                data-aos="fade-down"
              >
                <div className="card flex-fill">
                  <div className="card-body">
                    <div className="choose-img choose-black">
                      <ImageWithBasePath
                        src="assets/img/icons/bx-selection.svg"
                        alt=""
                      />
                    </div>
                    <div className="choose-content">
                      <h4>Easy &amp; Fast Booking</h4>
                      <p>
                        Completely carinate e business testing process whereas
                        fully researched customer service. Globally extensive
                        content with quality.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 col-12 d-flex"
                data-aos="fade-down"
              >
                <div className="card flex-fill">
                  <div className="card-body">
                    <div className="choose-img choose-secondary">
                      <ImageWithBasePath
                        src="assets/img/icons/bx-crown.svg"
                        alt=""
                      />
                    </div>
                    <div className="choose-content">
                      <h4>Many Pickup Location</h4>
                      <p>
                        Enthusiastically magnetic initiatives with
                        cross-platform sources. Dynamically target testing
                        procedures through effective.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 col-12 d-flex"
                data-aos="fade-down"
              >
                <div className="card flex-fill">
                  <div className="card-body">
                    <div className="choose-img choose-primary">
                      <ImageWithBasePath
                        src="assets/img/icons/bx-user-check.svg"
                        alt=""
                      />
                    </div>
                    <div className="choose-content">
                      <h4>Customer Satisfaction</h4>
                      <p>
                        Globally user centric method interactive. Seamlessly
                        revolutionize unique portals corporate collaboration.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Why Choose Us */}
      {/* About us Testimonials */}

      {/* About us Testimonials */}
      {/* FAQ  */}
      <section className="section faq-section bg-light-primary">
        <div className="container">
          {/* Heading title*/}
          <div className="section-heading" data-aos="fade-down">
            <h2>Frequently Asked Questions </h2>
            <p>Find answers to your questions from our previous answers</p>
          </div>
          {/* /Heading title */}
          <div className="faq-info">
            <div className="faq-card bg-white" data-aos="fade-down">
              <h4 className="faq-title">
                <Link
                  className="collapseds"
                  data-bs-toggle="collapse"
                  to="#faqOne"
                  aria-expanded="true"
                >
                  How old do I need to be to rent a car?
                </Link>
              </h4>
              <div id="faqOne" className="card-collapse collapse show">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
            <div className="faq-card bg-white" data-aos="fade-down">
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
            <div className="faq-card bg-white" data-aos="fade-down">
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
                  We offer a diverse fleet of vehicles to suit every need,
                  including compact cars, sedans, SUVs and luxury vehicles. You
                  can browse our selection online or contact us for assistance
                  in choosing the right vehicle for you
                </p>
              </div>
            </div>
            <div className="faq-card bg-white" data-aos="fade-down">
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
            <div className="faq-card bg-white" data-aos="fade-down">
              <h4 className="faq-title">
                <Link
                  className="collapsed"
                  data-bs-toggle="collapse"
                  to="#faqFive"
                  aria-expanded="false"
                >
                  What is your fuel policy?
                </Link>
              </h4>
              <div id="faqFive" className="card-collapse collapse">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
            <div className="faq-card bg-white" data-aos="fade-down">
              <h4 className="faq-title">
                <Link
                  className="collapsed"
                  data-bs-toggle="collapse"
                  to="#faqSix"
                  aria-expanded="false"
                >
                  Can I add additional drivers to my rental agreement?
                </Link>
              </h4>
              <div id="faqSix" className="card-collapse collapse">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
            <div className="faq-card bg-white" data-aos="fade-down">
              <h4 className="faq-title">
                <Link
                  className="collapsed"
                  data-bs-toggle="collapse"
                  to="#faqSeven"
                  aria-expanded="false"
                >
                  What happens if I return the car late?
                </Link>
              </h4>
              <div id="faqSeven" className="card-collapse collapse">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /FAQ */}
      {/* Pricing Plan */}

      {/* /Pricing Plan */}
      <>
        {/* Blog Section */}
        <section className="blog-section news-section pt-0">
          <div className="container">
            {/* Heading title*/}
            <div className="section-heading" data-aos="fade-down">
              <h2>News &amp; Insights For You</h2>
              <p>This blog post provides valuable insights into the benefits</p>
            </div>
            {/* /Heading title */}
            <div className="row">
              <div className="col-lg-4 col-md-6 d-lg-flex">
                <div className="blog grid-blog">
                  <div className="blog-image">
                    <Link to={routes.blogDetails}>
                      <ImageWithBasePath
                        className="img-fluid"
                        src="assets/img/blog/blog-4.jpg"
                        alt="Post Image"
                      />
                    </Link>
                  </div>
                  <div className="blog-content">
                    <p className="blog-category">
                      <Link to="#">
                        <span>Journey</span>
                      </Link>
                    </p>
                    <h3 className="blog-title">
                      <Link to={routes.blogDetails}>
                        The 2023 Ford F-150 Raptor – A First Look
                      </Link>
                    </h3>
                    <p className="blog-description">
                      Covers all aspects of the automotive industry with a focus
                      on accessibility
                    </p>
                    <ul className="meta-item mb-0">
                      <li>
                        <div className="post-author">
                          <div className="post-author-img">
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-04.jpg"
                              alt="author"
                            />
                          </div>
                          <Link to="#">
                            {" "}
                            <span> Hellan </span>
                          </Link>
                        </div>
                      </li>
                      <li className="date-icon">
                        <i className="fa-solid fa-calendar-days" />{" "}
                        <span>October 6, 2022</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 d-lg-flex">
                <div className="blog grid-blog">
                  <div className="blog-image">
                    <Link to={routes.blogDetails}>
                      <ImageWithBasePath
                        className="img-fluid"
                        src="assets/img/blog/blog-3.jpg"
                        alt="Post Image"
                      />
                    </Link>
                  </div>
                  <div className="blog-content">
                    <p className="blog-category">
                      <Link to="#">
                        <span>Tour &amp; tip</span>
                      </Link>
                    </p>
                    <h3 className="blog-title">
                      <Link to={routes.blogDetails}>
                        Tesla Model S: Top Secret Car Collector’s Garage
                      </Link>
                    </h3>
                    <p className="blog-description">
                      Catering to driving enthusiasts, Road &amp; Track provides
                      engaging content on...
                    </p>
                    <ul className="meta-item mb-0">
                      <li>
                        <div className="post-author">
                          <div className="post-author-img">
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-13.jpg"
                              alt="author"
                            />
                          </div>
                          <Link to="#">
                            {" "}
                            <span> Alphonsa Daniel </span>
                          </Link>
                        </div>
                      </li>
                      <li className="date-icon">
                        <i className="fa-solid fa-calendar-days" />{" "}
                        <span>March 6, 2023</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 d-lg-flex">
                <div className="blog grid-blog">
                  <div className="blog-image">
                    <Link to={routes.blogDetails}>
                      <ImageWithBasePath
                        className="img-fluid"
                        src="assets/img/blog/blog-10.jpg"
                        alt="Post Image"
                      />
                    </Link>
                  </div>
                  <div className="blog-content">
                    <p className="blog-category">
                      <Link to="#">
                        <span>Updates</span>
                      </Link>
                    </p>
                    <h3 className="blog-title">
                      <Link to={routes.blogDetails}>
                        Dedicated To Cars, Covering Everything
                      </Link>
                    </h3>
                    <p className="blog-description">
                      Known for its irreverent take on car culture, offers a mix
                      of news, reviews...
                    </p>
                    <ul className="meta-item mb-0">
                      <li>
                        <div className="post-author">
                          <div className="post-author-img">
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-13.jpg"
                              alt="author"
                            />
                          </div>
                          <Link to="#">
                            {" "}
                            <span> Hellan</span>
                          </Link>
                        </div>
                      </li>
                      <li className="date-icon">
                        <i className="fa-solid fa-calendar-days" />{" "}
                        <span>March 6, 2023</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="view-all text-center aos-init aos-animate"
              data-aos="fade-down"
            >
              <Link
                to={routes.blogDetails}
                className="btn btn-view-custom d-inline-flex align-items-center"
              >
                View all Blogs{" "}
                <span>
                  <i className="feather icon-arrow-right ms-2" />
                </span>
              </Link>
            </div>
          </div>
        </section>
        {/* /Blog Section */}
      </>
      <Footer />
    </>
  );
};

export default observer(HomeOne);
