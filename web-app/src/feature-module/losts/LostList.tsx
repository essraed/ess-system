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
import LostDetails from "./LostDetails";
import { Console } from "console";

const LostList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    lostStore: {
      lostItems,
      loadLostItems,
      setPagingParams,
      pagination,
      setSearchTerm,
      deleteLostItem,
      clearLostItems,
      setDateFilter,
      getLostItem,
      setStatusInProcess,
      setStatusCompleted,
      setStatusFilter,
    },
    userStore,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(10);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleGetNext = (page: number) => {
    setPagingParams(new PagingParams(page, pageSize));
    loadLostItems();
  };

  const handleSearch = () => {
    setSearchTerm(searchQuery);
    setPagingParams(new PagingParams(1, pageSize));
    loadLostItems();
  };

  const handleReset = () => {
    setSearchTerm("");
    setSearchQuery("");
    setDateFilter("", "");
    setStatusFilter("");
    setPagingParams(new PagingParams(1, pageSize));
    loadLostItems();
  };

  const handleDelete = async () => {
    if (selectedId) {
      await deleteLostItem(selectedId);
      loadLostItems();
      navigate(location.pathname, { replace: true });
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPagingParams(new PagingParams(1, newPageSize));
    loadLostItems();
  };

  useEffect(() => {
    if (!userStore.token) {
      clearLostItems();
      navigate("/login");
      toast.error("Unauthorized");
    } else {
      loadLostItems();
    }
  }, [userStore.token, loadLostItems]);

  if (!Array.isArray(lostItems)) return <LoadingSpinner />;

  const getViewId = (id: string) => {
    getLostItem(id);
  };

  const handleComplete = async () => {
    if (selectedId) {
      await setStatusCompleted(selectedId);
      loadLostItems();
      navigate(location.pathname, { replace: true });
    }
  };
  const handleInProcess = async () => {
    if (selectedId) {
      await setStatusInProcess(selectedId);
      loadLostItems();
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
                    "lostDepartment",
                    "phone",
                    "Email",
                    "updatedBy"
                    
                  ]}
                  data={lostItems!}
                  pageSize={pageSize}
                  rowsPerPageOptions={[10, 25, 50]}
                  routeUrl={all_routes.lostDashboard}
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
          "Lost Item"
        )}${t("?")}`}
      />

      {/* Category Details */}
      <LostDetails modalId={all_routes.lostDashboard} />

      <ConfirmDialog
        modalId={dialogFlags.completeDialog}
        onConfirm={handleComplete}
        title="Confirm Setting As Completed"
        description="Are you sure you want to set this Lost as completed?"
      />
       <ConfirmDialog
        modalId={dialogFlags.inProocess}
        onConfirm={handleInProcess}
        title="Confirm Setting As InProcess"
        description="Are you sure you want to set this Lost as InProcess?"
      />
    </div>
  );
};

export default observer(LostList);
