"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DocumentsTable from "./DocumentsTable";
import LoadingComponent from "../LoadingComponent";
import toast from "react-hot-toast";
import { PagingParams } from "@/types/pagination";
import { useStore } from "@/stores/store";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { IoMdAddCircleOutline } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import ConfirmationDialogComponent from "../ConfirmationDialogComponent";
import { observer } from "mobx-react-lite";
import DocumentFilter from "./DocumentFilter";
import PaginationComponent from "../PaginationComponent";

const Documents = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const {
    documentStore: {
      documents,
      loadDocuments,
      setPagingParams,
      pagination,
      setSearchTerm,
      deleteDocument,
      clearDocuments,
      setDateFilter,
      setSelectedAuthority,
    },
    userStore,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleGetNext = (page: number) => {
    setPagingParams(new PagingParams(page, pageSize));
    loadDocuments();
  };

  const handleSearch = () => {
    setSearchTerm(searchQuery);
    setPagingParams(new PagingParams(1, pageSize)); // Reset to first page when searching
    loadDocuments();
  };

  const handleReset = () => {
    setSearchTerm("");
    setSearchQuery("");
    setDateFilter("", "");
    setSelectedAuthority("");
    setPagingParams(new PagingParams(1, pageSize));
    router.refresh();
    console.log('documents: ', documents);
    
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteDocument(deleteId);
      handleReset();
      setConfirmDeleteOpen(false);
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPagingParams(new PagingParams(1, newPageSize)); // Reset pagination on page size change
    loadDocuments();
  };

  useEffect(() => {
    if (!userStore.token) {
      clearDocuments();
      router.push("/login");
      toast.error("Unauthorized");
    } else {
      loadDocuments();
    }
  }, [userStore.token, loadDocuments, router]);

  if (!documents) return <LoadingComponent />;

  return (
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      {/* <ul className="flex">
        <li className="flex gap-2">
          <HouseIcon />
          <Link href={"/"}>
            <span>Home</span>
          </Link>
          <span> / </span>{" "}
        </li>

        <li className="flex gap-2">
          <UsersIcon />
          <span>Documents</span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>List</span>
        </li>
      </ul> */}

      <h3 className="text-xl font-semibold">{t ('All')} {t ('Documents')}</h3>

      <div className="flex flex-col gap-5">
        <div>
          {userStore.isAdmin() && <DocumentFilter pageSize={pageSize} />}
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex items-center gap-2 w-2/6">
            <div className="w-full">
              <Input
                placeholder={t("Search...")}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
            </div>
            <Button onClick={handleReset} variant="bordered">
              <GrPowerReset size={20} />
            </Button>
          </div>
          <Button as={Link} href="/documents/create" color="primary">
            <IoMdAddCircleOutline size={24} />
            {t("Add new document")}
          </Button>
        </div>
      </div>

      <div className="max-w-[95rem] mx-auto w-full">
        <DocumentsTable
          documents={documents}
          setConfirmDeleteOpen={setConfirmDeleteOpen}
          setDeleteId={setDeleteId}
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          {pagination && (
            <div dir="ltr" className="flex w-full justify-center">
              <Pagination
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
        <PaginationComponent handlePageSizeChange={handlePageSizeChange} pageSize={pageSize} />
        </div>
      </div>
      <ConfirmationDialogComponent
        isOpen={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={handleDelete}
        title={t("Confirm Delete")}
        description={`${t("Are you sure you want to delete this")} ${t(
          "document"
        )}${t("?")}`}
      />
    </div>
  );
};

export default observer(Documents);
