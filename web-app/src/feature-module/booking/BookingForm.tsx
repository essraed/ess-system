import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { bookingSchema, BookingSchema } from "../../lib/schemas/bookingSchema";
import { useStore } from "../../app/stores/store";
import { DatePicker } from "antd";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
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
import { SearchIcon } from "../icons/SearchIcon";
import SearchMapInput from "../common/SearchMapInput";

// Custom hook for capturing the user's click on the map
const LocationPicker = ({
  onLocationChange,
}: {
  onLocationChange: (lat: number, lng: number) => void;
}) => {
  useMapEvents({
    click(event: any) {
      const { lat, lng } = event.latlng;
      onLocationChange(lat, lng); // Update the lat/lng when user clicks
    },
  });

  return null;
};

type Props = {
  serviceId: string;
  serviceOptionId: string | undefined;
  totalPrice: number;
};

const BookingForm = ({ serviceId, serviceOptionId, totalPrice }: Props) => {
  const {
    bookingStore: { getAvailableSlots, availableSlots, addBooking },
  } = useStore();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Set today's date as the initial value for the DatePicker
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedLat, setSelectedLat] = useState<number | undefined>(undefined);
  const [selectedLng, setSelectedLng] = useState<number | undefined>(undefined);
  const [locationDetails, setLocationDetails] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
    watch,
  } = useForm<BookingSchema>({
    resolver: zodResolver(bookingSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: BookingSchema) => {
    data.totalPrice = totalPrice;
    data.serviceId = serviceId;
    data.serviceOptionId = serviceOptionId;

    if (!date) {
      toast.error(t("Please select a valid date."));
      return;
    }

    if (selectedLat === undefined || selectedLng === undefined) {
      toast.error(t("Please select a location on the map."));
      return;
    }

    // Convert date to 'yyyy-MM-dd' format for back-end
    data.bookingDate = moment(date).format("YYYY-MM-DD");
    data.latitude = selectedLat;
    data.longitude = selectedLng;

    console.log("Booking data: ", data);

    const result = await addBooking(data);
    if (result.status === "success") {
      toast.success(t("Booking added successfully"));
      navigate(`/listings/booking/booking-details/${result.data}`);
    } else {
      toast.error(`${t("Error")}: ${result.error}`);
    }
  };

  const fetchAvailableSlots = async () => {
    try {
      const result = await getAvailableSlots(
        date?.toDateString() ?? new Date().toDateString()
      );
      if (result.status === "success") {
        toast.success(result.data);
      } else {
        toast.error(result.error as string);
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAvailableSlots();
  }, [getAvailableSlots, date]);

  const items = (availableSlots ?? []).map((item) => ({ label: item }));

  async function fetchLocationDetails(lat: number, lng: number) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await response.json();
      if (data && data.display_name) {
        setLocationDetails(data.display_name);
      } else {
        setLocationDetails("Location details not found");
      }
    } catch (error) {
      console.error("Error fetching location details:", error);
      setLocationDetails("Error fetching location details");
    }
  }

  useEffect(() => {
    if (selectedLat && selectedLng) {
      setValue("latitude", selectedLat);
      setValue("longitude", selectedLng);
      fetchLocationDetails(selectedLat, selectedLng);
    }
    if (date) {
      setValue("bookingDate", date.toDateString());
    }
  }, [selectedLat, selectedLng, setValue, date]);

  const customIcon = new L.Icon({
    iconUrl: "/location-pin.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });
  
  const position: LatLngExpression | undefined = [selectedLat ?? 25.276987, selectedLng ?? 55.296249] // [25.276987, 55.296249];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        {/* Customer Name */}
        <Input
          radius="sm"
          label={t("Customer Name")}
          variant="bordered"
          {...register("customerName")}
          isInvalid={!!errors.customerName}
          errorMessage={errors.customerName?.message}
        />

        {/* Phone */}
        <Input
          radius="sm"
          label={t("Phone")}
          variant="bordered"
          {...register("phone")}
          isInvalid={!!errors.phone}
          errorMessage={errors.phone?.message}
        />

        {/* Email */}
        <Input
          radius="sm"
          label={t("Email")}
          variant="bordered"
          {...register("email")}
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
        />

        {/* Address */}
        <Input
          radius="sm"
          label={t("Address")}
          variant="bordered"
          {...register("address")}
          value={locationDetails}
          isInvalid={!!errors.address}
          errorMessage={errors.address?.message}
        />

        {/* Date Picker */}
        <div className="flex items-center gap-5">
          <div className="flex-1">
            <DatePicker
              onChange={(newDate) =>
                setDate(newDate ? newDate.toDate() : undefined)
              }
              placeholder={t("Pickup Date")}
            />
          </div>
        </div>

        {/* Available Slots (Autocomplete) */}
        <Autocomplete
          label={t("Available slots")}
          placeholder={t("Select a time")}
          defaultItems={items}
          onSelectionChange={(key) => setValue("bookingTime", key as string)}
          {...register("bookingTime")}
          isInvalid={!!errors.bookingTime}
          errorMessage={errors.bookingTime?.message}
        >
          {(item) => (
            <AutocompleteItem key={item.label}>{item.label}</AutocompleteItem>
          )}
        </Autocomplete>

        <div style={{ height: "400px" }}>
          {/* <Input
            placeholder="Search location..."
            radius="none"
            className="w-full border rounded-t-lg"
            variant="bordered"
            startContent={<SearchIcon className="text-gray-500" />}
          /> */}

<SearchMapInput
          onSearch={(lat, lng) => {
            setSelectedLat(lat);
            setSelectedLng(lng);
          }}
        />

          <MapContainer
            center={position}
            zoom={12}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationPicker
              onLocationChange={(lat, lng) => {
                setSelectedLat(lat);
                setSelectedLng(lng);
              }}
            />
            {selectedLat && selectedLng && (
              <Marker position={[selectedLat, selectedLng]} icon={customIcon} />
            )}
          </MapContainer>
          {!selectedLat || !selectedLng ? (
            <div className="text-red-500 text-sm mt-2">
              {t("Please select a location on the map.")}
            </div>
          ) : null}
        </div>
      </div>
      <Button
        className="mt-20"
        radius="sm"
        isLoading={isSubmitting}
        fullWidth
        color="primary"
        type="submit"
      >
        {t("Book")}
      </Button>
    </form>
  );
};

export default observer(BookingForm);
