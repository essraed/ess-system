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
import '../../../../node_modules/font-awesome/css/font-awesome.min.css';
import ServiceList from "../../services/ServiceList";

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
          <i className="fa fa-facebook"></i>
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
        <div className="fl-fl float-yt">
          <i className="fa fa-youtube"></i>
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
      {/* Why Choose Us */}


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
                              We ensures a smooth conduit for individuals and businesses to engage
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


      <section className="section facts-number">
        <div id="Services" className="homesection servicessection saa viewon">
          <div className="custom-container">
            {/* Heading title*/}
            <div className="section-heading" data-aos="fade-down">
              <h2 className="section-title">Facts By The Numbers</h2>
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
                        <p> Happy Customers </p>
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
                            end={2}
                            duration={3}
                            separator=","
                          />
                          +<br />
                        </h4>
                        <p>Count of Centers</p>
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
                        <p>Strategic Partners</p>
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
                        <p>Trusting Companies</p>
                      </div>
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
            </div>
            {/* /Heading title */}
            <div className="row">
              <div className="col-lg-4 col-md-6 d-lg-flex">
                <div className="blog grid-blog">
                  <div className="blog-image">
                    <ImageWithBasePath
                      className="img-fluid"
                      src="assets/img/blog/DET_Opening.jpeg"
                      alt="Post Image"
                    />

                  </div>
                  <div className="blog-content">
                    <h3 className="blog-title">
                      <a href="">

                        2024 - DED Opening
                      </a>
                    </h3>


                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 d-lg-flex">
                <div className="blog grid-blog">
                  <div className="blog-image">
                    <ImageWithBasePath
                      className="img-fluid"
                      src="assets/img/blog/2023_NationalDay.jpg"
                      alt="Post Image"
                    />

                  </div>
                  <div className="blog-content">

                    <h3 className="blog-title">
                      <a href="">

                        2023 - National Day Celeberation
                      </a>
                    </h3>

                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 d-lg-flex">
                <div className="blog grid-blog">
                  <div className="blog-image">
                    <ImageWithBasePath
                      className="img-fluid"
                      src="assets/img/blog/BestEmployee_2024.jpg"
                      alt="Post Image"
                    />

                  </div>
                  <div className="blog-content">
                    <h3 className="blog-title">
                      <a href="">
                        Best Employee of the Month                      </a>
                    </h3>


                  </div>
                </div>
              </div>
            </div>
            <div
              className="view-all text-center aos-init aos-animate"
              data-aos="fade-down"
            >
              <a
                href="#"
                className="btn btn-view-custom d-inline-flex align-items-center"
              >
                View all News{" "}
                <span>
                  <i className="feather icon-arrow-right ms-2" />
                </span>
              </a>
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
