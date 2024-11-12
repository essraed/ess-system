import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { bookingSchema, BookingSchema } from "../../lib/schemas/bookingSchema";
import { useStore } from "../../app/stores/store";
import { Calendar } from "primereact/calendar";
import { DatePicker, TimePicker } from "antd";
import dayjs from "dayjs";

type Props = {
  serviceId: string;
  serviceOptionIds: string[];
};

const BookingForm = ({ serviceId, serviceOptionIds }: Props) => {
  const {
    bookingStore: { getAvailableSlots, availableSlots, addBooking },
  } = useStore();
  const { t } = useTranslation();
  const [date, setDate] = useState<Date | undefined>(undefined);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<BookingSchema>({
    resolver: zodResolver(bookingSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: BookingSchema) => {
    const result = await addBooking(data);
    if (result.status === "success") {
      toast.success(t("Booking added successfully"));
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <Input
          radius="sm"
          label={t("Customer Name")}
          variant="bordered"
          {...register("customerName")}
          isInvalid={!!errors.customerName}
          errorMessage={errors.customerName?.message}
        />

        <Input
          radius="sm"
          label={t("Phone")}
          variant="bordered"
          {...register("phone")}
          isInvalid={!!errors.phone}
          errorMessage={errors.phone?.message}
        />

        <Input
          radius="sm"
          label={t("Email")}
          variant="bordered"
          {...register("email")}
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
        />

        <Input
          radius="sm"
          label={t("Address")}
          variant="bordered"
          {...register("address")}
          isInvalid={!!errors.address}
          errorMessage={errors.address?.message}
        />

        <div className="flex items-center gap-5">
          <div className="flex-1">
            <DatePicker
              onChange={(date) => setDate(date ? date.toDate() : undefined)}
              placeholder={t("Pickup Date")}
            />
          </div>
        </div>

        <Autocomplete
          label={t("Available slots")}
          placeholder={t("Select a time")}
          defaultItems={items}
          onSelectionChange={(key) => {
            console.log("Selected:", key);
          }}
        >
          {(item) => (
            <AutocompleteItem key={item.label}>{item.label}</AutocompleteItem>
          )}
        </Autocomplete>

        <Button
          radius="sm"
          isLoading={isSubmitting}
          isDisabled={!isValid}
          fullWidth
          color="primary"
          type="submit"
        >
          {t("Book")}
        </Button>
      </div>
    </form>
  );
};

export default observer(BookingForm);
