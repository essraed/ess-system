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
import ComplaintDetails from "./ComplaintDetails";

const ComplaintList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    complaintStore: {
      complaintItems,
      loadComplaintItems,
      setPagingParams,
      pagination,
      setSearchTerm,
      deleteComplaintItem,
      clearComplaintItems,
      setDateFilter,
      getComplaintItem,
      setStatusInProcess,
      setStatusCompleted,
      setStatusFilter,
      setType,
    },
    userStore,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(10);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleGetNext = (page: number) => {
    setPagingParams(new PagingParams(page, pageSize));
    loadComplaintItems();
  };

  const handleSearch = () => {
    setSearchTerm(searchQuery);
    setPagingParams(new PagingParams(1, pageSize));
    loadComplaintItems();
  };

  const handleReset = () => {
    setSearchTerm("");
    setSearchQuery("");
    setDateFilter("", "");
    setStatusFilter("");
    setType(null);
    setPagingParams(new PagingParams(1, pageSize));
    loadComplaintItems();
  };

  const handleDelete = async () => {
    if (selectedId) {
      await deleteComplaintItem(selectedId);
      loadComplaintItems();
      navigate(location.pathname, { replace: true });
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPagingParams(new PagingParams(1, newPageSize));
    loadComplaintItems();
  };

  useEffect(() => {
    if (
      !(
        userStore.isMarketingManager() ||
        userStore.isAdmin() ||
        userStore.isUser()
      )
    ) {
      clearComplaintItems();
      navigate("/login");
      toast.error("Unauthorized");
    } else {
      loadComplaintItems();
    }
  }, [userStore.token, loadComplaintItems]);

  if (!Array.isArray(complaintItems)) return <LoadingSpinner />;

  const getViewId = (id: string) => {
    getComplaintItem(id);
  };

  const handleComplete = async () => {
    if (selectedId) {
      await setStatusCompleted(selectedId);
      loadComplaintItems();
      navigate(location.pathname, { replace: true });
    }
  };
  const handleInProcess = async () => {
    if (selectedId) {
      await setStatusInProcess(selectedId);
      loadComplaintItems();
      navigate(location.pathname, { replace: true });
    }
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
                  setSelectedId={setSelectedId}
                  exceptColumns={[
                    "id",
                    "isDeleted",
                    "comments",
                    "department",
                    "phone",
                    "Email",
                    "updatedBy",
                  ]}
                  data={complaintItems!}
                  pageSize={pageSize}
                  rowsPerPageOptions={[10, 25, 50]}
                  routeUrl={all_routes.ComplaintDashboard}
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
          "Complaint"
        )}${t("?")}`}
      />

      {/* Category Details */}
      <ComplaintDetails modalId={all_routes.ComplaintDashboard} />

      <ConfirmDialog
        modalId={dialogFlags.completeDialog}
        onConfirm={handleComplete}
        title="Confirm Setting As Completed"
        description="Are you sure you want to set this Complaint as completed?"
      />
      <ConfirmDialog
        modalId={dialogFlags.inProocess}
        onConfirm={handleInProcess}
        title="Confirm Setting As InProcess"
        description="Are you sure you want to set this Complaint as InProcess?"
      />
    </div>
  );
};

export default observer(ComplaintList);
