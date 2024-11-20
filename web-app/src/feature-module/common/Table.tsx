import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { formatDateTime, separateCamelCase } from "../../lib/utils";
import { all_routes } from "../router/all_routes";

type Props = {
  data: any[];
  rowsPerPageOptions: number[];
  pageSize?: number;
  status?: ReactNode;
  exceptColumns: string[];
  setSelectedId: (id: string) => void;
  routeUrl: string;
  dialogFlags: any
};

const Table = ({
  data,
  rowsPerPageOptions,
  pageSize,
  status,
  exceptColumns,
  setSelectedId,
  routeUrl,
  dialogFlags,
}: Props) => {
  const action = (rowData: any) => {
    const { id } = rowData;

    return (
      <div className="dropdown dropdown-action">
        <Link
          to="#"
          className="dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fas fa-ellipsis-vertical me-1"></i>
        </Link>
        <div className="dropdown-menu dropdown-menu-end">
          {routeUrl !== all_routes.authorityDashboard && (
            <Link className="dropdown-item" to={`${routeUrl}/view/${id}`}>
              <i className="feather icon-file-plus me-1"></i> View
            </Link>
          )}
          <Link
            className="dropdown-item"
            to="#"
            onClick={() => confirmDialog(id)}
            data-bs-toggle="modal"
            data-bs-target={`#${dialogFlags.deleteDialog} ?? '#delete_dialog'`}
            >
            <i className="feather icon-trash-2 me-1"></i> Delete
          </Link>
          {routeUrl !== all_routes.authorityDashboard &&
            routeUrl !== all_routes.categoryDashboard && (
              <Link className="dropdown-item" to={`${routeUrl}/edit/${id}`}>
                <i className="feather icon-edit me-1"></i> Edit
              </Link>
            )}
          {routeUrl === all_routes.bookingDashboard && (
            <Link
            className="dropdown-item"
            to="#"
            onClick={() => confirmDialog(id)}
            data-bs-toggle="modal"
            data-bs-target={`#${dialogFlags.completeDialog}`}
            >
              <i className="feather icon-trash-2 me-1"></i> Set as Completed
            </Link>
          )}
          {routeUrl === all_routes.bookingDashboard && (
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => confirmDialog(id)}
              data-bs-toggle="modal"
              data-bs-target={`#${dialogFlags.cancelDialog}`}
            >
              <i className="feather icon-trash-2 me-1"></i> Cancel booking
            </Link>
          )}
        </div>
      </div>
    );
  };

  const confirmDialog = (id: string) => {
    setSelectedId(id);
  };

  // Custom function to render nested serviceOptions data
  const renderServiceOptions = (rowData: any) => {
    if (rowData.serviceOptions && rowData.serviceOptions.length > 0) {
      return (
        <div>
          {rowData.serviceOptions.map((option: any, index: number) => (
            <div key={index}>
              <span>{option.name}</span> - <span>{option.additionalFee}</span>
            </div>
          ))}
        </div>
      );
    }
    return <span>No options available</span>;
  };

  if (!data) return <p>Loading...</p>;

  return (
    <DataTable
      className="table datatable"
      value={data}
      rows={pageSize ?? 10}
      rowsPerPageOptions={rowsPerPageOptions}
      currentPageReportTemplate="{first}"
    >
      {data &&
        Object.keys(data[0] || {})
          .filter((key) => !exceptColumns.includes(key)) // Filter out the columns you don't want to display
          .map((key) => (
            <Column
              key={key}
              field={key}
              header={separateCamelCase(key)}
              // Check if the column contains nested data (array or object)
              body={(rowData: any) => {
                if (key === "createDate" || key === "updateDate") {
                  return formatDateTime(rowData[key]); // Render custom for serviceOptions
                }
                return rowData[key]; // Default rendering for other columns
              }}
            />
          ))}

      {status && <Column field="status" header="Status" body={status} />}
      <Column field="action" header="Action" body={action} />
    </DataTable>
  );
};

export default Table;
