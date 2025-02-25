import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { useDropzone } from "react-dropzone";
import { observer } from "mobx-react-lite";
import { allowedImageExtension } from "../../constants/constants";
import { ServiceData } from "../../types/service";
import Footer from "../common/footer";
import Header from "../common/header";
import LoadingSpinner from "../common/LoadingSpinner";

const BookingDocument = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File }>(
    {}
  );
  const [service, setService] = useState<ServiceData | null>(null);

  const {
    bookingStore: { uploadImage, getBooking, currentBooking },
    serviceStore: { getService },
  } = useStore();

  if (!id) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center text-red-600 text-lg font-semibold">
          Error: No booking ID found
        </div>
      </div>
    );
  }

  const handleUploadComplete = () => setIsUploadComplete(true);

  useEffect(() => {
    const fetchBooking = async () => {
      if (!id) return;
      const booking = await getBooking(id); // Wait for booking to be fetched
      if (booking?.serviceId) {
        getService(booking.serviceId).then((servicee) => {
          if (servicee) setService(servicee);
        });
      }
    };

    fetchBooking();
  }, [id]);

  // Handle file drop
  const onDrop = (acceptedFiles: File[]) => {
    setUploadedFiles((prevFiles) => ({
      ...prevFiles,
      ...Object.fromEntries(acceptedFiles.map((file) => [file.name, file])),
    }));
  };

  // Remove file
  const removeFile = (fileName: string) => {
    setUploadedFiles((prevFiles) => {
      const updatedFiles = { ...prevFiles };
      delete updatedFiles[fileName];
      return updatedFiles;
    });
  };

  // Use react-dropzone hook
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
  });

  const handleFileSubmit = async () => {
    const formData = new FormData();

    Object.values(uploadedFiles).forEach((file) => {
      formData.append("Files", file);
    });

    const isImage = Object.values(uploadedFiles).some((file) =>
      allowedImageExtension.some((ext) => file.type.startsWith(ext))
    );
    const directory = isImage ? "seed/image/" : "seed/files/";

    formData.append("directory", directory);
    formData.append("entityId", currentBooking!.id);

    const result = await uploadImage(formData);

    if (result.status === "success") {
      handleUploadComplete();
    } else {
      console.error(result.error);
    }
  };

  useEffect(() => {
    if (isUploadComplete) navigate(`/listings/booking/view/${id}`);
  }, [isUploadComplete, id, navigate]);

  if (!service || !service.requiredFiles) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center bg-gray-50 lg:py-5 w-fu">
        <div className="bg-white p-8 w-full max-w-4xl text-center border border-y-pink-100">
          <h2 className="text-large md:text-3xl font-bold text-blue-600 mb-4">
            Upload Booking Documents
          </h2>
          <p className="text-gray-700 text-md mb-6">
            Please upload the necessary documents
            {/* <span className="font-semibold text-gray-900">
              {" "}
              Booking ID: {id}{" "}
            </span> */}
          </p>

          {service.requiredFiles.length > 0 ? (
            <div className="space-y-4">
              {service.requiredFiles.map((fileName, index) => (
                <div
                  key={index}
                  className="flex flex-wrap md:flex-nowrap items-center justify-between bg-white p-2 border border-gray-200"
                >
                  {/* File Name */}
                  <p className="text-gray-700 text-md font-semibold w-full md:w-1/4 text-center md:text-left">
                    {fileName}
                  </p>

                  {/* Upload Box */}
                  <div
                    {...getRootProps()}
                    className="flex-1 border-2 border-dashed border-gray-400 p-2 cursor-pointer hover:border-blue-500 transition-all rounded-lg flex items-center justify-center text-center"
                  >
                    <input {...getInputProps()} />
                    <p className="text-gray-500 text-sm">
                      Drag & drop {fileName} here
                    </p>
                  </div>

                  {/* Uploaded File Info */}
                  {uploadedFiles[fileName] && (
                    <p className="text-green-600 text-sm mt-2 md:mt-0 w-full md:w-auto text-center md:text-left">
                      Uploaded: {uploadedFiles[fileName]?.name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">
              No required files for upload
            </p>
          )}

          {Object.keys(uploadedFiles).length > 0 && (
            <div className="mt-6 text-left">
              <h3 className="font-semibold text-gray-600">Uploaded Files:</h3>
              <ul className="list-disc pl-6">
                {Object.entries(uploadedFiles).map(
                  ([fileName, file], index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center text-gray-600"
                    >
                      {file.name}
                      <button
                        onClick={() => removeFile(fileName)}
                        className="text-red-500 ml-4 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          <div className="flex justify-center mt-6">
            <button
              onClick={handleFileSubmit}
              className="bg-blue-600 text-white px-2 py-1 rounded-lg text-sm d:text-lg hover:bg-blue-700 transition-all"

            >
              Submit Documents
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default observer(BookingDocument);
