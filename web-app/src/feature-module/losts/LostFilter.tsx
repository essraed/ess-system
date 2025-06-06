import "rc-slider/assets/index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

import React, { useEffect, useState } from "react";
import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { useStore } from "../../app/stores/store";
import { PagingParams } from "../../types/pagination";
import { observer } from "mobx-react-lite";

const LostFilter = () => {
  const {
    lostStore: {
      setDateFilter,
      loadLostItems,
      setPagingParams,
      pagination,
      fromDate: startDate,
      toDate: endDate,
      lostStatus,
      setStatusFilter,
    },
  } = useStore();


  const [fromDate, setFromDate] = useState<string | null>(null);
  const [toDate, setToDate] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleFilter = () => {
    setDateFilter(fromDate, toDate);
    setPagingParams(new PagingParams(1, pagination?.pageSize)); // Reset to first page when searching
    loadLostItems();
  };

  useEffect(() => {
    setFromDate(startDate);
    setToDate(endDate);
  }, [startDate, endDate]);

useEffect(() => {
    const timeout = setTimeout(() => {
        handleFilter();
    }, 300);
    return () => clearTimeout(timeout);
}, [fromDate, toDate,lostStatus]);
  useEffect(() => {
    loadLostItems();
  }, []);

  function handleFromDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFromDate(e.target.value);
  }

  function handleToDateChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setToDate(e.target.value);
  }
  const handleStatusSelect = (status: string) => {
    setStatusFilter(status);
    loadLostItems();
  };

  const statusDefaultItems = [
    { label: "Pending", value: "Pending" },
    { label: "In Process", value: "InProcess" },
    { label: "Completed", value: "Completed" },
  ];

  return (
    <div className="section-search page-search">
      <div className="container">
        <div className="search-box-banner">
          <div className="sm:flex items-center justify-between gap-2">
            <Input
              className="mb-2"
              type="date"
              value={fromDate??""}
              onChange={(e) => handleFromDateChange(e)}
              label={t("From Date")}
            />
            <Input
              className="mb-2"
              type="date"
              value={toDate??""}
              onChange={(e) => handleToDateChange(e)}
              label={t("To Date")}
            />

            <Autocomplete
              className="mb-2"
              label={t("Lost Status")}
              placeholder={t("Select status")}
              defaultItems={statusDefaultItems}
              value={lostStatus ?? ""}
              onSelectionChange={(key) =>
                handleStatusSelect(key?.toString() as string)
              }
            >
              {(item) => (
                <AutocompleteItem key={item.value}>
                  {item.label}
                </AutocompleteItem>
              )}
            </Autocomplete>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(LostFilter);
