import React, { useEffect, useState } from "react";
import Table from "../common/Table";
import { observer } from "mobx-react-lite";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { PagingParams } from "../../types/pagination";
import ConfirmDialog from "../common/ConfirmDialog";
import Paginator from "../common/Paginator";
import { all_routes } from "../router/all_routes";
import { dialogFlags } from "../../constants/constants";
import TableFilterBar from "../common/TableFilterBar";
import LoadingSpinner from "../common/LoadingSpinner";
import ContactDetails from "./ContactDetails";

const ContactList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    contactStore: {
      contacts,
      loadContact,
      setPagingParams,
      pagination,
      setSearchTerm,
      deleteContact,
      clearContacts,
      setDateFilter,
      getContact,
      setEnquiryType,
    },
    userStore,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(10);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleGetNext = (page: number) => {
    setPagingParams(new PagingParams(page, pageSize));
    loadContact();
  };

  const handleSearch = () => {
    setSearchTerm(searchQuery);
    setPagingParams(new PagingParams(1, pageSize));
    loadContact();
  };

  const handleReset = () => {
    setSearchTerm("");
    setSearchQuery("");
    setDateFilter("", "");
    setEnquiryType(null);
    setPagingParams(new PagingParams(1, pageSize));
    loadContact();
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteContact(deleteId);
      loadContact();
      navigate(location.pathname, { replace: true });
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPagingParams(new PagingParams(1, newPageSize));
    loadContact();
  };

  useEffect(() => {
    if (!userStore.token) {
      clearContacts();
      navigate("/login");
      toast.error("Unauthorized");
    } else {
      loadContact();
    }
  }, [userStore.token, loadContact]);

  if (!Array.isArray(contacts)) return <LoadingSpinner />;

  const getViewId = (id: string) => {
    getContact(id);
  };

  return (
    <div className="col-lg-12">
      <div className="row">
        <div className="col-lg-12 d-flex">
          <div className="card book-card flex-fill mb-0">
            {/* Filter Bar */}
            <TableFilterBar
              pagination={pagination}
              pageSize={pageSize}
              handlePageSizeChange={handlePageSizeChange}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
              handleReset={handleReset}
            >
              {/* Add Category Form as a child */}
            </TableFilterBar>

            {/* Table */}
            <div className="flex flex-col card-body">
              <div className="table-responsive dashboard-table">
                <Table
                  getViewId={getViewId}
                  dialogFlags={dialogFlags}
                  setSelectedId={setDeleteId}
                  exceptColumns={[
                    "id",
                    "message",
                    "isDeleted",
                    "ejari",
                    "localAgent",
                    "licenseType",
                  ]}
                  data={contacts}
                  pageSize={pageSize}
                  rowsPerPageOptions={[10, 25, 50]}
                  routeUrl={all_routes.contactDashboard}
                />
              </div>
              <div className="mx-auto pt-2">
                <Paginator
                  handleGetNext={handleGetNext}
                  pagination={pagination}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        modalId={dialogFlags.deleteDialog}
        onConfirm={handleDelete}
        title={t("Confirm Delete")}
        description={`${t("Are you sure you want to delete this")} ${t(
          "Contact"
        )}${t("?")}`}
      />

      {/* Category Details */}
      <ContactDetails modalId={all_routes.contactDashboard} />
    </div>
  );
};

export default observer(ContactList);
