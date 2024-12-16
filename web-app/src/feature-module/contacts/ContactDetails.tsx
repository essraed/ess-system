import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { Divider } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { formatDateTime } from "../../lib/utils";
import LoadingSpinner from "../common/LoadingSpinner";

interface Props {
  modalId: string;
}

const ContactDetails = ({ modalId }: Props) => {
  const {
    contactStore: { currentContact },
  } = useStore();

  if (!currentContact) return <LoadingSpinner/>;

  return (
    <div
      className="modal new-modal fade"
      id={modalId}
      data-keyboard="false"
      data-backdrop="static"
    >
      <div className="modal-dialog modal-dialog-centered z-50">
        <div className="modal-content">
          <div className="modal-body">
            <div className="max-w-5xl mx-auto m-3 space-y-6">
              {/* Header Section */}
              <div className="p-6">
                <div className="flex items-center gap-5 justify-between mb-2">
                  <h3 className="text-2xl font-bold text-gray-800">
                    Contact Details
                  </h3>
                </div>
                <Divider />

                {/* Contact Details */}
                <div className="mt-4 grid grid-cols-2 gap-6">
                  {/* Render fields conditionally */}
                  {currentContact.name && (
                    <div>
                      <p className="font-medium text-gray-700">Name:</p>
                      <p className="text-gray-600 break-words">
                        {currentContact.name}
                      </p>
                    </div>
                  )}
                  {currentContact.phone && (
                    <div>
                      <p className="font-medium text-gray-700">Phone:</p>
                      <p className="text-gray-600 break-words">
                        {currentContact.phone}
                      </p>
                    </div>
                  )}
                  {currentContact.email && (
                    <div>
                      <p className="font-medium text-gray-700">Email:</p>
                      <p className="text-gray-600 break-words">
                        {currentContact.email}
                      </p>
                    </div>
                  )}
                  {currentContact.enquiryType !== null && (
                    <div>
                      <p className="font-medium text-gray-700">Enquiry Type:</p>
                      <p className="text-gray-600 break-words">
                        {currentContact.enquiryType
                          ? "Business Setup"
                          : "General Enquiry"}
                      </p>
                    </div>
                  )}
                  {currentContact.licenseType && (
                    <div>
                      <p className="font-medium text-gray-700">License Type:</p>
                      <p className="text-gray-600 break-words">
                        {currentContact.licenseType}
                      </p>
                    </div>
                  )}

                  {currentContact.ejari !== null && (
                    <div>
                      <p className="font-medium text-gray-700">Ejari:</p>
                      <p className="text-gray-600 break-words">
                        {currentContact.ejari === true ? "Yes" : "No"}
                      </p>
                    </div>
                  )}

                  {currentContact.localAgent !== null && (
                    <div>
                      <p className="font-medium text-gray-700">Local Agent:</p>
                      <p className="text-gray-600 break-words">
                        {currentContact.localAgent === true ? "Yes" : "No"}
                      </p>
                    </div>
                  )}

                  {currentContact.createDate && (
                    <div>
                      <p className="font-medium text-gray-700">Create Date:</p>
                      <p className="text-gray-600 break-words">
                        {currentContact.createDate}
                      </p>
                    </div>
                  )}
                  {currentContact.message && (
                    <div className="col-span-2">
                      <p className="font-medium text-gray-700">Message:</p>
                      <div className="text-gray-600 break-words max-h-48 overflow-auto">
                        {currentContact.message}
                      </div>
                    </div>
                  )}
                </div>
                <Divider />
              </div>

              {/* Close Button */}
              <div className="flex justify-center mt-4">
                <Link
                  to="#"
                  data-bs-dismiss="modal"
                  className="btn btn-primary"
                >
                  Close
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(ContactDetails);
