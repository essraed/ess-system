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
import { contactSchema, ContactSchema } from "../../lib/schemas/contactSchema";
import { useStore } from "../../app/stores/store";
import toast from "react-hot-toast";
import InputMask from "react-input-mask";
import { useTranslation } from "react-i18next";
import Footer from "../common/footer";

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
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactSchema) => {
    data.isBussinesSetup = true;
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
      <Breadcrumbs title="Business Setup" subtitle="Pages" />
      <section className="businesssetup-section">
        <div className="custom-container">
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
                  src="assets/img/businesssetuo-inner.png"
                  className="img-fluid"
                  alt="Contact"
                />
              </div>
              <div className="col-lg-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <h1>For Enquiry!</h1>
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
                          Subject<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          {...register("subject")}
                        />
                        {errors.subject && (
                          <p className="text-danger">
                            {errors.subject.message}
                          </p>
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
