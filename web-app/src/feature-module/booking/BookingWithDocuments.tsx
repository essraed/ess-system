import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useStore } from "../../app/stores/store";
import {
  documentBookingSchema,
  DocumentBookingSchema,
} from "../../lib/schemas/documentBookingSchema";
import { Input } from "@nextui-org/react";
import { ServiceData } from "../../types/service";
import { useNavigate } from "react-router-dom";
import { NationalityData } from "../../types/nationality";
import Select from "react-select";
import { Dropdown } from "primereact/dropdown";
import { separateCamelCase } from "../../lib/utils";

type Props = {
  service: ServiceData;
};

const DocumentBookingForm = ({ service }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DocumentBookingSchema>({
    resolver: zodResolver(documentBookingSchema),
    mode: "onTouched",
    defaultValues: {
      adultsNumber: 1, // Default value for adults
      childrenNumber: 0, // Default value for children
    },
  });

  const {
    bookingStore: { addBooking },
    nationalityStore: {
      loadNationalities,
      NationalitiesDropdown,
      getNatinality,
    },
  } = useStore();

  const [selectedNationality, setSelectedNationality] =
    useState<NationalityData | null>(null);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load nationalities when the component mounts
  useEffect(() => {
    loadNationalities();
  }, [loadNationalities]);

  // Recalculate total price whenever any of the relevant values change
  useEffect(() => {
    calculateTotalPrice();
  }, [
    watch("adultsNumber"),
    watch("childrenNumber"),
    watch("entryType"),
    watch("duration"),
    watch("processTime"),
    selectedNationality,
  ]);

  // Handle nationality change and fetch the details
  const handleNationalityChange = async (selected: string) => {
    const nationality = await getNatinality(selected);
    if (nationality) {
      setSelectedNationality(nationality);
    }
    setValue("entryType", "single");
    setValue("duration", "30 days");
    setValue("processTime", "Regular - 3-5 working days");
  };

  // Calculate total price based on the selected values
  const calculateTotalPrice = () => {
    if (selectedNationality) {
      const adults = watch("adultsNumber");
      const children = watch("childrenNumber");
      const entryType = watch("entryType");
      const duration = watch("duration");
      const processTime = watch("processTime");
      let nationalityPrice = 0;

      // Safely calculate nationality price

      if (entryType === "single" && duration === "30 days") {
        nationalityPrice =
          Number(selectedNationality.singlePriceWithMonth) || 0;
      } else if (entryType === "single" && duration === "60 days") {
        nationalityPrice =
          Number(selectedNationality.singlePriceWithTwoMonth) || 0;
      } else if (entryType === "multiple" && duration === "30 days") {
        nationalityPrice =
          Number(selectedNationality.multiplePriceWithMonth) || 0;
      } else if (entryType === "multiple" && duration === "60 days") {
        nationalityPrice =
          Number(selectedNationality.multiplePriceWithTwoMonth) || 0;
      }

      // Calculate prices for adults, children, and process time
      const adultsPrice = Number(adults) * (Number(service?.price) || 0);
      const childrenPrice =
        Number(children) * (Number(service?.childPrice) || 0);
      const processTimePrice =
        processTime === "Express - 1~2 working days"
          ? Number(service?.expressPrice) || 0
          : Number(service?.regularPrice) || 0;

      const total =
        nationalityPrice + adultsPrice + childrenPrice + processTimePrice;
      setTotalPrice(total);
      setValue("totalPrice", total);
    } // Update the total price in the form
  };

  const onSubmit = async (data: DocumentBookingSchema) => {
    data.totalPrice = totalPrice;
    data.serviceId = service.id;
    data.nationalityId = selectedNationality?.id;


    // Submit booking logic here
    const result = await addBooking(data);
    if (result.status === "success") {
      toast.success(t("Booking added successfully"));
      navigate(`/listings/booking/upload/${result.data}`);
    } else {
      toast.error(`${t("Error")}: ${result.error}`);
    }
  };

  return (
    <section className="section product-details custom-container">
      <div className="flex justify-center ">
        <div className="w-full  bg-white p-8 border border-y-slate-950">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Input
                  label={t("Customer Name")}
                  {...register("customerName")}
                  isInvalid={!!errors.customerName}
                  errorMessage={errors.customerName?.message}
                  size="sm"
                  className="text-medium md:text-lg"
                />
              </div>

              <div>
                <Input
                  label={t("Phone")}
                  {...register("phone")}
                  isInvalid={!!errors.phone}
                  errorMessage={errors.phone?.message}
                  size="sm"
                  className="text-medium md:text-lg"
                />
              </div>

              <div>
                <Input
                  label={t("Email")}
                  {...register("email")}
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                  size="sm"
                  className="text-medium md:text-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm md:text-lg font-semibold mb-2">
                  {t("Choose Nationality")}
                </label>
                <Select
                  className="w-full "
                  options={NationalitiesDropdown?.map((Nationality) => ({
                    label: Nationality.name,
                    value: Nationality.id,
                  }))}
                  onChange={(e) => handleNationalityChange(e!.value)}
                  placeholder={t("Choose Nationality")}
                />
              </div>

              <div>
                <label className="block text-sm md:text-lg font-semibold mb-2">
                  {t("Entry Type")}
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setValue("entryType", "single")}
                    className={`w-full py-1 px-2  text-center ${
                      watch("entryType") === "single"
                        ? "entry text-sm md:text-lg"
                        : "bg-gray-100 text-sm md:text-lg"
                    }`}
                  >
                    {t("Single")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setValue("entryType", "multiple")}
                    className={`w-full py-1 px-2  text-center ${
                      watch("entryType") === "multiple"
                        ? "entry text-sm md:text-lg"
                        : "bg-gray-100 text-sm md:text-lg"
                    }`}
                  >
                    {t("Multiple")}
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm md:text-lg font-semibold mb-2">
                  {t("Duration")}
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setValue("duration", "30 days")}
                    className={`w-full py-1 px-2 text-center ${
                      watch("duration") === "30 days"
                        ? "entry text-sm md:text-lg"
                        : "bg-gray-100 text-sm md:text-lg"
                    }`}
                  >
                    {t("30 days")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setValue("duration", "60 days")}
                    className={`w-full py-1 px-2 text-center ${
                      watch("duration") === "60 days"
                        ? "entry text-sm md:text-lg"
                        : "bg-gray-100 text-sm md:text-lg"
                    }`}
                  >
                    {t("60 days")}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm md:text-lg font-semibold mb-2">
                  {t("Process Time")}
                </label>
                <Controller
                  name="processTime"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      {...field}
                      options={[
                        {
                          label: "Express - 1~2 working days",
                          value: "Express - 1~2 working days",
                        },
                        {
                          label: "Regular - 3-5 working days",
                          value: "Regular - 3-5 working days",
                        },
                      ]}
                      onChange={(e) => {
                        field.onChange(e.value);
                        calculateTotalPrice();
                      }}
                      placeholder={t("Select Process Time")}
                      className="w-full bg-gray-100 border-2 border-gray-300 h-9 focus:outline-none focus:ring-2 focus:ring-blue-500 custom-dropdown"
                     
                    />
                  )}
                />
              </div>
            </div>
                  
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm md:text-lg font-semibold mb-2">
                  {t("Number of Adults")}
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const value = watch("adultsNumber");
                      if (value > 1) setValue("adultsNumber", value - 1);
                    }}
                    className="bg-gray-200 p-0.5 px-2"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    {...register("adultsNumber")}
                    className="w-16 h-8 text-center p-2 border-2 border-gray-300 rounded-md"
                    min={1}
                    max={9}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const value = watch("adultsNumber");
                      setValue("adultsNumber", value + 1);
                    }}
                    className="entry  py-0.5 px-2"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm md:text-lg font-semibold mb-2">
                  {t("Number of Children")}
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const value = watch("childrenNumber");
                      if (value > 0) setValue("childrenNumber", value - 1);
                    }}
                    className="bg-gray-200 p-0.5 px-2"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    {...register("childrenNumber")}
                    className="w-16 h-8 text-center p-2 border-2 border-gray-300 rounded-md"
                    min={0}
                    max={9}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const value = watch("childrenNumber");
                      setValue("childrenNumber", value + 1);
                    }}
                    className="entry p-0.5 px-2"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-medium md:text-xl font-semibold mb-4 text-gray-800">
                {t("Required Documents")}
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                {service.requiredFiles?.map((file, index) => (
                  <li
                    key={index}
                    className="text-sm md:text-xl text-gray-700 flex items-center space-x-2"
                  >
                    <span className="flex-shrink-0 text-blue-600">✔</span>
                    <span>{separateCamelCase(file)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-medium md:text-lg font-semibold">
                <span>{t("Total Price")}: </span>
                <span className="text-medium">{totalPrice} AED</span>
              </div>
              <button type="submit" className="entry px-3 md:px-6 py-1">
                {t("Book Now")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DocumentBookingForm;
