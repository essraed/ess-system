import { useStore } from "../../app/stores/store";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/react";
import React from "react";
import toast from "react-hot-toast";
import { observer } from "mobx-react-lite";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  workingTimeSchema,
  WorkingTimeSchema,
} from "../../lib/schemas/workingTimeSchema ";

const WorkingTimeForm = () => {
  const { workingTimeStore, userStore } = useStore();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkingTimeSchema>({
    resolver: zodResolver(workingTimeSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: WorkingTimeSchema) => {
    const result = await workingTimeStore.addWorkingTime(data);
    if (result.status === "success") {
      toast.success("WorkingTime created successfully");
      workingTimeStore.loadWorkingTimes();
    } else {
      toast.error("Error: " + result.error);
    }
  };

  return (
    <>
      {userStore.isAdmin() && (
        <Link
          to="#"
          data-bs-toggle="modal"
          data-bs-target="#add_card"
          className="flex items-center gap-2 btn btn-primary"
        >
          <IoMdAddCircleOutline size={20} />
          {t("Update WorkingTime")}
        </Link>
      )}

      <div
        className="modal new-modal fade"
        id="add_card"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title"> {t("Update WorkingTime")}</h4>
              <button
                type="button"
                className="close-btn"
                data-bs-dismiss="modal"
              >
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-3">
                  <label htmlFor="day" className="form-label">
                    {t("Day of the Week")}
                  </label>
                  <select
                    id="day"
                    className={`form-select ${errors.day ? "is-invalid" : ""}`}
                    {...register("day")}
                  >
                    <option value="">{t("Select a Day")}</option>
                    <option value="Sunday">{t("Sunday")}</option>
                    <option value="Monday">{t("Monday")}</option>
                    <option value="Tuesday">{t("Tuesday")}</option>
                    <option value="Wednesday">{t("Wednesday")}</option>
                    <option value="Thursday">{t("Thursday")}</option>
                    <option value="Friday">{t("Friday")}</option>
                    <option value="Saturday">{t("Saturday")}</option>
                  </select>
                  {errors.day && (
                    <div className="invalid-feedback">
                      {errors.day.message as string}
                    </div>
                  )}
                </div>

                <Input
                  className="my-3"
                  label={t("From Time (HH:mm)")}
                  type="time"
                  variant="bordered"
                  {...register("fromTime")}
                  isInvalid={!!errors.fromTime}
                  errorMessage={errors.fromTime?.message as string}
                />

                <Input
                  className="my-3"
                  label={t("To Time (HH:mm)")}
                  type="time"
                  variant="bordered"
                  {...register("toTime")}
                  isInvalid={!!errors.toTime}
                  errorMessage={errors.toTime?.message as string}
                />

                <div className="modal-btn" onClick={handleSubmit(onSubmit)}>
                  <Link to="#" className="btn btn-secondary w-100">
                    {t("Create Working Slot")}
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(WorkingTimeForm);
