

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
import ConfirmDialog from "../common/ConfirmDialog";
import Paginator from "../common/Paginator";
import { Dropdown } from "primereact/dropdown";
import { all_routes } from "../router/all_routes";
import handleErrors from "../../lib/utils";
import AuthorityForm from "./AuthorityForm";

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

  if (!authorities) return <p>Loading...</p>;

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

                          <AuthorityForm />
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
                  exceptColumns={["id", "createDate"]}
                  data={authorities}
                  pageSize={pageSize} // Use pageSize state variable here
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
      <ConfirmDialog
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