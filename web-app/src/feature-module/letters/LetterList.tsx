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
import { IoMdAddCircleOutline } from "react-icons/io";
import { all_routes } from "../router/all_routes";
import { dialogFlags } from "../../constants/constants";
import TableFilterBar from "../common/TableFilterBar";
import LoadingSpinner from "../common/LoadingSpinner";

const LetterList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    documentStore: {
      documents,
      loadDocuments,
      setPagingParams,
      pagination,
      setSearchTerm,
      deleteDocument,
      clearDocuments,
      setDateFilter,
      setSelectedAuthority,
      setSelectedUser,
    },
    userStore,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleGetNext = (page: number) => {
    setPagingParams(new PagingParams(page, pageSize));
    loadDocuments();
  };

  const handleSearch = () => {

    console.log('handlesearch', searchQuery);

    setSearchTerm(searchQuery);
    setPagingParams(new PagingParams(1, pageSize));
    loadDocuments();
  };

  const handleReset = () => {
    setSearchTerm("");
    setSearchQuery("");
    setDateFilter("", "");
    setSelectedAuthority("");
    setSelectedUser("");
    setPagingParams(new PagingParams(1, pageSize));
    loadDocuments(); // Reload documents after resetting filters
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteDocument(deleteId);
      loadDocuments(); // Reload documents after deletion
      navigate(location.pathname, { replace: true });
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    console.log("newPageSize: ", newPageSize);

    setPageSize(newPageSize);
    setPagingParams(new PagingParams(1, newPageSize));
    loadDocuments(); // Reload documents with new page size
  };

  useEffect(() => {
    if (!userStore.token) {
      clearDocuments();
      navigate("/login");
      toast.error("Unauthorized");
    } else {
      loadDocuments();
    }
  }, [userStore.token, loadDocuments]);

  if (!documents) return <LoadingSpinner />;

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

              <div
                className="view-all text-center aos-init aos-animate"
                data-aos="fade-down"
              >
                <Link
                  to={all_routes.letterCreate}
                  className="btn btn-view-custom d-inline-flex align-items-center"
                >
                  <span>
                    <IoMdAddCircleOutline
                      size={24}
                      className=""
                    />
                  </span>
                </Link>
              </div>

            </TableFilterBar>





            <div className="flex flex-col card-body">
              <div className="table-responsive dashboard-table">
                <Table
                  dialogFlags={dialogFlags}
                  setSelectedId={setDeleteId}
                  exceptColumns={["id", "aiResult"]}
                  data={documents}
                  pageSize={pageSize} // Use pageSize state variable here
                  rowsPerPageOptions={[10, 25, 50]}
                  routeUrl={all_routes.letterDashboard}
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
          "document"
        )}${t("?")}`}
      />
    </div>
  );
};

export default observer(LetterList);
