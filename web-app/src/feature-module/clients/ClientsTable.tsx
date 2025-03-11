import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import { ClientData, clientStatus } from "../../types/client";
import { useStore } from "../../app/stores/store";
import { Divider, Button, Upload, UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { allowedImageExtension } from "../../constants/constants";
import toast from "react-hot-toast";
import { BookingStatus } from "../../types/booking";

type Props = {
  clients: ClientData[] | null;
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
  email: string; // Make sure to type this properly
  status: BookingStatus;
};

const ClientsTable = ({ clients, setFlag, email, status }: Props) => {
  const { clientStore } = useStore();
  const [allFilesUploaded, setAllFilesUploaded] = useState(false);
  const [uploadingClients, setUploadingClients] = useState<Set<string>>(
    new Set()
  ); // Track uploading clients

  useEffect(() => {
    const fetchClientData = async () => {
      if (clients) {
        const allUploaded = clients.every(
          (client) =>
            (client.fileEntities && client.fileEntities.length > 0) ||
            client.status === clientStatus.Rejected
        );
        setAllFilesUploaded(allUploaded);
        console.log("flag", status);
      }
    };

    fetchClientData();
  }, [clients]);

  const handleFileUpload = async (
    clientId: string,
    fileList: UploadFile<any>[]
  ) => {
    if (uploadingClients.has(clientId)) {
      // If the client is already uploading, skip this upload
      return;
    }

    setUploadingClients((prev) => new Set(prev.add(clientId))); // Mark client as uploading

    const formData = new FormData();

    fileList.forEach((file) => {
      const nativeFile = file.originFileObj;
      if (nativeFile) {
        formData.append("Files", nativeFile);
      }
    });

    const isImage = fileList.some((file) =>
      allowedImageExtension.some((ext) =>
        file.originFileObj!.type.startsWith(ext)
      )
    );

    const directory = isImage ? "seed/image/" : "seed/files/";

    // Append other required parameters to FormData
    formData.append("directory", directory);
    formData.append("entityId", clientId);

    // Log for debugging
    console.log("FormData:", formData);

    try {
      const result = await clientStore.uploadImage(formData);

      if (result.status === "success") {
        toast.success("Files uploaded successfully.");
        setFlag(true); // Update the flag after successful upload
      } else {
        toast.error(`Upload failed:${result.error}`);
      }
    } catch (error) {
      toast.error(`Error uploading files:${error}`);
    } finally {
      setUploadingClients((prev) => {
        const updatedSet = new Set(prev);
        updatedSet.delete(clientId); // Mark client as no longer uploading
        return updatedSet;
      });
    }
  };

  const handleUploadChange = async (
    clientId: string,
    fileList: UploadFile<any>[]
  ) => {
    if (fileList.length > 0) {
      await handleFileUpload(clientId, fileList);
    }
  };

  const handleSendEmail = async () => {
    // Flatten all files from the clients into a single array
    const filesToSend = clients?.flatMap((client) => client.fileEntities || []);

    // Check if there are files to send
    if (!filesToSend || filesToSend.length === 0) {
      console.error("No files to send");
      return;
    }

    // Create the body of the request
    const body = {
      email: email,
      files: filesToSend, // send the array of files
    };

    // Log the body (for debugging purposes)
    console.log("Request Body:", body);

    try {
      const result = await clientStore.sendEmail(body); // Send the body instead of FormData
      if (result.status === "success") {
        toast.success("Email sent successfully");
        setAllFilesUploaded(false);
      } else {
        toast.error(`Error sending email: ${result.error}`);
      }
    } catch (error) {
      toast.error(`Error sending email:${error}`);
    }
  };

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
                    {client.status === clientStatus.Accepted && (
                      <>
                        {/* File Upload for Accepted Clients */}
                        {!(client.fileEntities!.length > 0) ? (
                          <Upload
                            onChange={({ fileList }) =>
                              handleUploadChange(client.id, fileList)
                            }
                            showUploadList={false}
                            accept=".pdf,.docx,.jpg,.png"
                          >
                            <Button
                              icon={<UploadOutlined />}
                              size="small"
                              className="custom-upload-btn"
                            >
                              Upload Files
                            </Button>
                          </Upload>
                        ) : (
                          // Show uploaded files for this client
                          <div className="mt-2">
                            <h4 className="text-sm font-medium text-gray-600">
                              Uploaded Files:
                            </h4>
                            <ul className="list-disc pl-5">
                              {client.fileEntities!.map((file, index) => (
                                <li
                                  key={index}
                                  className="text-sm text-gray-700"
                                >
                                  {file.fileName}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    )}

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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show Send Email button when all files are uploaded */}
      {allFilesUploaded && status === BookingStatus.Completed && (
        <div className="mt-4 text-center">
          <Button
            onClick={handleSendEmail}
            type="primary"
            size="large"
            className="bg-green-500 text-white hover:bg-green-600"
          >
            Send Email to Clients
          </Button>
        </div>
      )}
    </div>
  );
};

export default observer(ClientsTable);
