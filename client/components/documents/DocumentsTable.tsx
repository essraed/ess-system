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
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
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
    <Table aria-label="Documents table">
      <TableHeader>
        <TableColumn>{t("Brief")}</TableColumn>
        {/* <TableColumn>{t("AI Result")}</TableColumn> */}
        <TableColumn>{t("Last Update")}</TableColumn>
        <TableColumn>{t("Update By")}</TableColumn>
        <TableColumn>{t("Actions")}</TableColumn>
      </TableHeader>
      <TableBody items={documents}>
        {(document) => (
          <TableRow key={document.id}>
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
                <Dropdown className="bg-background border-1 border-default-200">
                  <DropdownTrigger>
                    <Button isIconOnly radius="full" size="sm" variant="light">
                      <VerticalDotsIcon className="text-default-400" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem>
                      <Link
                        href={`/documents/details/${document.id}`}
                        className="flex items-center py-2"
                      >
                        {t("View")}
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link
                        href={`/documents/update/${document.id}`}
                        className="flex items-center py-2"
                      >
                        {t("Edit")}
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
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
