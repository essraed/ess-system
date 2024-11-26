import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { Divider } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { TbVip } from "react-icons/tb";

interface Props {
  modalId: string;
}

const ServiceDetailsDialog = ({ modalId }: Props) => {
  // const { t } = useTranslation();
  const {
    serviceStore: { currentService },
  } = useStore();


  return (
    <div
      className="modal new-modal fade"
      id={modalId}
      data-keyboard="false"
      data-backdrop="static"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="max-w-5xl mx-auto m-3 space-y-6">
              {/* Service Information Section */}
              <div className="p-6">
                <div className="flex items-center gap-5 justify-between mb-2">
                  <h3 className="text-2xl font-bold text-gray-800">
                    Service Details
                  </h3>
                </div>
                <Divider />
                <div className="mt-4 grid grid-cols-2 gap-6">
                  {currentService?.name && (
                    <div>
                      <p className="font-medium text-gray-700">Name:</p>
                      <p className="text-gray-600">{currentService?.name}</p>
                    </div>
                  )}
                  {currentService?.description && (
                    <div>
                      <p className="font-medium text-gray-700">Description:</p>
                      <p className="text-gray-600">
                        {currentService?.description}
                      </p>
                    </div>
                  )}
                  {currentService?.rate && (
                    <div>
                      <p className="font-medium text-gray-700">Rate:</p>
                      <p className="text-gray-600">{currentService.rate}</p>
                    </div>
                  )}
                  {currentService?.serviceVipName && (
                    <div>
                      <p className="font-medium text-gray-700">
                        Service VIP Name:
                      </p>
                      <p className="text-gray-600">
                        {currentService?.serviceVipName}
                      </p>
                    </div>
                  )}
                  {currentService?.priceVIP && (
                    <div>
                      <div className="flex flex-row gap-1">
                        <span>
                          <TbVip />
                        </span>
                        <p className="font-medium text-gray-700">Price:</p>
                      </div>
                      <p className="text-gray-600">
                        {currentService?.priceVIP} AED 
                      </p>
                    </div>
                  )}
                  {currentService?.price && (
                    <div>
                      <p className="font-medium text-gray-700">
                        Service Price:
                      </p>
                      <p className="text-gray-600">{currentService?.price} AED</p>
                    </div>
                  )}
                  {currentService?.createDate && (
                    <div>
                      <p className="font-medium text-gray-700">Create Date:</p>
                      <p className="text-gray-600">
                        {currentService?.createDate?.toString()}
                      </p>
                    </div>
                  )}
                  {currentService?.updateDate && (
                    <div>
                      <p className="font-medium text-gray-700">Update Date:</p>
                      <p className="text-gray-600">
                        {currentService.updateDate?.toString()}
                      </p>
                    </div>
                  )}
                  {currentService?.createdBy && (
                    <div>
                      <p className="font-medium text-gray-700">Created By:</p>
                      <p className="text-gray-600">
                        {currentService.createdBy}
                      </p>
                    </div>
                  )}
                  {currentService?.updatedBy && (
                    <div>
                      <p className="font-medium text-gray-700">Updated By:</p>
                      <p className="text-gray-600">
                        {currentService.updatedBy}
                      </p>
                    </div>
                  )}
                  {currentService?.categoryName && (
                    <div>
                      <p className="font-medium text-gray-700">Service:</p>
                      <p className="text-gray-600">
                        {currentService.categoryName}
                      </p>
                    </div>
                  )}
                </div>

                {/* Divider between sections */}
                <Divider className="my-6" />

                {/* Service Options Section as Table */}
                {currentService?.serviceOptions && (
                  <div>
                    <p className="font-medium text-gray-700 mb-2">
                      Service Options Details:
                    </p>
                    <table className="min-w-full table-auto table-sm table-responsive-sm">
                      <thead>
                        <tr>
                          <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-700">
                            Name
                          </th>
                          <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-700">
                            Description
                          </th>
                          <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-700">
                            Fee
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentService.serviceOptions.map((option) => (
                          <tr
                            key={option.id}
                            className="border-b border-gray-300"
                          >
                            <td className="py-2 px-4 border-r border-gray-300 text-gray-600">
                              {option.name}
                            </td>
                            <td className="py-2 px-4 border-r border-gray-300 text-gray-600">
                              {option.description || "N/A"}
                            </td>
                            <td className="py-2 px-4 text-gray-600">
                              {option.additionalFee.toFixed(2)} AED
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
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

export default observer(ServiceDetailsDialog);
