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
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <AddAuthorityForm />
          <div className="flex items-center gap-2 w-2/6">
            <Input
              placeholder={t("Search...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <Button onClick={handleReset} variant="bordered">
              <GrPowerReset size={20} />
            </Button>
          </div>
        </div>
      </div>

      <Table aria-label="Authorities table">
        <TableHeader>
          <TableColumn>{t("Name")}</TableColumn>
          <TableColumn>{t("Last Update")}</TableColumn>
          <TableColumn>{t("Updated By")}</TableColumn>
          <TableColumn>{t("Actions")}</TableColumn>
        </TableHeader>
        <TableBody items={authorities ?? []}>
          {(authority) => (
            <TableRow key={authority.id}>
              <TableCell>{authority.name}</TableCell>
              <TableCell className="w-2/12">
                <div>
                  <span>
                    {formatDateTime(
                      authority.updateDate?.toString() ||
                      authority.createDate?.toString()
                    ).date}
                  </span>
                  <br />
                  <span>
                    {formatDateTime(
                      authority.updateDate?.toString() ||
                      authority.createDate?.toString()
                    ).time}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                {authority.updatedByName || authority.createdByName}
              </TableCell>
              <TableCell>
                <div className="flex gap-2 justify-center">
                  <Button
                   variant="light"
                    onPress={() => confirmDelete(authority.id)}
                    color="danger"
                    title={ t ("Delete")}
                  >
                    <DeleteIcon size={20} fill="#FF0080" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

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
          "authority"
        )}${t("?")}`}
      />
    </div>
  );
};

export default observer(Authorities);
