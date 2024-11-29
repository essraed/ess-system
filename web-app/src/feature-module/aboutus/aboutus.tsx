import React, { useEffect } from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import CountUp from "react-countup";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Breadcrumbs from "../common/breadcrumbs";
import Aos from "aos";
import { Link } from "react-router-dom";
import Header from "../common/header";
import Footer from "../common/footer";

const AboutUs = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rabien Ustoc",
      image: "/assets/img/profiles/avatar-02.jpg",
      rating: 5.0,
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: 2,
      name: "Valerie L. Ellis",
      image: "/assets/img/profiles/avatar-03.jpg",
      rating: 5.0,
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: 3,
      name: "Laverne Marier",
      image: "/assets/img/profiles/avatar-04.jpg",
      rating: 5.0,
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: 4,
      name: "Sydney Salmons",
      image: "/assets/img/profiles/avatar-06.jpg",
      rating: 5.0,
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: 5,
      name: "Lucas Moquin",
      image: "/assets/img/profiles/avatar-07.jpg",
      rating: 5.0,
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    // Add more testimonials as needed
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  useEffect(() => {
    Aos.init({ duration: 1200, once: true });
  }, []);
  return (
    <>


<Header />

      {/* About */}
      <section className="section about-sec">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-down">
              <div className="about-img">
                <div className="about-exp">
                  <span>12+ years of experiences</span>
                </div>
                <div className="abt-img">
                  <ImageWithBasePath
                    src="assets/img/about-us.png"
                    className="img-fluid"
                    alt="About us"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-down">
              <div className="about-content">
                <h6>ABOUT OUR COMPANY</h6>
                <h2>One Stop Government Transactions </h2>
                <p>
                In line with Dubai's strategy for providing quality government services in one place and as quickly as possible, Al Karama Business Center has been one of the largest centers in Dubai to prove this idea since its inception. It provides a range of government and business services for the various business sectors using the latest intelligent systems. Because our clients’ time has an invaluable value and because the success of the individual depends on how it is invested for its time,
                 we have developed the quality and speed of service delivery to facilitate customer’s access to it.
                </p>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo.
                </p>
                <div className="row">
                  <div className="col-md-6">
                    <ul>
                      <li>At vero et accusamus iusto dignissimos</li>
                      <li>At vero et accusamus iusto dignissimos</li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul>
                      <li>Nam libero tempore, cum soluta nobis</li>
                      <li>Nam libero tempore, cum soluta nobis</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /About */}
      {/* services */}
      <section className="section services bg-light-primary">
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
              Lorem Ipsum has been the industry standard dummy text ever since
              the 1500s,
            </p>
          </div>
          {/* /Heading title */}
          <div className="services-work">
            <div className="row">
              <div className="col-lg-4 col-md-4 col-12" data-aos="fade-down">
                <div className="services-group">
                  <div className="services-icon border-secondary">
                    <ImageWithBasePath
                      className="icon-img bg-secondary"
                      src="assets/img/icons/services-icon-01.svg"
                      alt="Choose Locations"
                    />
                  </div>
                  <div className="services-content">
                    <h3>1. Choose Locations</h3>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry
                      standard dummy text ever since the 1500s,
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-12" data-aos="fade-down">
                <div className="services-group">
                  <div className="services-icon border-warning">
                    <ImageWithBasePath
                      className="icon-img bg-warning"
                      src="assets/img/icons/services-icon-01.svg"
                      alt="Choose Locations"
                    />
                  </div>
                  <div className="services-content">
                    <h3>2. Pick-Up Locations</h3>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry
                      standard dummy text ever since the 1500s,
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-12" data-aos="fade-down">
                <div className="services-group">
                  <div className="services-icon border-dark">
                    <ImageWithBasePath
                      className="icon-img bg-dark"
                      src="assets/img/icons/services-icon-01.svg"
                      alt="Choose Locations"
                    />
                  </div>
                  <div className="services-content">
                    <h3>3. Book your Car</h3>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry
                      standard dummy text ever since the 1500s,
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /services */}
<Footer/>


      <>
        {/* FAQ  */}

        {/* /FAQ */}
      </>
    </>
  );
};

export default AboutUs;
