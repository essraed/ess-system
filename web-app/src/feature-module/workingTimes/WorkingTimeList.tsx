import React, { useEffect } from "react";
import Table from "../common/Table";
import { observer } from "mobx-react-lite";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { PagingParams } from "../../types/pagination";
import Paginator from "../common/Paginator";
import { all_routes } from "../router/all_routes";
import { dialogFlags } from "../../constants/constants";
import WorkingeForm from "./WorkingTimeForm";

const WorkingTimeList = () => {
  const navigate = useNavigate();

  const {
    workingTimeStore: {
      workingTimes,
      loadWorkingTimes,
      setPagingParams,
      pagination,
      clearNotification,
    },
    userStore,
  } = useStore();

  const handleGetNext = (page: number) => {
    setPagingParams(new PagingParams(page, pagination?.pageSize));
    loadWorkingTimes();
  };

  useEffect(() => {
    if (!userStore.token) {
      clearNotification();
      navigate("/login");
      toast.error("Unauthorized");
    } else {
      loadWorkingTimes();
      console.log("services", workingTimes);
    }
  }, [userStore.token, loadWorkingTimes]);

  if (!Array.isArray(workingTimes)) return <p>Loading...</p>;

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
                          {pagination.pageNumber && pagination?.pageSize
                            ? pagination.pageNumber * pagination?.pageSize -
                              (pagination?.pageSize - 1)
                            : 0}
                          -{" "}
                          {pagination.pageNumber && pagination.totalCount
                            ? Math.min(
                                pagination.pageNumber * pagination?.pageSize,
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
                            <WorkingeForm />
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
                <Table
                  dialogFlags={dialogFlags}
                  exceptColumns={[
                    "id",
                    "pictureUrl",
                    "rate",
                    "totalPrice",
                    "categoryId",
                    "serviceVipName",
                    "serviceOptions",
                  ]}
                  data={workingTimes}
                  pageSize={pagination?.pageSize} // Use pageSize state variable here
                  rowsPerPageOptions={[10, 25, 50]}
                  routeUrl={all_routes.WorkingTimeDashboard}
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
    </div>
  );
};

export default observer(WorkingTimeList);
