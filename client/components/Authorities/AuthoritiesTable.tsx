import { formatDateTime } from "@/lib/utils";
import { AuthorityModel } from "@/types/AuthorityModel";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { VerticalDotsIcon } from "../icons/table/VerticalDotsIcon";
import { useTranslation } from "react-i18next";

type Props = {
  authorities: AuthorityModel[];
  confirmDelete: (id: string) => void;
};

const AuthoritiesTable = ({ authorities, confirmDelete }: Props) => {
  const { t } = useTranslation();

  return (
    <Table aria-label="Authorities table" radius="none">
      <TableHeader>
        <TableColumn className="text-zinc-900 font-bold bg-white dark:bg-zinc-900 dark:text-white border-b-2">
          {t("Name")}
        </TableColumn>
        <TableColumn className="text-zinc-900 font-bold bg-white dark:bg-zinc-900 dark:text-white border-b-2">
          {t("Last Update")}
        </TableColumn>
        <TableColumn className="text-zinc-900 font-bold bg-white dark:bg-zinc-900 dark:text-white border-b-2">
          {t("Updated By")}
        </TableColumn>
        <TableColumn className="text-zinc-900 font-bold bg-white dark:bg-zinc-900 dark:text-white border-b-2">
          {t("Actions")}
        </TableColumn>
      </TableHeader>
      <TableBody items={authorities ?? []}>
        {(authority) => (
          <TableRow
            key={authority.id}
            className={`${
              authorities[authorities.length - 1].id === authority.id
                ? ""
                : "border-b"
            }`}
          >
            <TableCell>{authority.name}</TableCell>
            <TableCell className="w-2/12">
              <div>
                <span>
                  {
                    formatDateTime(
                      authority.updateDate?.toString() ||
                        authority.createDate?.toString()
                    ).date
                  }
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
                  title={t("Delete")}
                >
                  <DeleteIcon size={20} fill="#FF0080" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default AuthoritiesTable;
