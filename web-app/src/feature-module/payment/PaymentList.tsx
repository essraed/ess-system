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

const PaymentList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    categoryStore: {
      categories,
      loadCategories,
      setPagingParams,
      pagination,
      setSearchTerm,
      deleteCategory,
      clearCategories,
      setDateFilter,
      setSelectedUser,
      getCategory,
    },
    userStore,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(10);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleGetNext = (page: number) => {
    setPagingParams(new PagingParams(page, pageSize));
    loadCategories();
  };

  const handleSearch = () => {
    setSearchTerm(searchQuery);
    setPagingParams(new PagingParams(1, pageSize));
    loadCategories(); // Reload categories with the new search term
  };

  const handleReset = () => {
    setSearchTerm("");
    setSearchQuery("");
    setDateFilter("", "");
    setSelectedUser("");
    setPagingParams(new PagingParams(1, pageSize));
    loadCategories(); // Reload categories after resetting filters
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteCategory(deleteId);
      loadCategories(); // Reload categories after deletion
      navigate(location.pathname, { replace: true });
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPagingParams(new PagingParams(1, newPageSize));
    loadCategories(); // Reload categories with new page size
  };

  useEffect(() => {
    if (!userStore.token) {
      clearCategories();
      navigate("/login");
      toast.error("Unauthorized");
    } else {
      loadCategories();
    }
  }, [userStore.token, loadCategories]);

  if (!Array.isArray(categories)) return <LoadingSpinner />;

  const getViewId = (id: string) => {
    getCategory(id);
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
            </TableFilterBar>

            {/* Table */}
            <div className="flex flex-col card-body">
              <div className="table-responsive dashboard-table">
                <Table
                  getViewId={getViewId}
                  dialogFlags={dialogFlags}
                  setSelectedId={setDeleteId}
                  exceptColumns={["id", "pictureUrl", "description", "filePath"]}
                  data={categories}
                  pageSize={pageSize}
                  rowsPerPageOptions={[10, 25, 50]}
                  routeUrl={all_routes.categoryDashboard}
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
          "category"
        )}${t("?")}`}
      />

      {/* Category Details */}
      {/* <CategoryDetails modalId={all_routes.categoryDashboard} /> */}
    </div>
  );
};

export default observer(PaymentList);
