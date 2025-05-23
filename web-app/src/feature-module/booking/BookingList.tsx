import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { PagingParams } from "../../types/pagination";
import { useNavigate, useLocation } from "react-router-dom";
import Paginator from "../common/Paginator";
import ConfirmDialog from "../common/ConfirmDialog";
import Table from "../common/Table";
import { useStore } from "../../app/stores/store";
import toast from "react-hot-toast";
import React from "react";
import { all_routes } from "../router/all_routes";
import { dialogFlags } from "../../constants/constants";
import TableFilterBar from "../common/TableFilterBar";
import LoadingSpinner from "../common/LoadingSpinner";

const BookingList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    bookingStore: {
      bookings,
      loadBookings,
      deleteBooking,
      pagination,
      setSearchTerm,
      setPagingParams,
      clearBookings,
      setDateFilter,
      setServiceFilter,
      setStatusCanceled,
      setStatusCompleted,
      setStatusFilter,
    },
    userStore,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleGetNext = (page: number) => {
    setPagingParams(new PagingParams(page, pageSize));
    loadBookings();
  };

  const handleSearch = () => {
    setSearchTerm(searchQuery);
    setPagingParams(new PagingParams(1, pageSize));
    loadBookings();
  };

  const handleReset = () => {
    setSearchTerm("");
    setSearchQuery("");
    setDateFilter("", "");
    setServiceFilter("");
    setStatusFilter("");
    setPagingParams(new PagingParams(1, pageSize));
    loadBookings();
  };

  const handleDelete = async () => {
    if (selectedId) {
      await deleteBooking(selectedId);
      loadBookings();
      navigate(location.pathname, { replace: true });
    }
  };
  const handleComplete = async () => {
    if (selectedId) {
      await setStatusCompleted(selectedId);
      loadBookings();
      navigate(location.pathname, { replace: true });
    }
  };
  const handleCancel = async () => {
    if (selectedId) {
      // await setStatusCanceled(selectedId);
      loadBookings();
      navigate(location.pathname, { replace: true });
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPagingParams(new PagingParams(1, newPageSize));
    loadBookings();
  };

  useEffect(() => {
    if (!(userStore.isUser() || userStore.isAdmin())) {
      clearBookings();
      navigate("/login");
      toast.error("Unauthorized");
    } else {
      loadBookings();
    }
  }, [userStore.token, loadBookings]);

  if (!bookings) return <LoadingSpinner />;

  return (
    <div className="col-lg-12">
      <div className="row">
        <div className="col-lg-12 d-flex">
          <div className="card book-card flex-fill mb-0 p-0">
            <TableFilterBar
              pagination={pagination}
              pageSize={pageSize}
              handlePageSizeChange={handlePageSizeChange}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
              handleReset={handleReset}
            ></TableFilterBar>
            <div className="flex flex-col card-body">
              <div className="table-responsive dashboard-table">
                <Table
                  dialogFlags={dialogFlags}
                  setSelectedId={setSelectedId}
                  exceptColumns={[
                    "id",
                    "aiResult",
                    "createDate",
                    "address",
                    "email",
                    "createdBy",
                    "updatedBy",
                    "paymentStatus",
                    "reason",
                    "adultsNumber",
                    "childrenNumber",
                    "duration",
                    "processTime", 
                    "carName",
                    "entryType",
                    "updateDate"
                  ]}
                  data={bookings}
                  pageSize={pageSize}
                  rowsPerPageOptions={[10, 25, 50]}
                  routeUrl={all_routes.bookingDashboard}
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
        description="Are you sure you want to delete this booking?"
      />
      <ConfirmDialog
        modalId={dialogFlags.completeDialog}
        onConfirm={handleComplete}
        title="Confirm Setting As Completed"
        description="Are you sure you want to set this booking as completed?"
      />
      <ConfirmDialog
        modalId={dialogFlags.cancelDialog}
        onConfirm={handleCancel}
        title="Confirm Cancel"
        description="Are you sure you want to cancel this booking?"
      />
    </div>
  );
};

export default observer(BookingList);
