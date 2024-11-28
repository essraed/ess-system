

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
import AuthorityForm from "./AuthorityForm";
import { dialogFlags } from "../../constants/constants";
import TableFilterBar from "../common/TableFilterBar";
import LoadingSpinner from "../common/LoadingSpinner";

const AuthorityList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    authorityStore: {
      authorities,
      loadAuthorities,
      setPagingParams,
      pagination,
      setSearchTerm,
      deleteAuthority,
      clearAuthorities
    },
    userStore,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleGetNext = (page: number) => {
    setPagingParams(new PagingParams(page, pageSize));
    loadAuthorities();
  };

  const handleSearch = () => {
    setSearchTerm(searchQuery);
    setPagingParams(new PagingParams(1, pageSize));
    loadAuthorities(); // Reload documents with the new search term
  };

  const handleReset = () => {
    setSearchTerm("");
    setSearchQuery("");
    setPagingParams(new PagingParams(1, pageSize));
    loadAuthorities(); // Reload documents after resetting filters
  };

  const handleDelete = async () => {
    if (deleteId) {
      const result = await deleteAuthority(deleteId);
      if (result.status === "success") {
        toast.success(result.data);
        navigate(all_routes.letterDashboard);
      } else {
        handleErrors(result.error);
      }
      loadAuthorities(); // Reload documents after deletion
      navigate(location.pathname, { replace: true });
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPagingParams(new PagingParams(1, newPageSize));
    loadAuthorities(); // Reload documents with new page size
  };

  useEffect(() => {
    if (!userStore.token) {
      clearAuthorities();
      navigate("/login");
      toast.error("Unauthorized");
    } else {
      loadAuthorities();
    }
  }, [userStore.token, loadAuthorities]);

  if (!authorities) return <LoadingSpinner />;
  
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
              <AuthorityForm />
            </TableFilterBar>
            <div className="flex flex-col card-body">
              <div className="table-responsive dashboard-table">
                <Table

                  dialogFlags={dialogFlags}
                  setSelectedId={setDeleteId}
                  exceptColumns={["id"]}
                  data={authorities}
                  pageSize={pageSize}
                  rowsPerPageOptions={[10, 25, 50]}
                  routeUrl={all_routes.authorityDashboard}
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
        title={t("Confirm Delete")}
        description={`${t("Are you sure you want to delete this")} ${t(
          "authority"
        )}${t("?")}`}
      />
    </div>
  );
};

export default observer(AuthorityList);
