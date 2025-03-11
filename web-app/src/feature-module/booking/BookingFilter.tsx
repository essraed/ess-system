import "rc-slider/assets/index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

import React, { useCallback, useEffect, useState } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Divider,
  Input,
} from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { useStore } from "../../app/stores/store";
import { PagingParams } from "../../types/pagination";

type Props = {
  pageSize?: number;
};

const BookingFilter = ({ pageSize }: Props) => {
  const {
    bookingStore: {
      setDateFilter,
      setStatusFilter,
      setServiceFilter,
      loadBookings,
      setPagingParams,
      fromDate: startDate,
      toDate: endDate,
      bookingStatus,
      serviceId,
    },
    serviceStore: { servicesDropdown, loadServicesDropdown },
  } = useStore();

  const [fromDate, setFromDate] = useState<string | null>(null);
  const [toDate, setToDate] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleFilter = useCallback(() => {
    setDateFilter(fromDate, toDate);
    setPagingParams(new PagingParams(1, pageSize)); // Reset to first page
    loadBookings();
  }, [
    fromDate,
    toDate,
    setDateFilter,
    setPagingParams,
    loadBookings,
    pageSize,
  ]);

  useEffect(() => {
    setFromDate(startDate);
    setToDate(endDate);
  }, [startDate, endDate]);

  const handleStatusSelect = (status: string) => {
    setStatusFilter(status);
    loadBookings();
  };

  const handleServiceSelect = (service: string) => {
    setServiceFilter(service);
    loadBookings();
  };
  useEffect(() => {
    if (fromDate || toDate || bookingStatus || serviceId) {
      handleFilter();
    }
  }, [fromDate, toDate, bookingStatus, serviceId, handleFilter]);

  useEffect(() => {
    loadServicesDropdown();
  }, [loadServicesDropdown]);

  function handleFromDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFromDate(e.target.value);
  }

  function handleToDateChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setToDate(e.target.value);
  }

  const statusDefaultItems = [
    { label: "Pending", value: "Pending" },
    { label: "In Process", value: "InProcess" },
    { label: "Completed", value: "Completed" },
    { label: "Canceled", value: "Canceled" },
  ];

  return (
    <div className="section-search page-search">
      <div className="container">
        <div className="bg-none w-1/2 flex justify-center items-center">
          {/* Divider with customized style */}
          <Divider className="my-1 border-black-300" />

          <div className="sm:flex items-center justify-between mx-2 gap-4">
            {" "}
            {/* Add gap here */}
            {/* From Date Input */}
            <input
              className="mb-4 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent p-2"
              type="date"
              value={fromDate ?? ""}
              onChange={(e) => handleFromDateChange(e)}
            />
            {/* To Date Input */}
            <input
              className="mb-4 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent p-2"
              type="date"
              value={toDate ?? ""}
              onChange={(e) => handleToDateChange(e)}
            />
            {/* Booking Status Dropdown */}
            <select
              className="mb-4 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent p-2"
              value={bookingStatus ?? ""}
              onChange={(e) => handleStatusSelect(e.target.value)}
            >
              <option value="" disabled>
                {t("Status")}
              </option>
              {statusDefaultItems.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            {/* Service Dropdown */}
            <select
              className="mb-4 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent p-2"
              value={serviceId ?? ""}
              onChange={(e) => handleServiceSelect(e.target.value)}
            >
              <option value="" disabled>
                {t("All Services")}
              </option>
              {servicesDropdown?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFilter;
