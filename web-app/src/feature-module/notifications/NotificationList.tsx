import React, { useEffect, useState } from "react";
import Table from "../common/Table";
import { observer } from "mobx-react-lite";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { PagingParams } from "../../types/pagination";
import Paginator from "../common/Paginator";
import { all_routes } from "../router/all_routes";
import { dialogFlags } from "../../constants/constants";
import ConfirmDialog from "../common/ConfirmDialog";
import TableFilterBar from "../common/TableFilterBar";
import LoadingSpinner from "../common/LoadingSpinner";

const NotificationList = () => {
  // const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    notificationStore: {
      notifications,
      loadNotifications,
      setPagingParams,
      pagination,
      setDateFilter,
      deleteNotification,
      setIsReadParam,
    },
    userStore,
  } = useStore();
  const [pageSize, setPageSize] = useState(10);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleGetNext = (page: number) => {
    setPagingParams(new PagingParams(page, pageSize));
    loadNotifications();
  };

  const handleReset = () => {
    setDateFilter("", "");
    setPagingParams(new PagingParams(1, pageSize));
    loadNotifications(); // Reload categories after resetting filters
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteNotification(deleteId);
      loadNotifications();
      navigate(location.pathname, { replace: true });
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPagingParams(new PagingParams(1, newPageSize));
    loadNotifications(); // Reload categories with new page size
  };

  useEffect(() => {
  if (!userStore.appLoaded) return; // Wait until user loading is done

  const token = userStore.token;

  if (!token || !userStore.user) {
    navigate("/login");
    toast.error("Unauthorized");
    return;
  }

    const isAuthorized =
      userStore.isMarketingManager() ||
      userStore.isAdmin() ||
      userStore.isUser();

    if (!isAuthorized)  {
      // clearNotification();
      navigate("/login");
      toast.error("Unauthorized");
    } else {
      setIsReadParam(null);
      loadNotifications();
    }
  }, [userStore.appLoaded,userStore.token, loadNotifications]);

  if (!Array.isArray(notifications)) return <LoadingSpinner />;

  return (
    <div className="col-lg-12">
      <div className="row">
        <div className="col-lg-12 d-flex">
          <div className="card book-card flex-fill mb-0">
            <TableFilterBar
              pagination={pagination}
              pageSize={pageSize}
              handlePageSizeChange={handlePageSizeChange}
              handleReset={handleReset}
            ></TableFilterBar>

            <div className="flex flex-col card-body">
              <div className="table-responsive dashboard-table">
                <Table
                  dialogFlags={dialogFlags}
                  setSelectedId={setDeleteId}
                  exceptColumns={["id", "pictureUrl", "moreDetailsUrl"]}
                  data={notifications}
                  pageSize={pageSize} // Use pageSize state variable here
                  rowsPerPageOptions={[10, 25, 50]}
                  routeUrl={all_routes.notificationDashboard}
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
        title="Confirm Delete"
        description="Are you sure you want to delete this Notification?"
      />
    </div>
  );
};

export default observer(NotificationList);
