import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { ClientData, clientStatus } from "../../types/client";
import { useStore } from "../../app/stores/store";
import { Divider } from "antd";
import { useParams } from "react-router-dom";

type Props = {
  clients: ClientData[] | null;
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

const ClientsTable = ({ clients, setFlag }: Props) => {
  const { clientStore, bookingStore } = useStore();
  const { id } = useParams();

  // Handle file upload state
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  // const handleFileUpload = (clientId: string) => {
  //   if (uploadFile) {
  //     // Implement the file upload logic here
  //     console.log("Uploading file for client:", clientId);
  //     // You can create a function in the `clientStore` to handle the file upload.
  //     clientStore.uploadFile(clientId, uploadFile);
  //     setFlag(true);
  //   } else {
  //     console.log("No file selected.");
  //   }
  // };

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
              <th className="px-4 py-2 text-center">Actions</th>
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
                  <div className="flex justify-center space-x-2">
                    {/* Actions based on status */}
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
                          Approve
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
                      <>
                        {/* Show Upload File Button */}
                        <div>
                          <input
                            type="file"
                            onChange={(e) => {
                              if (e.target.files) {
                                setUploadFile(e.target.files[0]);
                              }
                            }}
                            className="px-4 py-2 text-sm border rounded-lg"
                          />
                          <button
                           
                            className="ml-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600"
                          >
                            Upload File
                          </button>
                        </div>

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
                      </>
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