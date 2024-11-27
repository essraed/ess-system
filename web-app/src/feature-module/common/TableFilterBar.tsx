import React, { ReactNode } from "react";
import { Dropdown } from "primereact/dropdown";
import { Input, Button } from "@nextui-org/react";
import { GrPowerReset } from "react-icons/gr";
import { PaginationData } from "../../types/pagination";
import { pageSizeOptions } from "../../constants/constants";

type Props = {
    pagination: PaginationData | null;
    pageSize?: number | null;
    handlePageSizeChange?: (newPageSize: number) => void;
    searchQuery?: string;
    setSearchQuery?: (query: string) => void;
    handleSearch?: () => void; 
    handleReset: () => void; 
    children?: ReactNode; 
};

const TableFilterBar = ({
    pagination,
    pageSize,
    handlePageSizeChange,
    searchQuery = "", // Default to empty string if not provided
    setSearchQuery,
    handleSearch,
    handleReset,
    children,
}: Props) => {
    return (
        <div className="card-header">
            {/* Filters */}
            <div className="product-filter-group">
                <div className="sortbyset">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                        {/* Pagination Info */}
                        <div className="flex flex-wrap items-center gap-3">
                            <div>
                                {pagination && pageSize && (
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

                            {/* Page Size Dropdown */}
                            {handlePageSizeChange && (<div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-700">Show:</span>
                                <Dropdown
                                    value={pageSize}
                                    onChange={(e) => handlePageSizeChange(Number(e.value.name))}
                                    options={pageSizeOptions}
                                    optionLabel="name"
                                    placeholder={String(pageSize)}
                                    className="sm:min-w-[100px] min-w-[155px]"
                                />
                            </div>)}
                        </div>

                        {/* Filter Bar */}
                        <div className="flex flex-wrap items-center gap-3">
                            {/* Search Input */}
                            {setSearchQuery && handleSearch && (
                                <Input
                                    radius="sm"
                                    type="search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSearch();
                                        }
                                    }}
                                    placeholder="Search"
                                    className="flex-1 min-w-[200px] sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900"
                                />
                            )}

                            {/* Reset Button */}
                            <Button
                                onClick={handleReset}
                                variant="bordered"
                                className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 border rounded-md hover:bg-gray-100 transition"
                            >
                                Reset <GrPowerReset size={20} />
                            </Button>

                            {/* Additional Children */}
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableFilterBar;
