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
import Footer from "../../common/footer";
import Header from "../../common/header";
import CategoryList from "../../Categories/CategoryList";
import { observer } from "mobx-react-lite";
import ServiceList from "../../services/ServiceList";


const HomeOne = () => {
  const routes = all_routes;
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
      <section className="banner-section banner-slider">
        <div className="container">
          <div className="home-banner">
            <div className="row align-items-center">
              <div className="col-lg-6" data-aos="fade-down">
                <p className="explore-text">
                  {" "}
                  <span>
                    <i className="fa-solid fa-thumbs-up me-2"></i>
                  </span>
                  100% Trusted car rental platform in the World
                </p>
                <h1>
                  <span>Find Your Best</span> <br />
                  Dream Car for Rental
                </h1>
                <p>
                  Experience the ultimate in comfort, performance, and
                  sophistication with our luxury car rentals. From sleek sedans
                  and stylish coupes to spacious SUVs and elegant convertibles,
                  we offer a range of premium vehicles to suit your preferences
                  and lifestyle.
                </p>
              </div>
              <div className="col-lg-6" data-aos="fade-down">
                <div className="banner-imgs">
                  <ImageWithBasePath
                    src="assets/img/car-right.png"
                    className="img-fluid aos"
                    alt="bannerimage"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Banner */}
      {/* Search */}
      <div className="section-search">
        <div className="container">
          <div className="search-box-banner">
            <form>
              <ul className="align-items-center">
                <li className="column-group-main">
                  <div className="input-block">
                    <label>Pickup Location</label>
                    <div className="group-img">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter City, Airport, or Address"
                      />
                      <span>
                        <i className="feather icon-map-pin" />
                      </span>
                    </div>
                  </div>
                </li>
                <li className="column-group-main">
                  <div className="input-block">
                    <label>Pickup Date</label>
                  </div>
                  <div className="input-block-wrapp">
                    <div className="input-block date-widget">
                      <div className="group-img">
                        <Calendar
                          value={date1}
                          onChange={() => setDate1(null)}
                          placeholder="04/11/2023"
                        />
                        {/* <input type="text" className="form-control datetimepicker" placeholder="04/11/2023" /> */}
                        <span>
                          <i className="feather icon-calendar"></i>
                        </span>
                      </div>
                    </div>
                    <div className="input-block time-widge">
                      <div className="group-img">
                        <TimePicker
                          placeholder="11:00 AM"
                          className="form-control timepicker"
                          defaultValue={dayjs("00:00:00", "HH:mm:ss")}
                        />
                        <span>
                          <i className="feather icon-clock"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="column-group-main">
                  <div className="input-block">
                    <label>Return Date</label>
                  </div>
                  <div className="input-block-wrapp">
                    <div className="input-block date-widge">
                      <div className="group-img">
                        <Calendar
                          value={date2}
                          onChange={() => setDate2(null)}
                          placeholder="04/11/2023"
                        />
                        <span>
                          <i className="feather icon-calendar" />
                        </span>
                      </div>
                    </div>
                    <div className="input-block time-widge">
                      <div className="group-img">
                        <TimePicker
                          placeholder="11:00 AM"
                          className="form-control timepicker"
                          defaultValue={dayjs("00:00:00", "HH:mm:ss")}
                        />
                        <span>
                          <i className="feather icon-clock"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="column-group-last">
                  <div className="input-block">
                    <div className="search-btn">
                      <button className="btn search-button" type="submit">
                        {" "}
                        <i className="fa fa-search" aria-hidden="true" />
                        Search
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
      {/* /Search */}
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
      <section className="section popular-services popular-explore">
        <div className="container">
          {/* Heading title*/}
          <div className="section-heading" data-aos="fade-down">
            <h2>Explore Most Popular Cars</h2>
            <p>
              Lorem Ipsum has been the industry standard dummy text ever since
              the 1500s,
            </p>
          </div>
          {/* /Heading title */}

          <CategoryList />

          <div className="tab-content">
            <div className="tab-pane active" id="Carmazda">
              <div className="row">
                <>
                  <ServiceList />
                </>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Popular Services */}
      {/* Popular Cartypes */}
      <section className="section popular-car-type">
        <div className="container">
          {/* Heading title*/}
          <div className="section-heading" data-aos="fade-down">
            <h2>Most Popular Cartypes</h2>
            <p>
              Most popular worldwide Car Category due to their reliability,
              affordability, and features.
            </p>
          </div>
          {/* /Heading title */}
          <div className="row">
            <div className="popular-slider-group ">
              <div className="popular-cartype-slider">
                <Slider {...settings} className="service-slider">
                  <div className="listing-owl-item">
                    <div className="listing-owl-group">
                      <div className="listing-owl-img">
                        <ImageWithBasePath
                          src="assets/img/cars/mp-vehicle-01.png"
                          className="img-fluid"
                          alt="Popular Cartypes"
                        />
                      </div>
                      <h6>Crossover</h6>
                      <p>35 Cars</p>
                    </div>
                  </div>
                  <div className="listing-owl-item">
                    <div className="listing-owl-group">
                      <div className="listing-owl-img">
                        <ImageWithBasePath
                          src="assets/img/cars/mp-vehicle-02.png"
                          className="img-fluid"
                          alt="Popular Cartypes"
                        />
                      </div>
                      <h6>Sports Coupe</h6>
                      <p>45 Cars</p>
                    </div>
                  </div>
                  <div className="listing-owl-item">
                    <div className="listing-owl-group">
                      <div className="listing-owl-img">
                        <ImageWithBasePath
                          src="assets/img/cars/mp-vehicle-03.png"
                          className="img-fluid"
                          alt="Popular Cartypes"
                        />
                      </div>
                      <h6>Sedan</h6>
                      <p>15 Cars</p>
                    </div>
                  </div>
                  <div className="listing-owl-item">
                    <div className="listing-owl-group">
                      <div className="listing-owl-img">
                        <ImageWithBasePath
                          src="assets/img/cars/mp-vehicle-04.png"
                          className="img-fluid"
                          alt="Popular Cartypes"
                        />
                      </div>
                      <h6>Pickup</h6>
                      <p>17 Cars</p>
                    </div>
                  </div>
                  <div className="listing-owl-item">
                    <div className="listing-owl-group">
                      <div className="listing-owl-img">
                        <ImageWithBasePath
                          src="assets/img/cars/mp-vehicle-05.png"
                          className="img-fluid"
                          alt="Popular Cartypes"
                        />
                      </div>
                      <h6>Family MPV</h6>
                      <p>24 Cars</p>
                    </div>
                  </div>
                  <div className="listing-owl-item">
                    <div className="listing-owl-group">
                      <div className="listing-owl-img">
                        <ImageWithBasePath
                          src="assets/img/cars/mp-vehicle-05.png"
                          className="img-fluid"
                          alt="Popular Cartypes"
                        />
                      </div>
                      <h6>Family MPV</h6>
                      <p>24 Cars</p>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
          {/* View More */}
          
          {/* View More */}
        </div>
      </section>
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
      <section className="section popular-services">
        <div className="container">
          {/* Heading title*/}
          <div className="section-heading" data-aos="fade-down">
            <h2>Recommended Car Rental deals</h2>
            <p>Here are some versatile options that cater to different needs</p>
          </div>
          {/* /Heading title */}
          

          {/* View More */}
          
          {/* View More */}
        </div>
      </section>
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
      <section className="section about-testimonial testimonials-section">
        <div className="container">
          {/* Heading title*/}
          <div className="section-heading" data-aos="fade-down">
            <h2 className="title text-white">What People say about us? </h2>
            <p className="description text-white">
              Discover what our customers have think about us
            </p>
          </div>
          {/* /Heading title */}
          <div className="owl-carousel about-testimonials testimonial-group mb-0 owl-theme">
            {/* /Carousel Item  */}
            {/* Carousel Item */}
            {/* /Carousel Item  */}
            {/* Carousel Item */}

            {/* /Carousel Item  */}
          </div>
        </div>
      </section>
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
      <section className="pricing-section pricing-page pricing-section-bottom">
        <div className="container">
          {/* Heading title*/}
          <div className="section-heading" data-aos="fade-down">
            <h2>Transparent Pricing For you</h2>
            <p>Choose a package that suits you</p>
          </div>
          {/* /Heading title */}
          {/* Plan Selected */}
          <div className="plan-selected" data-aos="fade-down">
            <h4>Monthly</h4>
            <div className="status-toggle me-2 ms-2">
              <input
                id="list-rating_1"
                className="px-4 check"
                type="checkbox"
              />
              <label
                htmlFor="list-rating_1"
                className="px-4 checktoggle checkbox-bg"
              >
                checkbox
              </label>
            </div>
            <h4>Annually</h4>
          </div>
          {/* /Plan Selected */}
          <div className="row">
            <div
              className="col-lg-3 d-flex col-md-6 col-12"
              data-aos="fade-down"
            >
              <div className="price-card price-selected flex-fill">
                <div className="price-head">
                  <h2>Save more with Good Plans</h2>
                  <p>
                    Choose a plan and get onboard in Minutes, then get $100 with
                    next payment
                  </p>
                </div>
                <div className="price-body">
                  <ImageWithBasePath
                    className="img-fluid"
                    src="assets/img/price-plan.png"
                    alt="Price Plan"
                  />
                </div>
              </div>
            </div>
            <>
              <div
                className="col-lg-3 d-flex col-md-6 col-12"
                data-aos="fade-down"
              >
                <div className="price-card flex-fill">
                  <div className="price-head">
                    <div className="price-level">
                      <h6>Basic Rental </h6>
                      <p>For the basics</p>
                    </div>
                    <h4>$49</h4>
                    <span>Per user per month</span>
                  </div>
                  <div className="price-details">
                    <ul>
                      <li className="price-check">
                        <span>
                          <i className="fa-regular fa-circle-check" />
                        </span>
                        50% Downpayment
                      </li>
                      <li className="price-check">
                        <span>
                          <i className="fa-regular fa-circle-check" />
                        </span>
                        Insurance not Included
                      </li>
                      <li className="price-check">
                        <span>
                          <i className="fa-regular fa-circle-check" />
                        </span>
                        Doorstep delivery
                      </li>
                      <li className="price-uncheck">
                        <span>
                          <i className="fa-regular fa-circle-xmark" />
                        </span>
                        Safe &amp; Sanitized
                      </li>
                      <li className="price-uncheck">
                        <span>
                          <i className="fa-regular fa-circle-xmark" />
                        </span>
                        No Long term Commitment
                      </li>
                      <li className="price-uncheck">
                        <span>
                          <i className="fa-regular fa-circle-xmark" />
                        </span>
                        Refundable deposit has to pay
                      </li>
                      <li className="price-uncheck">
                        <span>
                          <i className="fa-regular fa-circle-xmark" />
                        </span>
                        No Flexible timing &amp; extension
                      </li>
                    </ul>
                    <Link to={routes.login} className="btn viewdetails-btn">
                      Buy Package
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 d-flex col-md-6 col-12"
                data-aos="fade-down"
              >
                <div className="price-card flex-fill active">
                  <div className="price-head">
                    <div className="price-level price-level-popular">
                      <h6>Recommended</h6>
                      <p>For the Users</p>
                    </div>
                    <h4>$95</h4>
                    <span>Per user per month</span>
                  </div>
                  <div className="price-details">
                    <ul>
                      <li className="price-check">
                        <span>
                          <i className="fa-regular fa-circle-check" />
                        </span>
                        50% Downpayment
                      </li>
                      <li className="price-check">
                        <span>
                          <i className="fa-regular fa-circle-check" />
                        </span>
                        Insurance not Included
                      </li>
                      <li className="price-check">
                        <span>
                          <i className="fa-regular fa-circle-check" />
                        </span>
                        Doorstep delivery
                      </li>
                      <li className="price-check">
                        <span>
                          <i className="fa-regular fa-circle-check" />
                        </span>
                        Safe &amp; Sanitized
                      </li>
                      <li className="price-check">
                        <span>
                          <i className="fa-regular fa-circle-check" />
                        </span>
                        Long term Commitment 1 month
                      </li>
                      <li className="price-uncheck">
                        <span>
                          <i className="fa-regular fa-circle-xmark" />
                        </span>
                        Refundable deposit has to pay
                      </li>
                      <li className="price-uncheck">
                        <span>
                          <i className="fa-regular fa-circle-xmark" />
                        </span>
                        No Flexible timing &amp; extension
                      </li>
                    </ul>
                    <Link
                      to={routes.login}
                      className="btn viewdetails-btn btn-popular"
                    >
                      Buy Package
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 d-flex col-md-6 col-12"
                data-aos="fade-down"
              >
                <div className="price-card flex-fill">
                  <div className="price-head">
                    <div className="price-level">
                      <h6>Pro</h6>
                      <p>For the Pro</p>
                    </div>
                    <h4>$154</h4>
                    <span>Per user per month</span>
                  </div>
                  <div className="price-details">
                    <ul>
                      <li className="price-check">
                        <span>
                          <i className="fa-regular fa-circle-check" />
                        </span>
                        50% Downpayment
                      </li>
                      <li className="price-check">
                        <span>
                          <i className="fa-regular fa-circle-check" />
                        </span>
                        Insurance not Included
                      </li>
                      <li className="price-check">
                        <span>
                          <i className="fa-regular fa-circle-check" />
                        </span>
                        Doorstep delivery
                      </li>
                      <li className="price-check">
                        <span>
                          <i className="fa-regular fa-circle-check" />
                        </span>
                        Safe &amp; Sanitized
                      </li>
                      <li className="price-check">
                        <span>
                          <i className="fa-regular fa-circle-check" />
                        </span>
                        Long term Commitment 1 month
                      </li>
                      <li className="price-check">
                        <span>
                          <i className="fa-regular fa-circle-check" />
                        </span>
                        No Refundable deposit
                      </li>
                      <li className="price-check">
                        <span>
                          <i className="fa-regular fa-circle-check" />
                        </span>
                        No Flexible timing &amp; extension
                      </li>
                    </ul>
                    <Link to={routes.login} className="btn viewdetails-btn">
                      Buy Package
                    </Link>
                  </div>
                </div>
              </div>
            </>
          </div>
          {/* App Available */}
          <div className="user-app-group">
            <div className="app-left">
              <ImageWithBasePath
                src="assets/img/bg/app-left.png"
                className="img-fluid"
                alt="App Available"
              />
            </div>
            <div className="app-right">
              <ImageWithBasePath
                src="assets/img/bg/app-right.png"
                className="img-fluid"
                alt="App Available"
              />
            </div>
            <div className="row">
              <div className="col-lg-7">
                <div className="userapp-heading">
                  <h2 data-aos="fade-down">
                    Dreamsrental User Friendly App Available
                  </h2>
                  <p data-aos="fade-down">
                    Appropriately monetize one-to-one interfaces rather than
                    cutting-edge Competently disinte rmediate backward.
                  </p>
                  <div className="download-btn">
                    <div className="app-avilable" data-aos="fade-down">
                      <Link to="#">
                        <ImageWithBasePath
                          src="assets/img/play-store.svg"
                          alt="PlayStore"
                        />
                      </Link>
                    </div>
                    <div className="app-avilable" data-aos="fade-down">
                      <Link to="#">
                        <ImageWithBasePath
                          src="assets/img/apple.svg"
                          alt="AppStore"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 d-none d-lg-block">
                <div className="car-holder">
                  <ImageWithBasePath
                    className="app-car img-fluid"
                    src="assets/img/app-car.png"
                    alt="App Available"
                    data-aos="fade-down"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* /App Available */}
        </div>
      </section>
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
          </div>
        </section>
        {/* /Blog Section */}
      </>
      <Footer />
    </>
  );
};

export default observer(HomeOne);
