import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { bookingSchema, BookingSchema } from "../../lib/schemas/bookingSchema";
import { useStore } from "../../app/stores/store";
import { DatePicker } from "antd";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
} from "@nextui-org/react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import SearchMapInput from "../common/map/SearchMapInput";
import LocationPicker from "../common/map/LocationPicker";
import MapViewUpdater from "../common/map/MapViewUpdater";

type Props = {
  serviceId: string;
  serviceOptionId: string | undefined;
  totalPrice: number;
  IsAtHome: boolean;
};

const BookingSecondForm = ({
  serviceId,
  serviceOptionId,
  totalPrice,
  IsAtHome,
}: Props) => {
  const {
    bookingStore: {
      getAvailableSlots,
      availableSlots,
      addBooking,
      isSession,
      getBooking,
      currentBooking,
    },
  } = useStore();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedLat, setSelectedLat] = useState<number | undefined>(undefined);
  const [selectedLng, setSelectedLng] = useState<number | undefined>(undefined);
  const [address, setAddress] = useState<string>("");
  const [reuseData, setReuseData] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingSchema>({
    resolver: zodResolver(bookingSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: BookingSchema) => {
    console.log("hiiiiiiiiiiii");
    data.totalPrice = totalPrice;
    data.serviceId = serviceId;
    data.serviceOptionId = serviceOptionId;

    if (!date || moment(date).isBefore(moment(), "day")) {
      toast.error(t("Please select a valid future date."));
      return;
    }

    // Check if reuseData is enabled
    if (reuseData && currentBooking) {
      data.latitude = currentBooking.latitude!;
      data.longitude = currentBooking.longitude!;
      data.address = currentBooking.address!;
    } else {
      data.latitude = selectedLat;
      data.longitude = selectedLng;
      data.address = address;
    }

    // Add isVIP flag
    data.isVIP = IsAtHome;
    data.bookingDate = moment(date).format("YYYY-MM-DD");
    console.log("databook", data);

    // Submit booking data
    const result = await addBooking(data);
    if (result.status === "success") {
      toast.success(t("Booking added successfully"));
      navigate(`/listings/booking/view/${result.data}`);
    } else {
      toast.error(`${t("Error")}: ${result.error}`);
    }
  };

  const fetchAvailableSlots = async () => {
    await getAvailableSlots(date?.toDateString() ?? new Date().toDateString());
  };

  const fetchLocationDetails = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await response.json();
      setAddress(data.display_name || "Unknown Address");
    } catch (error) {
      setAddress("Error fetching location details");
    }
  };

  useEffect(() => {
    fetchAvailableSlots();
    if (isSession) getBooking(isSession[0]);
  }, [getAvailableSlots, date, isSession]);

  useEffect(() => {
    if (selectedLat && selectedLng) {
      setValue("latitude", selectedLat);
      setValue("longitude", selectedLng);
      fetchLocationDetails(selectedLat, selectedLng);
    }
  }, [selectedLat, selectedLng, setValue]);
  useEffect(() => {
    if (reuseData && currentBooking) {
      setValue("customerName", currentBooking.customerName || "");
      setValue("phone", currentBooking.phone || "");
      setValue("email", currentBooking.email || "");
      setAddress(currentBooking.address || "");
      setValue("address", currentBooking.address || "");
    } else {
      setValue("customerName", "");
      setValue("phone", "");
      setValue("email", "");
      setAddress("");
      setValue("address", "");
    }
  }, [reuseData, currentBooking, setValue]);

  const items = (availableSlots ?? []).map((item) => ({ label: item }));

  const customIcon = new L.Icon({
    iconUrl: "/location-pin.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });

  const position: LatLngExpression | undefined = [
    selectedLat ?? 25.276987,
    selectedLng ?? 55.296249,
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="reuseData"
            className="mr-2"
            checked={reuseData}
            onChange={() => setReuseData(!reuseData)}
          />
          <label htmlFor="reuseData" className="text-gray-700 text-sm">
            {t("Reuse previous booking details")}
          </label>
        </div>
        <div className="flex flex-col lg:flex-row gap-1 items-center lg:items-start w-full">
          {/* Date Picker */}
          <div className="flex flex-col w-full lg:w-1/2">
            <label
              htmlFor="pickup-date"
              className="text-small font-normal text-gray-800 "
            >
              {t("Pickup Date")}
            </label>
            <DatePicker
              className="w-full border border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 size-12"
              onChange={(newDate) =>
                setDate(newDate ? newDate.toDate() : undefined)
              }
              placeholder={t("Pickup Date")}
            />
          </div>

          {/* Available Slots (Autocomplete) */}
          <div className="flex flex-col w-full lg:w-1/2 ">
            <label
              htmlFor="booking-time"
              className="text-small mb-2 font-normal text-gray-800 "
            >
              {t("Available Slots")}
            </label>
            <div className="relative rounded-none">
              <Autocomplete
                size="sm"
                value={
                  reuseData
                    ? moment(currentBooking?.bookingDate).format("HH:mm")
                    : ""
                }
                label={t("Select a time")}
                placeholder={t("")}
                defaultItems={items}
                onSelectionChange={(key) =>
                  setValue("bookingTime", key as string)
                }
                {...register("bookingTime")}
                isInvalid={!!errors.bookingTime}
                errorMessage={errors.bookingTime?.message}
              >
                {(item) => (
                  <AutocompleteItem key={item.label}>
                    {item.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Input
            radius="sm"
            size="sm"
            label={t("Customer Name")}
            variant="bordered"
            value={watch("customerName") || ""}
            onChange={(e) => setValue("customerName", e.target.value)}
            isInvalid={!!errors.customerName}
            errorMessage={errors.customerName?.message}
          />

          {/* Customer Name */}

          {/* Phone */}
          {/* Phone */}
          <InputMask
            mask="+999 99 999 9999"
            maskChar="_"
            size="sm"
            value={watch("phone")}
            onChange={(e: any) => setValue("phone", e.target.value)}
          >
            {() => (
              <Input
                radius="sm"
                label="Phone"
                size="sm"
                variant="bordered"
                isInvalid={!!errors.phone}
                errorMessage={errors.phone?.message}
              />
            )}
          </InputMask>

          {/* Email */}
          <Input
            radius="sm"
            size="sm"
            label={t("Email")}
            value={watch("email") || ""}
            variant="bordered"
            onChange={(e) => setValue("email", e.target.value)} // Update form state
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
          />
          {/* Address */}
          <Input
            radius="sm"
            variant="bordered"
            size="sm"
            label={t("Address")}
            value={watch("address") || address} // Fallback to address state
            onChange={(e) => {
              setValue("address", e.target.value); // Update form state
              setAddress(e.target.value); // Sync local state
            }}
            isInvalid={!!errors.address}
            errorMessage={errors.address?.message}
          />

          {/* Map */}
          <div>
            <SearchMapInput
              onSearch={(lat, lng) => {
                setSelectedLat(lat);
                setSelectedLng(lng);
              }}
            />
            <div
              style={{ height: "300px", position: "relative" }}
              className="transition-transform transform scale-100 duration-200 ease-in-out"
            >
              <MapContainer
                center={position}
                zoom={12}
                style={{ height: "100%", width: "100%", zIndex: 0 }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationPicker
                  onLocationChange={(lat, lng) => {
                    setSelectedLat(lat);
                    setSelectedLng(lng);
                  }}
                />
                {selectedLat && selectedLng && (
                  <Marker
                    position={[selectedLat, selectedLng]}
                    icon={customIcon}
                  />
                )}
                <MapViewUpdater lat={selectedLat} lng={selectedLng} />
              </MapContainer>
            </div>
          </div>
        </div>

        <div>
          <Button
            className="mt-4"
            radius="sm"
            isLoading={isSubmitting}
            fullWidth
            color="primary"
            type="submit"
          >
            {t("Book")}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default observer(BookingSecondForm);