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
import { eventSchema, EventSchema } from "../../lib/schemas/EventSchema";
import Select from "react-select";
import { EventDepartments } from "../../constants/constants";

const Event = () => {
  useTranslation();
  const {
    eventStore: { addEvent },
  } = useStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<EventSchema>({
    resolver: zodResolver(eventSchema),
  });

  const onSubmit = async (data: EventSchema) => {
    try {
      const result = await addEvent(data);
      if (result.status === "success") {
        toast.success("Event Confirmation Submitted Successfully");
      }
    } catch (error) {
      console.error("Error details:", error);
    }
    reset();
  };

  return (
    <div className="main-wrapper">
      <Header />
      <section className="contact-section">
        <div className="container">
          <div
            className="form-info-area"
            data-aos="fade-down"
            data-aos-duration={1200}
            data-aos-delay="0.5"
          >
            <div className="row">
              <div className="col-lg-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <h1>Confirm Your Participation</h1>
                    <div className="col-md-12">
                      <div className="input-block">
                        <label>
                          Employee Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          {...register("employeename")}
                        />
                        {errors.employeename && (
                          <p className="text-danger">{errors.employeename.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-block">
                        <label>
                          Employee Code <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          {...register("employeecode")}
                        />
                        {errors.employeecode && (
                          <p className="text-danger">{errors.employeecode.message}</p>
                        )}
                      </div>
                    </div>
                    {/* Department */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Department <span className="text-red-500">*</span>
                      </label>
                      <Select
                        options={EventDepartments}
                        onChange={(selectedOption) => {
                          // Type assertion to ensure the value is one of the valid options
                          setValue(
                            "department",
                            selectedOption?.value as
                            | "AMER RECEPTION"
                            | "AMER TYPING"
                            | "TASHEEL"
                            | "DED"
                            | "DUBAI COURT"
                            | "IT"
                            | "MARKETING"
                            | "HR"
                            | "DHA"
                            | "ACCOUNTS"
                            | "CASHIER"
                            | "TYPING"
                            | "MAINTAINACE"
                            | "CLEANING"
                            | "CUSTOMER SERVICES"
                            | "OTHER"
                          );
                        }}
                        placeholder="Select Department"
                        className={`mt-1 block w-full py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${errors.department ? "border-red-500" : "border-gray-300"
                          }`}
                      />
                      {errors.department && (
                        <p className="text-red-500 text-sm mt-1">{errors.department.message}</p>
                      )}
                    </div>
                    <div className="flex flex-wrap justify-between space-x-4">
                      {/* License Type */}
                      <div className="flex-1 min-w-[200px]">
                        <div className="input-block">
                          <label>
                            Confirm <span className="text-danger">*</span>
                          </label>
                          <div className="radio-buttons mt-1">
                            <div className="form-check">
                              <input
                                type="radio"
                                id="Yes"
                                value="true"
                                {...register("isComing")}
                                className="form-check-input"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="Yes"
                              >
                                Yes
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                type="radio"
                                id="No"
                                value="false"
                                {...register("isComing")}
                                className="form-check-input"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="No"
                              >
                                No
                              </label>
                            </div>

                          </div>
                          {errors.isComing && (
                            <p className="text-danger mt-2">
                              {errors.isComing.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn contact-btn">
                    Submit
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

export default Event;
