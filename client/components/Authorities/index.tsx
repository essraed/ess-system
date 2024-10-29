"use client";
import { useStore } from "@/stores/store";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Pagination,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { PagingParams } from "@/types/pagination";
import { useTranslation } from "react-i18next";
import LoadingComponent from "@/components/LoadingComponent";
import { GrPowerReset } from "react-icons/gr";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { formatDateTime } from "@/lib/utils";
import ConfirmationDialogComponent from "@/components/ConfirmationDialogComponent";
import AddAuthorityForm from "./AddAuthorityForm";
import { DeleteIcon } from "../icons/table/delete-icon";
import PaginationComponent from "../PaginationComponent";
import AuthoritiesTable from "./AuthoritiesTable";

const Authorities = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const {
    authorityStore: {
      authorities,
      loadAuthorities,
      setPagingParams,
      pagination,
      setSearchTerm,
      deleteAuthority,
      clearAuthorities,
    },
    userStore,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  function handleGetNext(page: number) {
    setPagingParams(new PagingParams(page, pageSize));
    loadAuthorities();
  }

  function handlePageSizeChange(newPageSize: number) {
    setPageSize(newPageSize);
    setPagingParams(new PagingParams(1, newPageSize));
    loadAuthorities();
  }

  function handleSearch() {
    setSearchTerm(searchQuery);
    setPagingParams(new PagingParams(1, pageSize));
    loadAuthorities();
  }

  function handleReset() {
    setSearchTerm("");
    setSearchQuery("");
    setPagingParams(new PagingParams(1, pageSize));
    loadAuthorities();
  }

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setConfirmDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteAuthority(deleteId);
      handleReset();
      setConfirmDeleteOpen(false);
    }
  };

  useEffect(() => {
    if (!userStore.token) {
      clearAuthorities();
      toast.error("Unauthorized");
    } else {
      loadAuthorities();
    }
  }, [userStore.token, loadAuthorities, router]);

  if (!authorities) return <LoadingComponent />;

  return (
    <div
      className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4 rounded-none"
      style={{ borderRadius: "0 !important" }}
    >
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <div className="flex items-center gap-2 w-2/6">
            <Input
              radius="none"
              placeholder={t("Search...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <Button onClick={handleReset} variant="bordered" radius="none">
              <GrPowerReset size={20} />
            </Button>
          </div>
          <AddAuthorityForm />
        </div>
      </div>

      <AuthoritiesTable
        authorities={authorities}
        confirmDelete={confirmDelete}
      />

      <div className="flex items-center justify-between">
        <div>
          {pagination && (
            <div dir="ltr" className="flex w-full justify-center">
              <Pagination radius="none"
                isCompact
                showControls
                showShadow
                color="primary"
                page={pagination.pageNumber}
                total={pagination.pageCount}
                onChange={(page) => handleGetNext(page)}
              />
            </div>
          )}
        </div>
        <div>
          <PaginationComponent
            handlePageSizeChange={handlePageSizeChange}
            pageSize={pageSize}
          />
        </div>
      </div>

      <ConfirmationDialogComponent
        isOpen={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={handleDelete}
        title={t("Confirm Delete")}
        description={`${t("Are you sure you want to delete this")} ${t(
          "authority"
        )}${t("?")}`}
      />
    </div>
  );
};

export default observer(Authorities);
