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
    <div className="mb-3 w-ful border border-slate-950 rounded-lg ">
      {/* Button to toggle the dropdown */}
      {serviceData.serviceOptions && serviceData.serviceOptions.length > 0 && (
        <Button
          onPress={toggleDropdown}
          className="w-full p-2 bg-teal-600 text-white rounded-md flex justify-between items-center text-sm "
          style={{ backgroundColor: "#fff" }}//0A97B0
        >
          <div className="flex items-center justify-between">
            <span className="checked-title-2" style={{ color: "#000" }}>
              {t("Additional Services")}
            </span>
            <i
              className={`bx text-xl transition-transform duration-300 ${
                isDropdownOpen ? "bx-chevron-up" : "bx-chevron-down"
              }`}
              style={{ color: "#000" }}
            />
          </div>
        </Button>
      )}

      {/* Dropdown content */}
      {isDropdownOpen && (
        <ul className="mt-2 border rounded-md shadow-md text-sm">
          {serviceData.serviceOptions &&
            serviceData.serviceOptions.map((item) => (
              <li
                key={item.id}
                className="p-2 flex justify-between items-center hover:bg-gray-100"
              >
                <span className="text-slate-950">{item.name}</span>
                <div className="flex items-center gap-2">
                  <span>{item.additionalFee} AED</span>
                  <button
                    onClick={() =>
                      handleServiceOptions(item.id, item.additionalFee)
                    }
                    className={`px-2 py-1 text-xs rounded-md ${
                      selectedServiceOptionsId?.includes(item.id)
                        ? "bg-red-500 text-white"
                        : "bg-gray-800 text-white"
                    }`}
                  >
                    {selectedServiceOptionsId?.includes(item.id)
                      ? t("Remove")
                      : t("Add")}
                  </button>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default BookingAddon;
