import React, { useEffect, useState } from "react";
import Table from "../common/Table";
import { observer } from "mobx-react-lite";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { PagingParams } from "../../types/pagination";
import ConfirmDialog from "../common/ConfirmDialog";
import Paginator from "../common/Paginator";
import { all_routes } from "../router/all_routes";
import { dialogFlags } from "../../constants/constants";
import ServiceDetailsDialog from "./ServiceDetailsDialog";
import TableFilterBar from "../common/TableFilterBar";

const ServiceDashboardList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    serviceStore: {
      services,
      loadServices,
      setPagingParams,
      pagination,
      setSearchTerm,
      deleteService,
      clearServices,
      setDateFilter,
      setSelectedUser,
      setCategoryIdParam,
      getService,
    },
    userStore,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleGetNext = (page: number) => {
    setPagingParams(new PagingParams(page, pageSize));
    loadServices();
  };

  const handleSearch = () => {
    setSearchTerm(searchQuery);
    setPagingParams(new PagingParams(1, pageSize));
    loadServices(); // Reload services with the new search term
  };

  const handleReset = () => {
    setSearchTerm("");
    setSearchQuery("");
    setDateFilter("", "");
    setSelectedUser("");
    setCategoryIdParam("");
    setPagingParams(new PagingParams(1, pageSize));
    loadServices(); // Reload services after resetting filters
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteService(deleteId);
      loadServices(); // Reload services after deletion
      navigate(location.pathname, { replace: true });
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    console.log("newPageSize: ", newPageSize);

    setPageSize(newPageSize);
    setPagingParams(new PagingParams(1, newPageSize));
    loadServices(); // Reload services with new page size
  };

  useEffect(() => {
    if (!userStore.token) {
      clearServices();
      navigate("/login");
      toast.error("Unauthorized");
    } else {
      loadServices();
      console.log("services", services);
    }
  }, [userStore.token, loadServices]);

  if (!Array.isArray(services)) return <p>Loading...</p>;

  const getViewId = (id: string) => {
    getService(id);
  };

  return (
    <div className="col-lg-12">
      <div className="row">
        <div className="col-lg-12 d-flex">
          <div className="card book-card flex-fill mb-0">
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
              <Link
                to={all_routes.serviceCreate}
                className="flex items-center gap-2 btn btn-primary w-full sm:w-auto text-center"
              >
                Add Service
                <span className="ml-2">
                  <i className="fe feather icon-add" aria-hidden="true" />
                </span>
              </Link>
            </TableFilterBar>
            <div className="flex flex-col card-body">
              <div className="table-responsive dashboard-table">
                <Table
                  getViewId={getViewId}
                  dialogFlags={dialogFlags}
                  setSelectedId={setDeleteId}
                  exceptColumns={[
                    "id",
                    "pictureUrl",
                    "rate",
                    "totalPrice",
                    "categoryId",
                    "serviceVipName",
                    "serviceOptions",
                  ]}
                  data={services}
                  pageSize={pageSize} // Use pageSize state variable here
                  rowsPerPageOptions={[10, 25, 50]}
                  routeUrl={all_routes.serviceDashboard}
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
      <ConfirmDialog
        modalId={dialogFlags.deleteDialog}
        onConfirm={handleDelete}
        title={t("Confirm Delete")}
        description={`${t("Are you sure you want to delete this")} ${t(
          "Service"
        )}${t("?")}`}
      />

      <ServiceDetailsDialog modalId={all_routes.serviceDashboard} />
    </div>
  );
};

export default observer(ServiceDashboardList);
