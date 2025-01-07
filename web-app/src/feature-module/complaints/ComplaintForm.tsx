import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "../../app/stores/store";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Header from "../common/header";
import Breadcrumbs from "../common/breadcrumbs";
import Footer from "../common/footer";
import Select from "react-select";
import { lostDepartments } from "../../constants/constants";
import { complaintSchema, ComplaintSchema } from "../../lib/schemas/complaintSchema";

const ComplaintForm = () => {
  useTranslation();
  const [isComplaint, setIsComplaint] = useState(true);

  const {
    complaintStore: { addComplaintItem },
  } = useStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<ComplaintSchema>({
    resolver: zodResolver(complaintSchema),
  });

  const onSubmit = async (data: ComplaintSchema) => {
    console.log("data", data);
    const result = await addComplaintItem(data);
    if (result.status === "success") {
      toast.success(
        `${isComplaint ? "Complaint" : "Suggestion"} submitted successfully. Our team will reach out to you shortly.`
      );
      reset();
    } else {
      toast.error("Error: " + result.error);
    }
  };

  useEffect(()=>{
    setValue("isComplaint",isComplaint);
  },[isComplaint])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <Breadcrumbs title={isComplaint ? "Complaints" : "Suggestions"} subtitle="Pages" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white border border-gray-300 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-6">
            {isComplaint ? "File a Complaint" : "Make a Suggestion"}
          </h2>
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setIsComplaint(true)}
              className={`py-2 px-4 rounded-l-lg ${
                isComplaint ? "bg-cyan-900 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              Complaint
            </button>
            <button
              onClick={() => setIsComplaint(false)}
              className={`py-2 px-4 rounded-r-lg ${
                !isComplaint ? "bg-cyan-900 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              Suggestion
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className={`mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department <span className="text-red-500">*</span>
              </label>
              <Select
                options={lostDepartments}
                onChange={(selectedOption) => {
                  // Type assertion to ensure the value is one of the valid options
                  setValue(
                    "department",
                    selectedOption?.value as
                      | "Medical DHA - AREA 6"
                      | "Medical DHA - AREA 7"
                      | "Medical DHA - AREA 6 XRAY"
                      | "Medical DHA - AREA 7 XRAY"
                      | "Medical OHC - AREA 4"
                      | "AMER - ZONE A"
                      | "TAWJEEH - ZONE B"
                      | "TYPING - ZONE C"
                      | "MAIN RECEPTION"
                      | "OTHER AREA"
                  );
                }}
                placeholder="Select Department"
                className={`mt-1 block w-full py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
                  errors.department ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.department && (
                <p className="text-red-500 text-sm mt-1">{errors.department.message}</p>
              )}
            </div>

            {/* Comments */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {isComplaint ? "Complaint Details" : "Suggestion Details"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                className={`mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
                  errors.comments ? "border-red-500" : "border-gray-300"
                }`}
                rows={4}
                {...register("comments")}
              ></textarea>
              {errors.comments && (
                <p className="text-red-500 text-sm mt-1">{errors.comments.message}</p>
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

export default ComplaintForm;
