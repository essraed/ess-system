
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
import WorkingTimeForm from "./WorkingTimeForm";
import TableFilterBar from "../common/TableFilterBar";

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
  const handleReset = () => {
    setPagingParams(new PagingParams(1, pagination?.pageSize));
    loadWorkingTimes(); // Reload documents after resetting filters
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
          <TableFilterBar
              pagination={pagination}
              handleReset={handleReset}
            >
              <WorkingTimeForm />
            </TableFilterBar>

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
