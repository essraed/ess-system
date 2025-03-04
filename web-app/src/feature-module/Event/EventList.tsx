
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
import handleErrors from "../../lib/utils";
import { dialogFlags } from "../../constants/constants";
import TableFilterBar from "../common/TableFilterBar";
import LoadingSpinner from "../common/LoadingSpinner";

const EventList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    eventStore: {
      events,
      loadEvents,
      setPagingParams,
      pagination,
      setSearchTerm,
      clearEvents
    },
    userStore,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleGetNext = (page: number) => {
    setPagingParams(new PagingParams(page, pageSize));
    loadEvents();
  };

  const handleSearch = () => {
    setSearchTerm(searchQuery);
    setPagingParams(new PagingParams(1, pageSize));
    loadEvents(); // Reload documents with the new search term
  };

  const handleReset = () => {
    setSearchTerm("");
    setSearchQuery("");
    setPagingParams(new PagingParams(1, pageSize));
    loadEvents(); // Reload documents after resetting filters
  };


  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPagingParams(new PagingParams(1, newPageSize));
    loadEvents(); // Reload documents with new page size
  };

  useEffect(() => {
    if (!userStore.token) {
      clearEvents();
      navigate("/login");
      toast.error("Unauthorized");
    } else {
      loadEvents();
    }
  }, [userStore.token, loadEvents]);

  if (!events) return <LoadingSpinner />;

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
            </TableFilterBar>
            <div className="flex flex-col card-body">
              <div className="table-responsive dashboard-table">
                <Table
                  dialogFlags={dialogFlags}
                  setSelectedId={setDeleteId}
                  exceptColumns={["id"]}
                  data={events ?? []}
                  pageSize={pageSize}
                  rowsPerPageOptions={[10, 25, 50]}
                  routeUrl={all_routes.carDashboard}
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

export default observer(EventList);
