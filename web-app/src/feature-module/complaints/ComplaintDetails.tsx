import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { Divider } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import StatusBadge from "../common/StatusBadge";
import { formatDateTime } from "../../lib/utils";

interface Props {
  modalId: string;
}

const ComplaintDetails = ({ modalId }: Props) => {
  const {
    complaintStore: { currentComplaint },
  } = useStore();

  // if (!currentComplaint) return <LoadingSpinner/>;

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
                    Complaint Details
                  </h3>
                </div>
                <Divider />

                {/* Contact Details */}
                <div className="mt-4 grid grid-cols-2 gap-6">
                  {/* Render fields conditionally */}
                  {currentComplaint?.name && (
                    <div>
                      <p className="font-medium text-gray-700">Name:</p>
                      <p className="text-gray-600 break-words">
                        {currentComplaint.name}
                      </p>
                    </div>
                  )}
                  {currentComplaint?.phone && (
                    <div>
                      <p className="font-medium text-gray-700">Phone:</p>
                      <p className="text-gray-600 break-words">
                        {currentComplaint.phone}
                      </p>
                    </div>
                  )}
                  {currentComplaint?.email && (
                    <div>
                      <p className="font-medium text-gray-700">Email:</p>
                      <p className="text-gray-600 break-words">
                        {currentComplaint.email}
                      </p>
                    </div>
                  )}
                  {currentComplaint?.department && (
                    <div>
                      <p className="font-medium text-gray-700">Department:</p>
                      <p className="text-gray-600 break-words">
                        {currentComplaint.department}
                      </p>
                    </div>
                  )}
                  {currentComplaint?.isComplaint && currentComplaint?.status && (
                    <div>
                      <p className="font-medium text-gray-700">Status:</p>
                      <StatusBadge status={currentComplaint.status.toString()} />
                    </div>
                  )}
                   {currentComplaint?.remarks && (
                    <div>
                      <p className="font-medium text-gray-700">Remarks:</p>
                      <p className="text-gray-600 break-words whitespace-pre-line">
                        {currentComplaint.remarks}
                      </p>
                    </div>
                  )}
                  {currentComplaint?.isComplaint? (
                    <div>
                      <p className="font-medium text-gray-700">Type:</p>
                      <p className="text-gray-600 break-words">
                        Complaint
                      </p>
                    </div>
                  ):(<div>
                    <p className="font-medium text-gray-700">Type:</p>
                    <p className="text-gray-600 break-words">
                      Suggestion
                    </p>
                  </div>)}
                  {currentComplaint?.createDate && (
                    <div>
                      <p className="font-medium text-gray-700">Create Date:</p>
                      <p className="text-gray-600 break-words">
                        {currentComplaint.createDate}
                      </p>
                    </div>
                  )}
                  {currentComplaint?.createdBy && (
                    <div>
                      <p className="font-medium text-gray-700">Create By:</p>
                      <p className="text-gray-600 break-words">
                        {currentComplaint.createdBy}
                      </p>
                    </div>
                  )}
                  {currentComplaint?.updateDate && (
                    <div>
                      <p className="font-medium text-gray-700">Update Date:</p>
                      <p className="text-gray-600 break-words">
                        {currentComplaint.updateDate}
                      </p>
                    </div>
                  )}
                  {currentComplaint?.updatedBy && (
                    <div>
                      <p className="font-medium text-gray-700">Update By:</p>
                      <p className="text-gray-600 break-words">
                        {currentComplaint.updatedBy}
                      </p>
                    </div>
                  )}
                  {currentComplaint?.comments && (
                    <div className="col-span-2">
                      <p className="font-medium text-gray-700">Comments:</p>
                      <div className="text-gray-600 break-words max-h-48 overflow-auto">
                        {currentComplaint.comments}
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

export default observer(ComplaintDetails);
