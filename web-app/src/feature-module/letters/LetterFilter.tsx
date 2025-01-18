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

type Props = {
  pageSize?: number;
};

const LetterFilter = ({ pageSize }: Props) => {
  const {
    documentStore: {
      setDateFilter,
      loadDocuments,
      setPagingParams,
      setSelectedAuthority,
      setSelectedUser,
      fromDate: startDate,
      toDate: endDate,
      userId,
      authorityId,
    },
    userStore: { loadUsers, usersIdName },
    authorityStore: { authoritiesForDropdown, loadAuthoritiesForDropdown },
  } = useStore();

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const { t } = useTranslation();

  const handleFilter = () => {
    setDateFilter(fromDate, toDate);
    setPagingParams(new PagingParams(1, pageSize)); // Reset to first page when searching
    loadDocuments();
  };

  useEffect(() => {
    setFromDate(startDate);
    setToDate(endDate);
    
  }, [startDate, endDate]);

  const handleUserSelect = (authorityName: string) => {
    setSelectedUser(authorityName);
    loadDocuments();
  };

  const handleAuthoritySelect = (authorityName: string) => {
    setSelectedAuthority(authorityName);
    loadDocuments();
  };

useEffect(() => {
    const timeout = setTimeout(() => {
        handleFilter();
    }, 300);
    return () => clearTimeout(timeout); 
}, [fromDate, toDate,userId,authorityId]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    loadAuthoritiesForDropdown();
  }, [loadAuthoritiesForDropdown]);

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

            <Autocomplete
              className="mb-2"
              label={t("Users List")}
              placeholder={t("Search an user")}
              defaultItems={usersIdName}
              value={userId}
              onSelectionChange={(key) =>
                handleUserSelect(key?.toString() as string)
              }
            >
              {(item) => (
                <AutocompleteItem key={item.id}>
                  {item.displayName}
                </AutocompleteItem>
              )}
            </Autocomplete>

            <Autocomplete
              value={authorityId ?? ''}
              className="mb-2"
              label={t("External Authority")}
              placeholder={t("Search an authority")} 
              defaultItems={authoritiesForDropdown ?? []}
              onSelectionChange={(key) =>
                handleAuthoritySelect(key?.toString() as string)
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

export default LetterFilter;
