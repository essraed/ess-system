import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { ClientData, clientStatus } from "../../types/client";
import { useStore } from "../../app/stores/store";
import { Divider } from "antd";
import { useParams } from "react-router-dom";

type Props = {
  clients: ClientData[] | null;
  setFlag: React.Dispatch<React.SetStateAction<boolean>>; // Make sure to type this properly
};

const ClientsTable = ({ clients, setFlag }: Props) => {
  const { clientStore, bookingStore } = useStore();
  const { id } = useParams();

  return (
    <div className="p-4 my- w-full border rounded-lg bg-gray-50">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Clients Information
      </h2>
      <Divider />
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Passport Number</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-center">Actions</th>{" "}
              {/* Centered header */}
            </tr>
          </thead>
          <tbody>
            {clients?.map((client: ClientData, index: number) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{client.name}</td>
                <td className="px-4 py-2">{client.passportNumber}</td>
                <td className="px-4 py-2">
                  {client.status === clientStatus.Pending
                    ? "Pending"
                    : client.status === clientStatus.InProcess
                      ? "In Process"
                      : client.status === clientStatus.Accepted
                        ? "Accepted"
                        : "Rejected"}
                </td>
                <td className="px-4 py-2 text-center">
                  {" "}
                  {/* Center the actions in the row */}
                  <div className="flex justify-center space-x-2">
                    {" "}
                    {/* Center buttons horizontally */}
                    {/* Conditional rendering based on current status */}
                    {client.status === clientStatus.Pending && (
                      <>
                        <button
                          onClick={() => {
                            clientStore.setStatusInProcess(client.id);
                            setFlag(true);
                          }}
                          className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg shadow hover:bg-green-600"
                        >
                          In-Process
                        </button>
                        <button
                          onClick={() => {
                            clientStore.setStatusRejected(client.id);
                            setFlag(true);
                          }}
                          className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg shadow hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {client.status === clientStatus.InProcess && (
                      <>
                        <button
                          onClick={() => {
                            clientStore.setStatusAccepted(client.id);
                            setFlag(true);
                          }}
                          className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg shadow hover:bg-green-600"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => {
                            clientStore.setStatusRejected(client.id);
                            setFlag(true);
                          }}
                          className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg shadow hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {client.status === clientStatus.Accepted && (
                      <button
                        onClick={() => {
                          clientStore.setStatusRejected(client.id);
                          bookingStore.getBooking(id ?? "");
                          setFlag(true);
                        }}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg shadow hover:bg-red-600"
                      >
                        Reject
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default observer(ClientsTable);
