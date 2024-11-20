import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { all_routes } from "../router/all_routes";
import BackToButton from "../common/BackToButton";
import Breadcrumbs from "../common/breadcrumbs";
import CardDetails from "../common/CardDetails";
import { Button, Card, Divider } from "@nextui-org/react";
import { formatDateTime } from "../../lib/utils";

const ServiceDashboardDetails = () => {
  const { id } = useParams();
  const {
    serviceStore: { currentService, getService },
  } = useStore();

  useEffect(() => {
    if (id) {
      getService(id);
      console.log("service", currentService); // Fetch the service using the id
    }
  }, [getService, id]);

  return (
    <>
      <div className="listing-page">
        <Breadcrumbs title="Details" subtitle="Listings / Services" />
      </div>

      <div className="rounded-none p-10 space-y-4">
        <BackToButton href={all_routes.serviceDashboard} label="Back To Services" />

        <div className="max-w-5xl mx-auto m-3 space-y-6">
          <Card className="p-6 shadow-md border border-gray-200">
            {/* Service Information Section */}
            <div className="flex items-center gap-5 justify-between mb-2">
              <h3 className="text-2xl font-bold text-gray-800">Service Information</h3>
              {currentService?.price && (
                <div className="flex items-center gap-2 px-4 py-2 border rounded">
                  <p className="text-red-600 font-semibold text-xl">
                    {currentService.price} AED
                  </p>
                </div>
              )}
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
                  <p className="text-gray-600">{currentService?.description}</p>
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
                  <p className="font-medium text-gray-700">Service VIP Name:</p>
                  <p className="text-gray-600">{currentService?.serviceVipName}</p>
                </div>
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-6">
              {currentService?.priceVIP && (
                <div>
                  <p className="font-medium text-gray-700">VIP Price:</p>
                  <p className="text-gray-600">{currentService?.priceVIP} AED</p>
                </div>
              )}
              {currentService?.createDate && (
                <div>
                  <p className="font-medium text-gray-700">Create Date:</p>
                  <p className="text-gray-600">
                    {formatDateTime(currentService?.createDate?.toString())}
                  </p>
                </div>
              )}
              {currentService?.updateDate && (
                <div>
                  <p className="font-medium text-gray-700">Update Date:</p>
                  <p className="text-gray-600">
                    {formatDateTime(currentService.updateDate?.toString())}
                  </p>
                </div>
              )}
              {currentService?.createdBy && (
                <div>
                  <p className="font-medium text-gray-700">Created By:</p>
                  <p className="text-gray-600">{currentService.createdBy}</p>
                </div>
              )}
              {currentService?.updatedBy && (
                <div>
                  <p className="font-medium text-gray-700">Updated By:</p>
                  <p className="text-gray-600">{currentService.updatedBy}</p>
                </div>
              )}
              {currentService?.categoryName && (
                <div>
                  <p className="font-medium text-gray-700">Service:</p>
                  <p className="text-gray-600">{currentService.categoryName}</p>
                </div>
              )}

              {/* Service Options Section */}
              {currentService?.serviceOptions && (
                <div>
                  <p className="font-medium text-gray-700">Service Options:</p>
                  <ul className="text-gray-600 list-disc pl-5">
                    {currentService.serviceOptions.map((option) => (
                      <li key={option.id} className="mb-2">
                        <p className="font-semibold">{option.name}</p>
                        {option.description && (
                          <p className="text-sm text-gray-500">{option.description}</p>
                        )}
                        <p className="text-sm text-gray-700">
                          Additional Fee: {option.additionalFee.toFixed(2)} AED
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Confirm Button */}
            <Button color="primary" className="mt-8 w-full" size="lg">
              Confirm Details
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
};

export default observer(ServiceDashboardDetails);
