
import React, { useEffect, useState } from "react";
import Table from "../common/Table";
import { observer } from "mobx-react-lite";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { PagingParams } from "../../types/pagination";
import Paginator from "../common/Paginator";
import { all_routes } from "../router/all_routes";
import { dialogFlags } from "../../constants/constants";
import TableFilterBar from "../common/TableFilterBar";
import LoadingSpinner from "../common/LoadingSpinner";
import UserForm from "./UserForm";

const UserList = () => {
  const navigate = useNavigate();

  const {
    userStore: {
      usersIdName,
      loadUsers,
      setPagingParams,
      pagination,
      setSearchTerm,
    },
    userStore,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize,  setPageSize] = useState(10);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleGetNext = (page: number) => {
    setPagingParams(new PagingParams(page, pageSize));
    loadUsers();
  };

  const handleSearch = () => {
    setSearchTerm(searchQuery);
    setPagingParams(new PagingParams(1, pageSize));
    loadUsers(); // Reload documents with the new search term
  };

  const handleReset = () => {
    setSearchTerm("");
    setSearchQuery("");
    setPagingParams(new PagingParams(1, pageSize));
    loadUsers(); // Reload documents after resetting filters
  };

  // const handleDelete = async () => {
  //   if (deleteId) {
  //     const result = await deleteCar(deleteId);
  //     if (result.status === "success") {
  //       toast.success(result.data);
  //       navigate(all_routes.letterDashboard);
  //     } else {
  //       handleErrors(result.error);
  //     }
  //     loadCars(); // Reload documents after deletion
  //     navigate(location.pathname, { replace: true });
  //   }
  // };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPagingParams(new PagingParams(1, newPageSize));
    loadUsers(); // Reload documents with new page size
  };

  useEffect(() => {
    if (!userStore.isAdmin()) {
      // clearCars();
      navigate("/login");
      toast.error("Unauthorized");
    } else {
      loadUsers();
    }
  }, [userStore.token, loadUsers]);

  if (!usersIdName) return <LoadingSpinner />;

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
              <UserForm />
            </TableFilterBar>
            <div className="flex flex-col card-body">
              <div className="table-responsive dashboard-table">
                <Table
                  dialogFlags={dialogFlags}
                  setSelectedId={setDeleteId}
                  exceptColumns={["id"]}
                  data={usersIdName ?? []}
                  pageSize={pageSize}
                  rowsPerPageOptions={[10, 25, 50]}
                  routeUrl={all_routes.UserDashboard}
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
      {/* <ConfirmDialog modalId={dialogFlags.deleteDialog}
        onConfirm={handleDelete}
        title={t("Confirm Delete")}
        description={`${t("Are you sure you want to delete this")} ${t(
          "car"
        )}${t("?")}`}
      /> */}
    </div>
  );
};

export default observer(UserList);
