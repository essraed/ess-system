import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { separateCamelCase } from "../../lib/utils";
import { all_routes } from "../router/all_routes";
import StatusBadge from "./StatusBadge";

type Props = {
  data: any[];
  rowsPerPageOptions: number[];
  pageSize?: number;
  status?: ReactNode;
  exceptColumns: string[];
  setSelectedId?: (id: string) => void;
  routeUrl: string;
  dialogFlags: any;
  getViewId?: (id: string) => void

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
  getViewId,
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
          {(routeUrl === all_routes.categoryDashboard || routeUrl === all_routes.serviceDashboard || routeUrl === all_routes.contactDashboard ) && (
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => {
                if (getViewId) getViewId(id)
              }}
              data-bs-toggle="modal"
              data-bs-target={`#${routeUrl}`}
            >
              <i className="feather icon-file-plus me-1"></i> View
            </Link>
          )}

          {(routeUrl === all_routes.letterDashboard || routeUrl === all_routes.bookingDashboard) && (
            <Link className="dropdown-item" to={`${routeUrl}/view/${id}`}>
              <i className="feather icon-file-plus me-1"></i> View
            </Link>
          )}

          <Link
            className="dropdown-item"
            to="#"
            onClick={() => confirmDialog(id)}
            data-bs-toggle="modal"
            data-bs-target={`#${dialogFlags.deleteDialog ?? "delete_dialog"}`}
          >
            <i className="feather icon-trash-2 me-1"></i> Delete
          </Link>
          {routeUrl !== all_routes.authorityDashboard &&
            routeUrl !== all_routes.categoryDashboard &&
            routeUrl !== all_routes.carDashboard &&
            routeUrl !== all_routes.notificationDashboard &&
            routeUrl !== all_routes.contactDashboard &&
            routeUrl !== all_routes.bookingDashboard && (

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
              <i className="feather icon-trash-2 me-1"></i> Set as Cmoplete
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
    if(setSelectedId) setSelectedId(id);
  };

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
          .filter((key) => !exceptColumns.includes(key))
          .map((key) => (
            <Column
              key={key}
              field={key}
              header={separateCamelCase(key)}

              body={(rowData: any) => {
                if (key === "bookingStatus") {
                  return <StatusBadge status={rowData[key]} />;
                }
                return rowData[key];
              }}
            />
          ))}

      {status && <Column field="status" header="Status" body={status} />}

      {routeUrl !== all_routes.WorkingTimeDashboard && (
        <Column field="action" header="Action" body={action} />
      )}
    </DataTable>
  );
};

export default Table;
