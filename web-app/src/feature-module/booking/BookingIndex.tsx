import React, { useEffect, useState } from "react";
import { ServiceData } from "../../types/service";
import { observer } from "mobx-react-lite";
import BookingForm from "./BookingForm";
import BookingAddon from "./BookingAddon";

type Props = {
  service: ServiceData;
};

const BookingIndex = ({ service }: Props) => {
  const [selectedPrice, setSelectedPrice] = useState<number>(0);

  const [selectedOptionsPrice, setSelectedOptionsPrice] = useState<number>(0);
  const [selectedServiceOptionsId, setSelectedServiceOptionsId] = useState<string | undefined>(undefined);

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
    setSelectedPrice(service.price);
  }, [service]);

  if (!service) return <p>Loading...</p>;

  return (
    <>
      <div className="theiaStickySidebar">
        <div className="stickybar">
          <div className="review-sec mt-0">
            <div className="review-header">
              <h4>Book Service</h4>
              <h6 className="flex items-center gap-3">
                <p>Total Cost:</p>
                <span className="text-red-700 border p-2 rounded-lg">
                  {selectedPrice
                    ? `${selectedPrice + selectedOptionsPrice} AED`
                    : "Price Not Available"}{" "}
                </span>
              </h6>
            </div>
            <div className="location-content">
              <div className="delivery-tab">
                <ul className="nav">
                  {service?.priceVIP && (
                    <li
                      onClick={() =>
                        handleSelectedPrice(service?.priceVIP ?? service.price)
                      }
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
                          <span className="checked-title">{"Home"}</span>
                        </span>
                      </label>
                    </li>
                  )}
                  <li onClick={() => handleSelectedPrice(service.price)}>
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
                        <span className="checked-title">{"Center"}</span>
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
