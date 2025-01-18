
import "rc-slider/assets/index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

import React, { useCallback, useEffect, useState } from "react";
import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
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
  }, [fromDate, toDate, setDateFilter, setPagingParams, loadBookings, pageSize]);

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
        <div className="search-box-banner">
          <div className="sm:flex items-center justify-between gap-2">
            <Input
              className="mb-2"
              type="date"
              value={fromDate ?? ''}
              onChange={(e) => handleFromDateChange(e)}
              label={t("From Date")}
            />
            <Input
              className="mb-2"
              type="date"
              value={toDate ?? ''}
              onChange={(e) => handleToDateChange(e)}
              label={t("To Date")}
            />

            <Autocomplete
              className="mb-2"
              label={t("Booking Status")}
              placeholder={t("Select status")}
              defaultItems={statusDefaultItems}
              value={bookingStatus ?? ''}
              onSelectionChange={(key) =>
                handleStatusSelect(key?.toString() as string)
              }
            >
              {(item) => (
                <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
              )}
            </Autocomplete>

            <Autocomplete
              value={serviceId ?? ""}
              className="mb-2"
              label={t("Service")}
              placeholder={t("Select a service")}
              defaultItems={servicesDropdown ?? []}
              onSelectionChange={(key) =>
                handleServiceSelect(key?.toString() as string)
              }
            >
              {(item) => (
                <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
              )}
            </Autocomplete>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFilter;
