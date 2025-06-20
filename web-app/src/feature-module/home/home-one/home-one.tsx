import React, { useEffect, useRef } from "react";

import CountUp from "react-countup";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";

import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import Footer from "../../common/footer";
import { observer } from "mobx-react-lite";
import "../../../../node_modules/font-awesome/css/font-awesome.min.css";
import Header from "../../common/header";
import CategoryList from "../../Categories/CategoryList";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import "react-accessible-accordion/dist/fancy-example.css";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { useTranslation } from "react-i18next";

const HomeOne = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { t } = useTranslation();
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      // Check if the device is mobile (width less than or equal to 768px)
      const isMobile = window.innerWidth <= 768;

      if (isMobile) {
        videoRef.current.removeAttribute("autoplay"); // Remove autoplay on mobile
      } else {
        videoRef.current.setAttribute("autoplay", "true"); // Add autoplay on larger screens
      }
    }
  }, []);
  return (
    <>
      <Header />
      <div>
        <div className="float-sm">
          <div className="fl-fl float-fb">
            <i className="fa fa-facebook fa-2x"></i>
            <a href="https://www.facebook.com/profile.php?id=61575707855912" target="">
              {" "}
              Like us!
            </a>
          </div>
          <div className="fl-fl float-tw">
            <i className="fa fa-twitter fa-2x"></i>
            <a href="https://x.com/karamacenter_ae" target="">
              Follow us!
            </a>
          </div>

          <div className="fl-fl float-ig">
            <i className="fa fa-instagram fa-2x"></i>
            <a href="https://www.instagram.com/karamacenter.ae/" target="">
              Follow us!
            </a>
          </div>
          <div className="fl-fl float-pn">
            <i className="fa fa-linkedin fa-2x"></i>
            <a href="https://www.linkedin.com/company/karamacenter-ae/" >
              Follow us!
            </a>
          </div>
        </div>
      </div>
      <section className="banner-section banner-slider ">
        <div className="container-fluid">
          <div className="home-banner">
            <div className="row align-items-center">
              {/* Video on the Right Side */}
              <div className="col-md-5 offset-md-7">
                <div className="video-wrapper hidden md:block">
                  <video
                    ref={videoRef}
                    className="h-full lg:h-[350px] max-h-[500px] w-full lg:w-full p-2 lg:p-0"
                    style={{ opacity: 0.8 }}
                    controls
                    muted
                    loop
                  >
                    <source
                      src="/assets/videos/THEJOURNEYOFALKARAMAMEDICALFITNESSCENTER.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
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
      <section className="section-top ">
        <div className="characteristics hidden md:block">
          <div className="custom-container">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-6 char_col">
                <div className="char_item d-flex flex-row align-items-center justify-content-start">
                  <div className="char_icon">
                    <img src="assets/img/icons-05.png" alt="" />
                  </div>
                  <div className="char_content">
                    <div className="char_title">Booking</div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-6 char_col">
                <div className="char_item d-flex flex-row align-items-center justify-content-start">
                  <div className="char_icon">
                    <img src="assets/img/icons-07.png" alt="" />
                  </div>
                  <div className="char_content">
                    <div className="char_title">Documents Delivery</div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-6 char_col">
                <div className="char_item d-flex flex-row align-items-center justify-content-start">
                  <div className="char_icon">
                    <img src="assets/img/icons-06.png" alt="" />
                  </div>
                  <div className="char_content">
                    <div className="char_title">Pick & Drop</div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-6 char_col">
                <div className="char_item d-flex flex-row align-items-center justify-content-start">
                  <div className="char_icon">
                    <img src="assets/img/icons-08.png" alt="" />
                  </div>
                  <div className="char_content">
                    <div className="char_title">Fast Track</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CategoryList />
      <section className="section choose-us-section">
        <div id="Services" className="homesection servicessection saa viewon">
          <div className="custom-container custom-container-inner">
            <div className="section-heading" data-aos="fade-down">
              <h2 className="section-title">
                {" "}
                {t("Why Karama Business Center?")}
              </h2>
            </div>
            <div className="row">
              <div className="col-lg-12">
                {/* Heading title*/}
                <div
                  className="section-heading heading-one"
                  data-aos="fade-down"
                >
                  <p>
                    {t(
                      "We Karama Business Center offers many services to small and medium businesses with the highest standards of quality and speed for any transactions of all Government departments in Dubai"
                    )}
                  </p>
                </div>
                {/* /Heading title */}
                <div className="row">
                  <div className="col-md-4">
                    <div className="quality-wrap" data-aos="fade-down">
                      <span>
                        <i className="bx bxs-bookmarks" />
                      </span>
                      <h6>{t("One Stop Transactions")}</h6>
                      <p>
                        {t(
                          "The Karama Business Center in Dubai offers a comprehensive range of government services, ensuring convenience and efficiency for residents and businesses."
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="quality-wrap" data-aos="fade-down">
                      <span>
                        <i className="bx bxs-bolt-circle" />
                      </span>
                      <h6>{t("Premium Fast Track Service")}</h6>
                      <p>
                        {t(
                          "The Karama Business Center in Dubai offers a Premium Fast Track Service to expedite various government-related processes, ensuring efficiency and convenience for clients."
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="quality-wrap" data-aos="fade-down">
                      <span>
                        <i className="bx bxs-calendar-heart" />
                      </span>
                      <h6>{t("Dedicated Assistance")}</h6>
                      <p>
                        {t(
                          "Personalized support throughout the application process."
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="quality-wrap" data-aos="fade-down">
                      <span>
                        <i className="bx bxs-badge-dollar" />
                      </span>
                      <h6>{t("Experienced Staff:")}</h6>
                      <p>
                        {t(
                          "A team of knowledgeable professionals is available to assist clients, providing guidance and support throughout various processes"
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="quality-wrap" data-aos="fade-down">
                      <span>
                        <i className="bx bxs-badge-dollar" />
                      </span>
                      <h6>{t("Experienced Staff:")}</h6>
                      <p>
                        {t(
                          "A team of knowledgeable professionals is available to assist clients, providing guidance and support throughout various processes"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="quality-img">
              <ImageWithBasePath
                lazyLoad={true}
                src="assets/img/karamabuilding.png"
                data-aos="fade-left"
                className="img-fluid"
                alt="img"
              />
            </div>
           <div className="quality-bg">
              <ImageWithBasePath
                lazyLoad={true}
                src="assets/img/bg/quality-bg.png"
                className="img-fluid"
                alt="img"
              />
            </div>
            <div className="quality-bg-01">
              <ImageWithBasePath
                lazyLoad={true}
                src="assets/img/bg/quality-bg-01.png"
                className="img-fluid"
                alt="img"
              />
            </div> */}
          </div>
        </div>
      </section>

      <section className="section facts-number hidden md:block">
        <div id="Services" className="homesection servicessection saa viewon">
          <div className="custom-container">
            {/* Heading title*/}
            <div className="section-heading" data-aos="fade-down">
              <h2 className="section-title">{t("Facts By The Numbers")}</h2>
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
                          lazyLoad={true}
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
                        <p> {t("Happy Customers")} </p>
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
                          lazyLoad={true}
                          src="assets/img/icons/bx-car.svg"
                          alt=""
                        />
                      </div>
                      <div className="count-content">
                        <h4>
                          <CountUp
                            className="counterUp"
                            end={2000}
                            duration={3}
                            separator=","
                          />
                          +<br />
                        </h4>
                        <p>{t("Count of Centers")}</p>
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
                          lazyLoad={true}
                          src="assets/img/icons/bx-headphone.svg"
                          alt=""
                        />
                      </div>
                      <div className="count-content">
                        <h4>
                          <CountUp
                            className="counterUp"
                            end={625000}
                            duration={3}
                            separator=","
                          />
                          K+
                          <br />
                        </h4>
                        <p>{t("Strategic Partners")}</p>
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
                          lazyLoad={true}
                          src="assets/img/icons/bx-history.svg"
                          alt=""
                        />
                      </div>
                      <div className="count-content">
                        <h4>
                          <CountUp
                            className="counterUp"
                            end={200000}
                            duration={3}
                            separator=","
                          />
                          K+
                          <br />
                        </h4>
                        <p>{t("Trusting Companies")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-GoldenVisa hidden md:block">
        <div className="wantToWork-area wantToWork-area2 w-padding2">
          <div className="custom-container">
            <div className="row align-items-center justify-content-between">
              <div className="col-xl-8 col-lg-8 col-md-8">
                <div className="wantToWork-caption wantToWork-caption2">
                  <h2>For Golden Visa</h2>
                  <p className="btn btn-primary">Contact Now</p>
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
              <h2 className="section-title">
                {t("Frequently Asked Questions")}{" "}
              </h2>
            </div>{" "}
            {/* Heading title*/}
            <Accordion
              style={{ backgroundColor: "transparent", border: "none" }}
            >
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton
                    style={{ backgroundColor: "transparent", border: "none" }}
                  >
                    {t("Karama Medical Fitness Center Medical Timing")}
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <p>
                    <h4>DHA Medical Fitness Center For Residents Visa New/Renewal </h4>
                    {t("Monday - Saturday 07:00 AM - 10:00 PM")}
                    <br></br>
                    <br></br>
            
                    {t("Sunday 08:00 AM - 08:00 PM")}
                    <br></br>
                    <br></br>
                    {t("Note : Saturday and Sunday after 01:00 PM only Visa Renewal is accepted(Xray service not available after 01:00 PM)")}
                  </p>
                  <p>
                    <h4>OHC </h4>
                    {t("Monday - Thursday 07:30 AM - 08:00 PM")}
                    <br></br>
                    <br></br>
                    {t("Friday - 07:30 AM - 11:00 AM")}
                    <br></br>
                    {t("Friday - 04:30 PM - 08:00 PM")}
                    <br></br>
                    <br></br>
                    {t("Saturday & Sunday - Closed")}
                    <br></br>
                    <br></br>
                    </p>
                    <p>
                    <h4>DED </h4>
                    {t("Monday - Saturday 08:00 AM - 08:00 PM")}
                    <br></br>
                    <br></br>
                    {t("Sunday - Closed")}
                    <br></br>
                    <br></br>
                    </p>
                    <p>
                    <h4>Amer </h4>
                    {t("Monday - Saturday 07:00 AM - 10:00 PM")}
                    <br></br>
                    <br></br>
                    {t("Sunday - Closed")}
                    <br></br>
                    <br></br>
                    </p>
                    <p>
                    <h4>Tas-Heel </h4>
                    {t("Monday - Saturday 08:00 AM - 08:00 PM")}
                    <br></br>
                    <br></br>
                    {t("Sunday - Closed")}
                    <br></br>
                    <br></br>
                    </p>
                    <p>
                    <h4>Taw-Jeeh </h4>
                    {t("Monday - Saturday 08:00 AM - 08:00 PM")}
                    <br></br>
                    <br></br>
                    {t("Sunday - 09:00 AM - 05:00 PM")}
                    <br></br>
                    <br></br>
                    </p>
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton
                    style={{ backgroundColor: "transparent", border: "none" }}
                  >
                    {t("How to check visa medical report online?")}
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <p>
                    {t(
                      "Dubai visa medical report can be tracked and downloaded from DHA mobile application."
                    )}
                  </p>
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton
                    style={{ backgroundColor: "transparent", border: "none" }}
                  >
                    {t(
                      "What are the different types of Tourist or visit visas available?"
                    )}
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <p>
                    {t(
                      "A tourist visa is available for 30 and 60 days and a sponsored family visit visa for 30 and 90 days."
                    )}
                  </p>
                </AccordionItemPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton
                    style={{ backgroundColor: "transparent", border: "none" }}
                  >
                    {t(
                      "Can I travel without applying for the visa stamping application?"
                    )}
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <p>
                    {t(
                      "No, the applicant must complete the visa stamping application for he/she to travel."
                    )}
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
        <section className="blog-section news-section pt-5 hidden md:block">
          <div id="Services" className="homesection servicessection saa viewon">
            <div className="custom-container">
              {/* Heading title*/}
              <div className="section-heading" data-aos="fade-down">
                <h2 className="section-title">{t("Latest News")} </h2>
              </div>
              {/* /Heading title */}

              <div className="row">
                <div className="col-lg-4 col-md-6 d-lg-flex">
                  <div className="blog grid-blog">
                    <div className="blog-image">
                      <ImageWithBasePath
                        lazyLoad={true}
                        className="img-fluid"
                        src="assets/img/blog/DET_Opening.jpg"
                        alt="Post Image"
                      />
                    </div>
                    <div className="blog-content">
                      <h3 className="blog-title">
                        <a href="#">{t("2024 - DED Opening")}</a>
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 d-lg-flex">
                  <div className="blog grid-blog">
                    <div className="blog-image">
                      <ImageWithBasePath
                        lazyLoad={true}
                        className="img-fluid"
                        src="assets/img/blog/2023_NationalDay.jpg"
                        alt="Post Image"
                      />
                    </div>
                    <div className="blog-content">
                      <h3 className="blog-title">
                        <a href="#">{t("2023 - National Day Celeberation")}</a>
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 d-lg-flex">
                  <div className="blog grid-blog">
                    <div className="blog-image">
                      <ImageWithBasePath
                        lazyLoad={true}
                        className="img-fluid"
                        src="assets/img/blog/BestEmployee_2024.jpg"
                        alt="Post Image"
                      />
                      
                    </div>
                    <div className="blog-content">
                      <h3 className="blog-title">
                        <a href="#">{t("2024 - Best Employee of the Month")}</a>
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
                  {t("View all News")}{" "}
                  <span>
                    <i className="feather icon-arrow-right ms-2" />
                  </span>
                </a>
              </div>
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