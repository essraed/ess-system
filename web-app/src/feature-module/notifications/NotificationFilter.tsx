import "rc-slider/assets/index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { useStore } from "../../app/stores/store";
import { PagingParams } from "../../types/pagination";

const NotificationFilter = () => {
  const {
    notificationStore: {
      setDateFilter,
      loadNotifications,
      setPagingParams,
      pagination,
      fromDate: startDate,
      toDate: endDate,
    },

    userStore: { loadUsers },
  } = useStore();

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const { t } = useTranslation();

  const handleFilter = () => {
    setDateFilter(fromDate, toDate);
    setPagingParams(new PagingParams(1, pagination?.pageSize)); // Reset to first page when searching
    loadNotifications();
  };

  useEffect(() => {
    setFromDate(startDate);
    setToDate(endDate);
  }, [startDate, endDate]);

  useEffect(() => {
    handleFilter();
  }, [fromDate, toDate]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  function handleFromDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFromDate(e.target.value);
  }

  function handleToDateChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setToDate(e.target.value);
  }

  return (
    <div className="section-search page-search">
      <div className="container">
        <div className="search-box-banner">
          <div className="sm:flex items-center justify-between gap-2">
            <Input
              className="mb-2"
              type="date"
              value={fromDate}
              onChange={(e) => handleFromDateChange(e)}
              label={t("From Date")}
            />
            <Input
              className="mb-2"
              type="date"
              value={toDate}
              onChange={(e) => handleToDateChange(e)}
              label={t("To Date")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationFilter;
