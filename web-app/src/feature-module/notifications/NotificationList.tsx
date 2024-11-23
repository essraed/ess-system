import React, { useEffect, useState } from "react";
import Table from "../common/Table";
import { Button } from "@nextui-org/react";
import { GrPowerReset } from "react-icons/gr";
import { observer } from "mobx-react-lite";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { PagingParams } from "../../types/pagination";
import Paginator from "../common/Paginator";
import { Dropdown } from "primereact/dropdown";
import { all_routes } from "../router/all_routes";
import { dialogFlags } from "../../constants/contants";
import NotificationForm from "./NotificationForm";

const NotificationList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    notificationStore: {
      notifications,
      loadNotifications,
      setPagingParams,
      pagination,
      clearNotification,
      setDateFilter,
    },
    userStore,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleGetNext = (page: number) => {
    setPagingParams(new PagingParams(page, pageSize));
    loadNotifications();
  };

  const handleReset = () => {
    setSearchQuery("");
    setDateFilter("", "");
    setPagingParams(new PagingParams(1, pageSize));
    loadNotifications(); // Reload categories after resetting filters
  };

  const handlePageSizeChange = (newPageSize: number) => {
    console.log("newPageSize: ", newPageSize);

    setPageSize(newPageSize);
    setPagingParams(new PagingParams(1, newPageSize));
    loadNotifications(); // Reload categories with new page size
  };

  useEffect(() => {
    if (!userStore.token) {
      clearNotification();
      navigate("/login");
      toast.error("Unauthorized");
    } else {
      loadNotifications();
    }
  }, [userStore.token, loadNotifications]);

  if (!Array.isArray(notifications)) return <p>Loading...</p>;

  const number = [
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
                                options={number}
                                optionLabel="name"
                                placeholder={String(pageSize)}
                              />
                            </div>
                          </li>
                          <li>
                            <Button
                              onClick={handleReset} // Directly call handleReset without arrow function
                              variant="bordered"
                            >
                              Reset <GrPowerReset size={20} />
                            </Button>
                          </li>
                          {/* <li>
                            <NotificationForm />
                          </li> */}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col card-body">
              <div className="table-responsive dashboard-table">
                <Table
                  dialogFlags={dialogFlags}
                  setSelectedId={setDeleteId}
                  exceptColumns={["id", "pictureUrl"]}
                  data={notifications}
                  pageSize={pageSize} // Use pageSize state variable here
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

      {/* <CategoryDetails modalId={dialogFlags.categoryDialog} /> */}
    </div>
  );
};

export default observer(NotificationList);
