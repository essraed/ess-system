import React from "react";
import { ServiceData } from "../../types/service";
import { Button } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

type Props = {
  serviceData: ServiceData;
  selectedServiceOptionsId:  string | undefined;
  handleServiceOptions: (serviceId: string, fee: number) => void;
};

const BookingAddon = ({
  serviceData,
  selectedServiceOptionsId,
  handleServiceOptions,
}: Props) => {
  const { t } = useTranslation();

  return (
    <ul className="adons-lists my-4">
      {serviceData.serviceOptions &&
        serviceData.serviceOptions.map((item) => (
          <li key={item.id} className="border p-2 rounded">
            <div className="adons-types flex items-center justify-between">
              <div className="d-flex align-items-center adon-name-info">
                <span className="adon-icon">
                  <i className="bx bxs-droplet" />
                </span>
                <div className="adon-name">
                  <h6>{item.name}</h6>
                </div>
              </div>
              <span className="adon-price">{item.additionalFee} AED</span>

              {selectedServiceOptionsId &&
              selectedServiceOptionsId.includes(item.id) ? (
                <Button
                  radius="sm"
                  isDisabled={item.additionalFee === 0}
                  onPress={() =>
                    handleServiceOptions(item.id, item.additionalFee)
                  }
                  color="default"
                >
                  <i className="bx bx-minus-circle me-2" />
                  {t("Remove")}
                </Button>
              ) : (
                <Button
                  radius="sm"
                  isDisabled={item.additionalFee === 0}
                  onPress={() =>
                    handleServiceOptions(item.id, item.additionalFee)
                  }
                  color="primary"
                >
                  <i className="bx bx-plus-circle me-2" />
                  {t("Add")}
                </Button>
              )}
            </div>
          </li>
        ))}
    </ul>
  );
};

export default BookingAddon;
