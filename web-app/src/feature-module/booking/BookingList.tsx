import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { PagingParams } from "../../types/pagination";
import { useNavigate, useLocation } from "react-router-dom";
import Paginator from "../common/Paginator";
import ConfirmDialog from "../common/ConfirmDialog";
import Table from "../common/Table";
import { GrPowerReset } from "react-icons/gr";
import { useStore } from "../../app/stores/store";
import toast from "react-hot-toast";
import { Button } from "@nextui-org/react";
import React from "react";
import { all_routes } from "../router/all_routes";
import { Dropdown } from "primereact/dropdown";
import { dialogFlags } from "../../constants/constants";

const BookingList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingStore: {
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
    userStore
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
      await setStatusCanceled(selectedId);
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
    if (!userStore.token) {
      clearBookings();
      navigate("/login");
      toast.error("Unauthorized");
    } else {
      loadBookings();
    }
  }, [userStore.token, loadBookings]);

  if (!bookings) return <p>Loading...</p>;

  const pageSizeOptions = [
    { name: "10" },
    { name: "15" },
    { name: "20" },
    { name: "25" },
    { name: "30" },
  ];

  return (
    <div className="col-lg-12">
      <div className="row">
        <div className="col-lg-12 d-flex">
          <div className="card book-card flex-fill mb-0">
            <div className="card-header">
              <div className="sorting-div">
                <div className="row d-flex align-items-center">
                  <div className="col-xl-4 col-lg-3 col-sm-12 col-12">
                    <div className="count-search">
                      {pagination && (
                        <p>
                          Showing{" "}
                          {pagination.pageNumber && pageSize
                            ? pagination.pageNumber * pageSize - (pageSize - 1)
                            : 0}
                          -{" "}
                          {pagination.pageNumber && pagination.totalCount
                            ? Math.min(
                                pagination.pageNumber * pageSize,
                                pagination.totalCount
                              )
                            : 0}{" "}
                          of {pagination.totalCount || 0}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-xl-8 col-lg-9 col-sm-12 col-12">
                    <div className="product-filter-group">
                      <div className="sortbyset">
                        <ul className="d-flex">
                          <li>
                            <span className="sortbytitle">Show : </span>
                            <div className="sorting-select select-one">
                              <Dropdown
                                value={pageSize}
                                onChange={(e) =>
                                  handlePageSizeChange(Number(e.value.name))
                                }
                                options={pageSizeOptions}
                                optionLabel="name"
                                placeholder={String(pageSize)}
                              />
                            </div>
                          </li>
                          <li>
                            <Button
                              onClick={handleReset}
                              variant="bordered"
                            >
                              Reset <GrPowerReset size={20} />
                            </Button>
                          </li>
                          <li>
                            <label>
                              <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    handleSearch();
                                  }
                                }}
                                placeholder="Search"
                                className="bg-white p-1.5 border-2 border-gray-300 rounded-lg"
                              />
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col card-body">
              <div className="table-responsive dashboard-table">
                <Table getViewId={() => {}}
                  dialogFlags={dialogFlags}
                  setSelectedId={setSelectedId}
                  exceptColumns={["id", "aiResult", "createDate", "address", "email", "createdBy", "updatedBy"]}
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
      <ConfirmDialog modalId={dialogFlags.deleteDialog}
        onConfirm={handleDelete}
        title="Confirm Delete"
        description="Are you sure you want to delete this booking?"
      />
      <ConfirmDialog modalId={dialogFlags.completeDialog}
        onConfirm={handleComplete}
        title="Confirm Setting As Completed"
        description="Are you sure you want to set this booking as completed?"
      />
      <ConfirmDialog modalId={dialogFlags.cancelDialog}
        onConfirm={handleCancel}
        title="Confirm Cancel"
        description="Are you sure you want to cancel this booking?"
      />
    </div>
  );
};

export default observer(BookingList);
