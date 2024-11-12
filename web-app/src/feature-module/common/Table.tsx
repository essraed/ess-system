import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { separateCamelCase } from "../../lib/utils";
import { all_routes } from "../router/all_routes";

type Props = {
  data: any[];
  rowsPerPageOptions: number[];
  pageSize?: number;
  status?: ReactNode;
  exceptColumns: string[];
  setDeleteId: (id: string) => void;
  routeUrl: string;
};

const Table = ({
  data,
  rowsPerPageOptions,
  pageSize,
  status,
  exceptColumns,
  setDeleteId,
  routeUrl,
}: Props) => {
  const action = (rowData: any) => {
    const { id, brief } = rowData;

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
            <Link
              className="dropdown-item"
              to={`${routeUrl}/view/${id}`}
              // data-bs-toggle="modal"
              // data-bs-target="#view_invoice"
            >
              <i className="feather icon-file-plus me-1"></i> View
            </Link>
          )}
          <Link
            className="dropdown-item"
            to="#"
            onClick={() => confirmDelete(id)} // Use ID in delete handler
            data-bs-toggle="modal"
            data-bs-target="#delete_account"
          >
            <i className="feather icon-trash-2 me-1"></i> Delete
          </Link>
          {routeUrl !== all_routes.authorityDashboard && (
            <Link
              className="dropdown-item"
              to={`${routeUrl}/edit/${id}`}
              // data-bs-toggle="modal"
              // data-bs-target="#edit_modal"
            >
              <i className="feather icon-edit me-1"></i> Edit
            </Link>
          )}
        </div>
      </div>
    );
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
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
          .filter((key) => !exceptColumns.includes(key)) // Filter out the "id" column
          .map((key) => (
            <Column
              key={key}
              field={key}
              header={separateCamelCase(key)}
            ></Column>
          ))}

      {status && <Column field="status" header="Status" body={status}></Column>}
      <Column field="action" header="Action" body={action}></Column>
    </DataTable>
  );
};

export default Table;
