import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { separateCamelCase } from "../../lib/utils";
import { all_routes } from "../router/all_routes";
import StatusBadge from "./StatusBadge";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

type Props = {
  data: any[];
  rowsPerPageOptions: number[];
  pageSize?: number;
  status?: ReactNode;
  exceptColumns: string[];
  setSelectedId?: (id: string) => void;
  routeUrl: string;
  dialogFlags: any;
  getViewId?: (id: string) => void;
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
    const { moreDetailsUrl } = rowData;
    const {
      userStore: { isAdmin },
    } = useStore();

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
          {(routeUrl === all_routes.categoryDashboard ||
            routeUrl === all_routes.serviceDashboard ||
            routeUrl === all_routes.lostDashboard ||
            routeUrl === all_routes.ComplaintDashboard ||
            routeUrl === all_routes.contactDashboard) && (
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => {
                if (getViewId) getViewId(id);
              }}
              data-bs-toggle="modal"
              data-bs-target={`#${routeUrl}`}
            >
              <i className="feather icon-eye text-blue-500 hover:text-blue-700 cursor-pointer me-1"></i>{" "}
              View
            </Link>
          )}

          {(routeUrl === all_routes.letterDashboard ||
            routeUrl === all_routes.bookingDashboard) && (
            <Link className="dropdown-item" to={`${routeUrl}/view/${id}`}>
              <i className="feather icon-eye text-blue-500 hover:text-blue-700 cursor-pointer me-1"></i>{" "}
              View
            </Link>
          )}

          {isAdmin() && (
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => confirmDialog(id)}
              data-bs-toggle="modal"
              data-bs-target={`#${dialogFlags.deleteDialog ?? "delete_dialog"}`}
            >
              <i className="feather icon-trash text-red-500 hover:text-red-700 cursor-pointer me-1"></i>{" "}
              Delete
            </Link>
          )}
          {routeUrl !== all_routes.authorityDashboard &&
            routeUrl !== all_routes.categoryDashboard &&
            routeUrl !== all_routes.carDashboard &&
            routeUrl !== all_routes.notificationDashboard &&
            routeUrl !== all_routes.contactDashboard &&
            routeUrl !== all_routes.lostDashboard &&
            routeUrl !== all_routes.ComplaintDashboard &&
            routeUrl !== all_routes.bookingDashboard &&
            isAdmin() && (
              <Link className="dropdown-item" to={`${routeUrl}/edit/${id}`}>
                <i className="feather icon-edit text-yellow-500 hover:text-yellow-700 cursor-pointer me-1"></i>{" "}
                Edit
              </Link>
            )}
          {(routeUrl === all_routes.lostDashboard ||
            routeUrl === all_routes.ComplaintDashboard) && (
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => confirmDialog(id)}
              data-bs-toggle="modal"
              data-bs-target={`#${dialogFlags.completeDialog}`}
            >
              <i className="feather icon-check-circle text-green-500 font-bold me-1"></i>{" "}
              Set as Cmoplete
            </Link>
          )}
          {/* {routeUrl === all_routes.bookingDashboard && (
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => confirmDialog(id)}
              data-bs-toggle="modal"
              data-bs-target={`#${dialogFlags.cancelDialog}`}
            >
              <i className="feather icon-trash-2 me-1"></i> Cancel booking
            </Link>
          )} */}
          {(routeUrl === all_routes.lostDashboard ||
            routeUrl === all_routes.ComplaintDashboard) && (
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target={`#${dialogFlags.inProocess}`}
              onClick={() => confirmDialog(id)}
            >
              <i className="feather icon-loader text-orange-500 font-bold me-1"></i>{" "}
              Set as InProcess
            </Link>
          )}
          {routeUrl === all_routes.notificationDashboard && (
            <Link className="dropdown-item" to={`/listings/${moreDetailsUrl}`}>
              <i className="feather icon-loader text-orange-500 font-bold me-1"></i>{" "}
              Booking Details
            </Link>
          )}
        </div>
      </div>
    );
  };

  const confirmDialog = (id: string) => {
    if (setSelectedId) setSelectedId(id);
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
                if (key === "enquiryType") {
                  return rowData[key] ? "Business Setup" : "General Contact";
                }
                if (key === "email") {
                  return rowData[key] ? rowData[key] : "No Data";
                }
                if (key === "isComplaint") {
                  return rowData[key] ? "Complaint" : "Suggestion";
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

export default observer(Table);
