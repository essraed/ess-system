import React, { useEffect, useState } from "react";
import Table from "../common/Table";
import { Button } from "@nextui-org/react";
import { GrPowerReset } from "react-icons/gr";
import { observer } from "mobx-react-lite";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { PagingParams } from "../../types/pagination";
import ConfirmDialog from "../common/ConfirmDialog";
import Paginator from "../common/Paginator";
import { Dropdown } from "primereact/dropdown";
import { IoMdAddCircleOutline } from "react-icons/io";
import { all_routes } from "../router/all_routes";

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

  if (!documents) return <p>Loading...</p>;

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
                          <li>
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
                  
                  setDeleteId={setDeleteId}
                  exceptColumns={["id", "aiResult", "createDate"]}
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
      <ConfirmDialog
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