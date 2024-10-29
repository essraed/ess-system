import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
  handlePageSizeChange: (key: number) => void;
  pageSize: number;
};

const PaginationComponent = ({ handlePageSizeChange, pageSize }: Props) => {
  const { t } = useTranslation();
  return (
    <Dropdown radius="none">
      <DropdownTrigger>
        <Button radius="none">
          {t("Page Size")}: {pageSize}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Page size options"
        selectionMode="single"
        onSelectionChange={(key) =>
          handlePageSizeChange(Number(key.currentKey))
        }
      >
        <DropdownItem key="10">10</DropdownItem>
        <DropdownItem key="20">20</DropdownItem>
        <DropdownItem key="50">50</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default PaginationComponent;
