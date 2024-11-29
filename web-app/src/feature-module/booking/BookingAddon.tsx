import React, { useState } from "react";
import { ServiceData } from "../../types/service";
import { Button } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { color } from "framer-motion";

type Props = {
  serviceData: ServiceData;
  selectedServiceOptionsId: string | undefined;
  handleServiceOptions: (serviceId: string, fee: number) => void;
};

const BookingAddon = ({
  serviceData,
  selectedServiceOptionsId,
  handleServiceOptions,
}: Props) => {
  const { t } = useTranslation();

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className="my-4">
      {/* Button to toggle the dropdown */}
      {serviceData.serviceOptions && serviceData.serviceOptions.length > 0 && (
        <Button
          onPress={toggleDropdown}
          className="w-full text-left p-4 rounded-lg shadow-md font-semibold transition-all duration-300 focus:ring-4"
          style={{ backgroundColor: "#0f8992" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-lg" style={{ color: "#c8cbcb" }}>
              {t("Additional Services")}
            </span>
            <i
              className={`bx text-xl transition-transform duration-300 ${isDropdownOpen ? "bx-chevron-up" : "bx-chevron-down"
                }`}
              style={{ color: "#c8cbcb" }}
            />
          </div>
        </Button>
      )}


      {/* Dropdown content */}
      {isDropdownOpen && (
        <ul className="space-y-4 mt-4">
          {serviceData.serviceOptions &&
            serviceData.serviceOptions.map((item) => (
              <li
                key={item.id}
                className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Service name and price */}
                <div className="flex items-center justify-between">
                  <div className="d-flex items-center adon-name-info">
                    <span className="adon-icon text-xl text-teal-600 mr-3">
                      <i className="bx bxs-droplet"></i>
                    </span>
                    <div className="adon-name">
                      <h6 className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </h6>
                    </div>
                  </div>
                  <span className="adon-price text-gray-500">{item.additionalFee} AED</span>
                </div>

                {/* Add or Remove button */}
                <div className="mt-2">
                  {selectedServiceOptionsId && selectedServiceOptionsId.includes(item.id) ? (
                    <Button
                      radius="sm"
                      isDisabled={item.additionalFee === 0}
                      onPress={() => handleServiceOptions(item.id, item.additionalFee)}
                      color="default"
                      className="transition-all duration-200 hover:bg-red-700 hover:text-white"
                    >
                      <i className="bx bx-minus-circle me-2" />
                      {t("Remove")}
                    </Button>
                  ) : (
                    <Button
                      radius="sm"
                      isDisabled={item.additionalFee === 0}
                      onPress={() => handleServiceOptions(item.id, item.additionalFee)}
                      color="primary"
                      className="transition-all duration-200 hover:bg-teal-700 hover:text-white"
                    >
                      <i className="bx bx-plus-circle me-2" />
                      {t("Add")}
                    </Button>
                  )}
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default BookingAddon;
