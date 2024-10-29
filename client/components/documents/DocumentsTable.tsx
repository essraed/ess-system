"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
} from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { DocumentModel } from "@/types/Document";
import { formatDateTime } from "@/lib/utils";
import { VerticalDotsIcon } from "../icons/table/VerticalDotsIcon";

interface Props {
  documents: DocumentModel[];
  setConfirmDeleteOpen: (state: boolean) => void;
  setDeleteId: (id: string) => void;
}

const DocumentsTable = ({
  documents,
  setConfirmDeleteOpen,
  setDeleteId,
}: Props) => {
  const { t } = useTranslation();

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setConfirmDeleteOpen(true);
  };

  return (
    <Table aria-label="Documents table" radius="none">
      <TableHeader>
        <TableColumn className="text-zinc-900 font-bold bg-white dark:bg-zinc-900 dark:text-white border-b-2">
          {t("Brief")}
        </TableColumn>
        <TableColumn className="text-zinc-900 font-bold bg-white dark:bg-zinc-900 dark:text-white border-b-2">
          {t("Last Update")}
        </TableColumn>
        <TableColumn className="text-zinc-900 font-bold bg-white dark:bg-zinc-900 dark:text-white border-b-2">
          {t("Update By")}
        </TableColumn>
        <TableColumn className="text-zinc-900 font-bold bg-white dark:bg-zinc-900 dark:text-white border-b-2">
          {t("Actions")}
        </TableColumn>
      </TableHeader>
      <TableBody items={documents}>
        {(document) => (
          <TableRow
            key={document.id}
            className={`${
              documents[documents.length - 1].id === document.id
                ? ""
                : "border-b"
            }`}
          >
            <TableCell>{document.brief}</TableCell>
            <TableCell>
              {document.updatedByName ? (
                <span>{document.updatedByName}</span>
              ) : (
                <span>{document.createdByName}</span>
              )}
            </TableCell>
            <TableCell className="w-2/12">
              <div>
                <span>
                  {
                    formatDateTime(
                      document.updateDate?.toString() ||
                        document.createDate?.toString()
                    ).date
                  }
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="relative flex justify-end items-center gap-2">
                <Dropdown
                  radius="none"
                  className="bg-background border-1 border-default-200"
                >
                  <DropdownTrigger>
                    <Button isIconOnly radius="full" size="sm" variant="light">
                      <VerticalDotsIcon className="text-default-400" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem color="primary">
                      <Link
                        href={`/documents/details/${document.id}`}
                        className="flex items-center py-2"
                      >
                        {t("View")}
                      </Link>
                    </DropdownItem>
                    <DropdownItem color="primary">
                      <Link
                        href={`/documents/update/${document.id}`}
                        className="flex items-center py-2"
                      >
                        {t("Edit")}
                      </Link>
                    </DropdownItem>
                    <DropdownItem color="danger">
                      <Link
                        onClick={() => confirmDelete(document.id)}
                        className="flex items-center py-2"
                        href={""}
                      >
                        {t("Delete")}
                      </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DocumentsTable;
