import React, { useEffect, useState } from "react";
import { ServiceData } from "../../types/service";
import { observer } from "mobx-react-lite";
import BookingForm from "./BookingForm";
import BookingAddon from "./BookingAddon";
import LoadingSpinner from "../common/LoadingSpinner";
import { useTranslation } from "react-i18next";

type Props = {
  service: ServiceData;
};

const BookingIndex = ({ service }: Props) => {
  const { t } = useTranslation();
  const [selectedPrice, setSelectedPrice] = useState<number>(0);

  const [selectedOptionsPrice, setSelectedOptionsPrice] = useState<number>(0);
  const [selectedServiceOptionsId, setSelectedServiceOptionsId] = useState<
    string | undefined
  >(undefined);
  const [isAtHome, setIsAtHome] = useState(false);

  const handleSelectedPrice = (price: number) => {
    setSelectedPrice(price);
  };

  function handleServiceOptions(id: string, price: number) {
    if (selectedServiceOptionsId && selectedServiceOptionsId.includes(id)) {
      setSelectedServiceOptionsId(undefined);
      setSelectedOptionsPrice(0);
    } else {
      setSelectedServiceOptionsId(id);
      setSelectedOptionsPrice(price);
    }

    // if (selectedServiceOptionsId && selectedServiceOptionsId.includes(id)) {
    //   setSelectedServiceOptionsId([
    //     ...selectedServiceOptionsId.filter((item) => item !== id),
    //   ]);
    //   setSelectedOptionsPrice(selectedOptionsPrice - price);
    // } else {
    //   setSelectedServiceOptionsId([...selectedServiceOptionsId, id]);
    //   setSelectedOptionsPrice(selectedOptionsPrice + price);
    // }
  }

  useEffect(() => {
    setSelectedPrice(Number(service.price));
  }, [service]);

  if (!service) return <LoadingSpinner />;

  return (
    <>
      <div className="theiaStickySidebar">
        <div className="stickybar">
          <div className="review-sec mt-0">
            <div className="review-header">
              <p className="font-bold text-2xl">{t('Book Service')}</p>
              <h6 className="flex items-center gap-3">
                <p>{t('Total Cost')}:</p>
                <span className="text-red-700 border p-2 rounded-lg">
                  {selectedPrice
                    ? `${(selectedPrice + selectedOptionsPrice).toFixed(2)} ${t('AED')}`
                    : t("Price Not Available")}{" "}
                </span>
              </h6>
            </div>
            <div className="location-content">
              <div className="delivery-tab">
                <ul className="nav">
                  {Number(service?.priceVIP) > 0 && (
                    <li
                      onClick={() => {
                        handleSelectedPrice(Number(service?.priceVIP) ?? Number(service.price));
                        setIsAtHome(true);
                      }}
                    >
                      <label
                        className="booking_custom_check"
                        data-bs-toggle="tab"
                      >
                        <input
                          type="radio"
                          name="rent_type"
                          defaultChecked={true}
                        />
                        <span className="booking_checkmark">
                          <span className="checked-title">{t("AtHome")}</span>
                        </span>
                      </label>
                    </li>
                  )}
                  <li onClick={() => {
                    handleSelectedPrice(Number(service.price))
                    setIsAtHome(false)
                  }}>
                    <label
                      className={`booking_custom_check ${service?.priceVIP ? "" : "active"}`}
                      data-bs-toggle="tab"
                    >
                      <input
                        type="radio"
                        name="rent_type"
                        defaultChecked={true}
                      />
                      <span className="booking_checkmark">
                        <span className="checked-title">{t("Pick & Drop")}</span>
                      </span>
                    </label>
                  </li>
                </ul>
              </div>
              <div className="tab-content">
                <div className="tab-pane fade active show" id="delivery">
                  <BookingAddon
                    serviceData={service}
                    handleServiceOptions={handleServiceOptions}
                    selectedServiceOptionsId={selectedServiceOptionsId}
                  />
                  <BookingForm
                    serviceId={service.id}
                    serviceOptionId={selectedServiceOptionsId}
                    totalPrice={selectedPrice + selectedOptionsPrice}
                    IsAtHome={isAtHome}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(BookingIndex);
