import React, { useEffect } from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Aos from "aos";
import Header from "../common/header";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import Footer from "../common/footer";
import { IMAGE_SERVER_PATH } from "../../environment";

const AboutUs = () => {
  const filePath = `${IMAGE_SERVER_PATH}/seed/files/kbcprofile.pdf`;
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
                  Karama Business Center, located in Dubai&#39;s Al Karama
                  district, is one of the city&#39;s largest centers dedicated
                  to providing quality government services efficiently in a
                  single location. Since its inception, the center has aimed to
                  align with Dubai&#39;s strategy of delivering prompt and
                  comprehensive services to the public.
                </p>
                <p>
                  The center offers a wide range of services, making it a
                  one-stop destination for various governmental and business
                  needs.
                </p>
                <div className="row">
                  <div className="col-md-6">
                    <ul>
                      <li>
                        Facilitating various governmental processes under one
                        roof.
                      </li>
                      <li>
                        Assisting entrepreneurs and investors in establishing
                        companies in Dubai.
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul>
                      <li>
                        Providing Public Relations Officer services to handle
                        documentation and approvals.
                      </li>
                      <li>
                        Handling medical typing requirements for various
                        purposes.
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  style={{ flex: 1, padding: "40px 20px", textAlign: "center" }}
                >
                  <Button
                    type="primary"
                    shape="round"
                    icon={<DownloadOutlined />}
                    size="large"
                    href={filePath}
                    target="_blank"
                    className="bg-[#0f8992]"
                  >
                    Company Profile
                  </Button>
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
              At Karama Business Center, our mission and vision are aligned with
              Dubai&#39;s strategic objectives to provide efficient,
              high-quality government services.{" "}
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
                    <h3>1. Mission</h3>
                    <p>
                      To be the preferred destination for customers and
                      businessmen, delighting clients in line with the vision of
                      the Government of Dubai.
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
                    <h3>2. Vision</h3>
                    <p>
                      To save customers&#39; time and effort by providing all
                      necessary smart services in one place.
                      <br></br>
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
                    <h3>3. Goals</h3>
                    <p>
                      Offer top-tier services to both public and private sectors
                      through a qualified and trained staff utilizing the latest
                      electronic and intelligent systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <>
        {/* FAQ  */}

        {/* /FAQ */}
      </>
      <Footer />
    </>
  );
};

export default AboutUs;
