import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { lostSchema, LostSchema } from "../../lib/schemas/lostSchema";
import { useStore } from "../../app/stores/store";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Header from "../common/header";
import Breadcrumbs from "../common/breadcrumbs";
import Footer from "../common/footer";
import Select from "react-select";
import { lostDepartments } from "../../constants/constants";

const LostForm = () => {
  useTranslation();

  const {
    lostStore: { addLostItem },
  } = useStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue, // Destructure setValue from useForm
  } = useForm<LostSchema>({
    resolver: zodResolver(lostSchema),
  });

  const onSubmit = async (data: LostSchema) => {
    const result = await addLostItem(data);
    if (result.status === "success") {
      toast.success(
        "Lost item reported successfully. Our team will reach out to you shortly to assist with the next steps."
      );
      reset();
    } else {
      toast.error("Error: " + result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <Breadcrumbs title="Losts" subtitle="Pages" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white border border-gray-300 p-6">
          <h2 className="text-2xl font-bold text-center mb-4">
            Report Lost Item
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Lost Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Lost Department <span className="text-red-500">*</span>
              </label>
              <Select
                options={lostDepartments}
                onChange={(selectedOption) => {
                  // Type assertion to ensure the value is one of the valid options
                  setValue(
                    "lostDepartment",
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
                  errors.lostDepartment ? "border-red-500" : "border-gray-300"
                }`}
              />

              {errors.lostDepartment && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lostDepartment.message}
                </p>
              )}
            </div>

            {/* Comments */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Comments <span className="text-red-500">*</span>
              </label>
              <textarea
                className={`mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
                  errors.comments ? "border-red-500" : "border-gray-300"
                }`}
                rows={4}
                {...register("comments")}
              ></textarea>
              {errors.comments && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.comments.message}
                </p>
              )}
            </div>

            {/* Lost Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Lost Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className={`mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
                  errors.lostDate ? "border-red-500" : "border-gray-300"
                }`}
                {...register("lostDate")}
              />
              {errors.lostDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lostDate.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-cyan-900 text-white py-2 px-4 rounded-md hover:bg-slate-500 transition"
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

export default LostForm;
