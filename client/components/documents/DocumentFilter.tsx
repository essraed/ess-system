import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Divider,
  Input,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/store";
import { PagingParams } from "@/types/pagination";
import { CiFilter } from "react-icons/ci";
import { useTranslation } from "react-i18next";

type Props = {
  pageSize: number;
};

const DocumentFilter = ({ pageSize }: Props) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const { t } = useTranslation();

  const {
    documentStore: {
      setDateFilter,
      loadDocuments,
      setPagingParams,
      setSelectedAuthority,
      setSelectedUser,
      userId,
      authorityId,
    },
    userStore: { loadUsers, usersIdName },
    authorityStore: {authoritiesForDropdown, loadAuthoritiesForDropdown},
  } = useStore();

  const handleFilter = () => {
    console.log("from Date: ", fromDate);
    setDateFilter(fromDate, toDate);
    setPagingParams(new PagingParams(1, pageSize)); // Reset to first page when searching
    loadDocuments();
  };

  const handleUserSelect = (authorityName: string) => {
    setSelectedUser(authorityName);
  };

  const handleAuthoritySelect = (authorityName: string) => {
    setSelectedAuthority(authorityName);
  };
  
  useEffect(() => {
    handleFilter();
  }, [fromDate, toDate, userId, authorityId]);

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
    <div className="flex items-center gap-2 justify-between">
      <Input radius="none"
        type="date"
        value={fromDate}
        onChange={(e) => handleFromDateChange(e)}
        label={t("From Date")}
      />
      <Input radius="none"
        type="date"
        value={toDate}
        onChange={(e) => handleToDateChange(e)}
        label={t("To Date")}
      />

      <Autocomplete radius="none"
        label={t("Users List")}
        placeholder={t("Search an user")}
        defaultItems={usersIdName}
        onSelectionChange={(key) =>
          handleUserSelect(key?.toString() as string)
        }
      >
        {(item) => (
          <AutocompleteItem key={item.id}>{item.displayName}</AutocompleteItem>
        )}
      </Autocomplete>

      <Autocomplete radius="none"
        label={t("External Authority")} // Translate "External Authority"
        placeholder={t("Search an authority")} // Translate "Search an authority"
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
  );
};

export default observer(DocumentFilter);
