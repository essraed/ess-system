import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "../../app/stores/store";
import toast from "react-hot-toast";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { eventSchema, EventSchema } from "../../lib/schemas/EventSchema";
import { EventDepartments } from "../../constants/constants";
import Header from "../common/header";
import Footer from "../common/footer";

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
    console.log("data",data);
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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white border border-gray-300 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center text-black mb-6">
            Confirm Your Participation
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Employee Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
                  errors.employeename ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your name"
                {...register("employeename")}
              />
              {errors.employeename && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.employeename.message}
                </p>
              )}
            </div>

            {/* Employee Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
                  errors.employeecode ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your employee code"
                {...register("employeecode")}
              />
              {errors.employeecode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.employeecode.message}
                </p>
              )}
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department <span className="text-red-500">*</span>
              </label>
              <Select
                options={EventDepartments}
                onChange={(selectedOption) => {
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
                className={`mt-1 block w-full py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
                  errors.department ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.department && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.department.message}
                </p>
              )}
            </div>

            {/* Confirm Radio Buttons */}
            <div className="space-y-4">
              <label className="block text-sm font-medium">Confirm</label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="Yes"
                    value="true"
                    {...register("isComing")}
                    className="form-check-input"
                  />
                  <label className="form-check-label ml-2" htmlFor="Yes">
                    Yes
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="No"
                    value="false"
                    {...register("isComing")}
                    className="form-check-input"
                  />
                  <label className="form-check-label ml-2" htmlFor="No">
                    No
                  </label>
                </div>
              </div>
              {errors.isComing && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.isComing.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-cyan-900 text-white py-2 px-4 rounded-md hover:bg-cyan-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Event;
