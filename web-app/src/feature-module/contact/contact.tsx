import React, { useEffect } from "react";
import Breadcrumbs from "../common/breadcrumbs";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";

import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Link } from "react-router-dom";
import Header from "../common/header";
import { ContactUs } from "../../core/data/interface/interface";

const Contact = () => {
  const data = useSelector((state: ContactUs) => state.contactdata);

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <div className="main-wrapper">
      <Header />
      <Breadcrumbs title="Contact us" subtitle="Pages" />
      <section className="contact-section">
        <div className="container">
          <div className="contact-info-area">
            <div className="row">
              {data.map((info: ContactUs, index: number) => (
                <div
                  key={index}
                  className="col-lg-3 col-md-6 col-12 d-flex"
                  data-aos="fade-down"
                  data-aos-duration={1200}
                  data-aos-delay="0.1"
                >
                  <div className="single-contact-info flex-fill">
                    <span>
                      <i className={info.icon} />
                    </span>
                    <h3>{info.title}</h3>
                    {info.type === "phone" ? (
                      <Link to={info.link}>{info.text}</Link>
                    ) : (
                      <p>
                        <Link to={info.link}>{info.text}</Link>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="form-info-area"
            data-aos="fade-down"
            data-aos-duration={1200}
            data-aos-delay="0.5"
          >
            <div className="row">
              <div className="col-lg-6 d-flex">
                <ImageWithBasePath
                  src="assets/img/contact-info.jpg"
                  className="img-fluid"
                  alt="Contact"
                />
              </div>
              <div className="col-lg-6">
                <form action="#">
                  <div className="row">
                    <h1>Get in touch!</h1>
                    <div className="col-md-12">
                      <div className="input-block">
                        <label>
                          Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-block">
                        <label>
                          Email Address <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-block">
                        <label>
                          Phone number <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-block">
                        <label>
                          Comments <span className="text-danger">*</span>
                        </label>
                        <textarea
                          className="form-control"
                          rows={4}
                          cols={50}
                          placeholder=""
                          defaultValue={"\t\t\t\t\t\t\t\t\t\t\t"}
                        />
                      </div>
                    </div>
                  </div>
                  <button className="btn contact-btn">Send Enquiry</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
