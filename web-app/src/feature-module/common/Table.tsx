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
  const {
    userStore: { isAdmin },
  } = useStore();

  // Action functions for icons in individual columns
  const viewAction = (rowData: any) => {
    const { id } = rowData;
    const { moreDetailsUrl } = rowData;

    return (
      <>
        {/* Modal View Action */}
        {(routeUrl === all_routes.categoryDashboard ||
          routeUrl === all_routes.serviceDashboard ||
          routeUrl === all_routes.lostDashboard ||
          routeUrl === all_routes.ComplaintDashboard ||
          routeUrl === all_routes.contactDashboard) && (
          <Link
            to="#"
            onClick={() => {
              if (getViewId) getViewId(id);
            }}
            data-bs-toggle="modal"
            data-bs-target={`#${routeUrl}`}
          >
            <i className="feather icon-eye text-blue-500 hover:text-blue-700 cursor-pointer"></i>
          </Link>
        )}

        {/* URL View Action */}
        {(routeUrl === all_routes.letterDashboard ||
          routeUrl === all_routes.bookingDashboard) && (
          <Link to={`${routeUrl}/view/${id}`}>
            <i className="feather icon-eye text-blue-500 hover:text-blue-700 cursor-pointer me-1"></i>{" "}
          </Link>
        )}
      </>
    );
  };

  const editAction = (rowData: any) => {
    const { id } = rowData;

    return (
      // Edit action based on conditions
      routeUrl !== all_routes.authorityDashboard &&
      routeUrl !== all_routes.bookingDashboard &&
      routeUrl !== all_routes.categoryDashboard &&
      routeUrl !== all_routes.carDashboard &&
      routeUrl !== all_routes.notificationDashboard &&
      routeUrl !== all_routes.contactDashboard &&
      routeUrl !== all_routes.lostDashboard &&
      routeUrl !== all_routes.ComplaintDashboard &&
      isAdmin() && (
        <Link to={`${routeUrl}/edit/${id}`}>
          <i className="feather icon-edit text-yellow-500 hover:text-yellow-700 cursor-pointer"></i>
        </Link>
      )
    );
  };

  const deleteAction = (rowData: any) => {
    const { id } = rowData;

    return (
      isAdmin() && (
        <Link
          to="#"
          onClick={() => confirmDialog(id)}
          data-bs-toggle="modal"
          data-bs-target={`#${dialogFlags.deleteDialog ?? "delete_dialog"}`}
        >
          <i className="feather icon-trash text-red-500 hover:text-red-700 cursor-pointer"></i>
        </Link>
      )
    );
  };

  const completeAction = (rowData: any) => {
    const { id } = rowData;

    return (
      // Complete action only for Lost and Complaint dashboards
      (routeUrl === all_routes.lostDashboard ||
        routeUrl === all_routes.ComplaintDashboard) && (
        <Link
          to="#"
          onClick={() => confirmDialog(id)}
          data-bs-toggle="modal"
          data-bs-target={`#${dialogFlags.completeDialog}`}
        >
          <i className="feather icon-check-circle text-green-500 font-bold"></i>
        </Link>
      )
    );
  };

  const processAction = (rowData: any) => {
    const { id } = rowData;

    return (
      // In Process action only for Lost and Complaint dashboards
      (routeUrl === all_routes.lostDashboard ||
        routeUrl === all_routes.ComplaintDashboard) && (
        <Link
          to="#"
          onClick={() => confirmDialog(id)}
          data-bs-toggle="modal"
          data-bs-target={`#${dialogFlags.inProocess}`}
        >
          <i className="feather icon-loader text-orange-500 font-bold"></i>
        </Link>
      )
    );
  };
  const bookingdetailsAction = (rowData: any) => {
    const { id } = rowData;
    const { moreDetailsUrl } = rowData;

    return (
      // In Process action only for Lost and Complaint dashboards

      routeUrl === all_routes.notificationDashboard && (
        <Link to={`/listings/${moreDetailsUrl}`}>
          <i className="feather icon-loader text-orange-500 font-bold me-1"></i>{" "}
        </Link>
      )
    );
  };

  // Confirm dialog function
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
                if (key === "isComing") {
                  return rowData[key] ? "Yes" : "No";
                }
                return rowData[key];
              }}
            />
          ))}

      {status && <Column field="status" header="Status" body={status} />}

      {/* Conditionally render the View, Edit, Delete, etc. columns based on routeUrl */}
      {(routeUrl === all_routes.categoryDashboard ||
        routeUrl === all_routes.serviceDashboard ||
        routeUrl === all_routes.lostDashboard ||
        routeUrl === all_routes.ComplaintDashboard ||
        routeUrl === all_routes.bookingDashboard) && (
        <Column header="View" body={viewAction} />
      )}

      {routeUrl !== all_routes.authorityDashboard &&
        routeUrl !== all_routes.categoryDashboard &&
        routeUrl !== all_routes.bookingDashboard &&
        routeUrl !== all_routes.carDashboard &&
        routeUrl !== all_routes.notificationDashboard &&
        routeUrl !== all_routes.contactDashboard &&
        routeUrl !== all_routes.lostDashboard &&
        routeUrl !== all_routes.WorkingTimeDashboard &&
        routeUrl !== all_routes.ComplaintDashboard &&
        routeUrl !== all_routes.blogDashboard &&
        isAdmin() && <Column header="Edit" body={editAction} />}

      {routeUrl !== all_routes.WorkingTimeDashboard &&
        isAdmin() && <Column header="Delete" body={deleteAction} />}
        
      {(routeUrl === all_routes.lostDashboard ||
        routeUrl === all_routes.ComplaintDashboard) && (
        <Column header="Complete" body={completeAction} />
      )}
      {(routeUrl === all_routes.lostDashboard ||
        routeUrl === all_routes.ComplaintDashboard) && (
        <Column header="In Process" body={processAction} />
      )}
      {routeUrl === all_routes.notificationDashboard && isAdmin() && (
        <Column header="Booking Details" body={bookingdetailsAction} />
      )}
    </DataTable>
  );
};

export default observer(Table);
