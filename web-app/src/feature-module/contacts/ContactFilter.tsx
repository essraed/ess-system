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

const ContactFilter = () => {
  const {
    contactStore: {
      setDateFilter,
      loadContact,
      setPagingParams,
      pagination,
      fromDate: startDate,
      toDate: endDate,
    },
  } = useStore();

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const[enquiryType,setEnquiryType]=useState("");
  const { t } = useTranslation();

  const handleFilter = () => {
    setDateFilter(fromDate, toDate);
    setPagingParams(new PagingParams(1, pagination?.pageSize)); // Reset to first page when searching
    loadContact();
  };

  useEffect(() => {
    setFromDate(startDate);
    setToDate(endDate);
  }, [startDate, endDate]);

  useEffect(() => {
    handleFilter();
  }, [fromDate, toDate]);

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
            {/* <Autocomplete
              value={enquiryType ?? ""}
              className="mb-2"
              label={t("Enquiry Type")} // Translate "External Authority"rDropdown ?? []}
              onSelectionChange={(key) =>
                handleCategorySelect(key?.toString() as string)
              }
            >
              {(item) => (
                <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
              )}
            </Autocomplete> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFilter;
