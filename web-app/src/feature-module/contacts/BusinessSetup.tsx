import React, { useEffect } from "react";
import Breadcrumbs from "../common/breadcrumbs";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Link } from "react-router-dom";
import Header from "../common/header";
import { ContactUs } from "../../core/data/interface/interface";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "../../app/stores/store";
import toast from "react-hot-toast";
import InputMask from "react-input-mask";
import { useTranslation } from "react-i18next";
import Footer from "../common/footer";
import {
  businessSchema,
  BusinessSchema,
} from "../../lib/schemas/businessSchema";

const BusinessSetup = () => {
  const { t } = useTranslation();

  const {
    contactStore: { addContact },
  } = useStore();
  const data = useSelector((state: ContactUs) => state.contactdata);

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<BusinessSchema>({
    resolver: zodResolver(businessSchema),
  });

  const onSubmit = async (data: BusinessSchema) => {
    data.EnquiryType = true;
    const result = await addContact(data);
    if (result.status === "success") {
      toast.success("BusinessSetup updated successfully");
    } else {
      toast.error("Error: " + result.error);
    }
    reset();
  };

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
                  <a href={info.link} className="flex-fill box-border">
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
                  </a>
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
                  lazyLoad={true}
                  src="assets/img/contact-inner.png"
                  className="img-fluid"
                  alt="Contact"
                />
              </div>
              <div className="col-lg-6">
                <form onSubmit={handleSubmit(onSubmit)}>
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
                          {...register("name")}
                        />
                        {errors.name && (
                          <p className="text-danger">{errors.name.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-block">
                        <label>
                          Email Address <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder=""
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="text-danger">{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-block">
                        <label>
                          Phone Number <span className="text-danger">*</span>
                        </label>
                        <InputMask
                          mask="+999 99 999 9999"
                          maskChar="_"
                          value={watch("phone")}
                          onChange={(e: any) =>
                            setValue("phone", e.target.value)
                          }
                        >
                          {() => <input type="text" className="form-control" />}
                        </InputMask>
                        {errors.phone && (
                          <p className="text-danger">{errors.phone.message}</p>
                        )}
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
                          {...register("message")}
                        />
                        {errors.message && (
                          <p className="text-danger">
                            {errors.message.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-between space-x-4">
                      {/* License Type */}
                      <div className="flex-1 min-w-[200px]">
                        <div className="input-block">
                          <label>
                            License Type <span className="text-danger">*</span>
                          </label>
                          <div className="radio-buttons mt-1">
                            <div className="form-check">
                              <input
                                type="radio"
                                id="Professional"
                                value="Professional"
                                {...register("licenseType")}
                                className="form-check-input"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="Professional"
                              >
                                Professional
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                type="radio"
                                id="Commerical"
                                value="Commerical"
                                {...register("licenseType")}
                                className="form-check-input"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="Commerical"
                              >
                                Commerical
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                type="radio"
                                id="Industrial"
                                value="Industrial"
                                {...register("licenseType")}
                                className="form-check-input"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="Industrial"
                              >
                                Industrial
                              </label>
                            </div>
                          </div>
                          {errors.licenseType && (
                            <p className="text-danger mt-2">
                              {errors.licenseType.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Ejari Checkbox */}
                      <div className="flex-1 min-w-[200px]">
                        <div className="input-block">
                          <label>With Ejari</label>
                          <div className="form-check mt-1">
                            <input
                              type="checkbox"
                              {...register("ejari")}
                              className="form-check-input"
                            />
                            <label className="form-check-label">Yes</label>
                          </div>
                        </div>
                      </div>

                      {/* Local Agent Checkbox */}
                      <div className="flex-1 min-w-[200px]">
                        <div className="input-block">
                          <label>With Local Agent</label>
                          <div className="form-check mt-1">
                            <input
                              type="checkbox"
                              {...register("localAgent")}
                              className="form-check-input"
                            />
                            <label className="form-check-label">Yes</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn contact-btn">
                    Send Enquiry
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BusinessSetup;
