
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import CountUp from "react-countup";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";

import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import Footer from "../../common/footer";
import { observer } from "mobx-react-lite";
import '../../../../node_modules/font-awesome/css/font-awesome.min.css';
import Header from "../../common/header";
import CategoryList from "../../Categories/CategoryList";
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import 'react-accessible-accordion/dist/fancy-example.css';

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

const HomeOne = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);
  return (
    <>
      <Header />
      <div>
        <div className="float-sm">
          <div className="fl-fl float-fb">
            <i className="fa fa-facebook fa-2x"></i>
            <a href="" target="_blank"> Like us!</a>
          </div>
          <div className="fl-fl float-tw">
            <i className="fa fa-twitter fa-2x"></i>
            <a href="" target="_blank">Follow us!</a>
          </div>

          <div className="fl-fl float-ig">
            <i className="fa fa-instagram fa-2x"></i>
            <a href="" target="_blank">Follow us!</a>
          </div>
          <div className="fl-fl float-pn">
            <i className="fa fa-linkedin fa-2x"></i>
            <a href="" target="_blank">Follow us!</a>
          </div>
          <div className="fl-fl float-yt">
            <i className="fa fa-youtube fa-2x"></i>
            <a href="" target="_blank">Follow us!</a>
          </div>
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
      <FloatingWhatsApp
        phoneNumber="97143426666"
        accountName="Karama Business Center"
        avatar="assets/img/logo-small.png"
        allowEsc
        allowClickAway
        notification
        notificationSound
      />
      <CategoryList />
      <section className="section choose-us-section">
        <div id="Services" className="homesection servicessection saa viewon">
          <div className="custom-container">
            <div className="section-heading" data-aos="fade-down">
              <h2 className="section-title"> Why Karama Business Center?</h2>
            </div>
            <div className="row">
              <div className="col-lg-7">
                {/* Heading title*/}
                <div className="section-heading heading-one" data-aos="fade-down">
                  <p>
                    We Karama Business Center offers many services to small and medium businesses with the highest standards of quality and speed for any transactions of all Government departments in Dubai
                  </p>
                </div>
                {/* /Heading title */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="quality-wrap" data-aos="fade-down">
                      <span>
                        <i className="bx bxs-bookmarks" />
                      </span>
                      <h6>One Stop Transactions</h6>
                      <p>
                      The Karama Business Center in Dubai offers a comprehensive range of government services, ensuring convenience and efficiency for residents and businesses.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="quality-wrap" data-aos="fade-down">
                      <span>
                        <i className="bx bxs-bolt-circle" />
                      </span>
                      <h6>Premium Fast Track Service</h6>
                      <p>
                      The Karama Business Center in Dubai offers a Premium Fast Track Service to expedite various government-related processes, ensuring efficiency and convenience for clients.
              
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="quality-wrap" data-aos="fade-down">
                      <span>
                        <i className="bx bxs-calendar-heart" />
                      </span>
                      <h6>Dedicated Assistance</h6>
                      <p>
                      Personalized support throughout the application process.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="quality-wrap" data-aos="fade-down">
                      <span>
                        <i className="bx bxs-badge-dollar" />
                      </span>
                      <h6>Experienced Staff:</h6>
                      <p>
                      A team of knowledgeable professionals is available to assist clients, providing guidance and support throughout various processes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="quality-img">
              <ImageWithBasePath
                src="assets/img/_63A3883.jpg"
                data-aos="fade-left"
                className="img-fluid"
                alt="img"
              />
            </div>
            <div className="quality-bg">
              <ImageWithBasePath
                src="assets/img/bg/quality-bg.png"
                className="img-fluid"
                alt="img"
              />
            </div>
            <div className="quality-bg-01">
              <ImageWithBasePath
                src="assets/img/bg/quality-bg-01.png"
                className="img-fluid"
                alt="img"
              />
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

      {/* About us Testimonials */}
      {/* FAQ  */}
      <section className="section faq-section bg-light-primary">
        <div id="Services" className="homesection servicessection saa viewon">

          <div className="custom-container">
            {/* Heading title*/}
            <div className="section-heading" data-aos="fade-down">
              <h2 className="section-title">Frequently Asked Questions </h2>
            </div>          {/* Heading title*/}
            <Accordion>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    Karama Medical Fitness Center Medical Timing
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <p>
                    Monday - Thursday
                    7:00 AM -10:00 PM
                    <br></br>
                    Friday
                    7:00 AM  -  08:00 PM
                    <br></br>
                    Saturday - Sunday
                    8:00 AM - 08:00 PM
                  </p>
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    How to check visa medical report online?
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <p>
                    Dubai visa medical report can be tracked and downloaded from DHA mobile application.
                  </p>
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
            {/* /Heading title */}

          </div>

        </div>

      </section>
      {/* /FAQ */}
      {/* Pricing Plan */}

      {/* /Pricing Plan */}
      <>
        {/* Blog Section */}
        <section className="blog-section news-section pt-0">

          <div id="Services" className="homesection servicessection saa viewon">
            <div className="custom-container">
              {/* Heading title*/}
              <div className="section-heading" data-aos="fade-down">
                <h2 className="section-title">Latest News </h2>
              </div>
              {/* /Heading title */}

              <div className="row">


                <div className="col-lg-4 col-md-6 d-lg-flex">
                  <div className="blog grid-blog">
                    <div className="blog-image">
                      <ImageWithBasePath
                        className="img-fluid"
                        src="assets/img/blog/DET_Opening.jpg"

                        alt="Post Image"
                      />

                    </div>
                    <div className="blog-content">
                      <h3 className="blog-title">
                        <a href="#">
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
                        <a href="#">
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
                        <a href="#">
                          2024 - Best Employee of the Month
                        </a>
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
          </div>
        </section >
        {/* /Blog Section */}
      </>
      <Footer />
    </>
  );
};

export default observer(HomeOne);
