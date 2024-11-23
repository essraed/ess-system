
import { useStore } from "../../app/stores/store";
import { carSchema, CarSchema } from "../../lib/schemas/CarSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/react";
import React from "react";
import toast from "react-hot-toast";
import { observer } from "mobx-react-lite";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";


const CarForm = () => {
  const { carStore, userStore } = useStore();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CarSchema>({
    resolver: zodResolver(carSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: CarSchema) => {
    const result = await carStore.addCar(data);
    if (result.status === "success") {
      toast.success("Car created successfully");
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
          {t("Add New Car")}
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
              <h4 className="modal-title"> {t("Add New Authority")}</h4>
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
                <Input
                  className="my-3"
                  label={t("Car Name")}
                  variant="bordered"
                  {...register("name")}
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message as string}
                />
                <Input
                  className="my-3"
                  label={t("Car Model")}
                  variant="bordered"
                  {...register("model")}
                  isInvalid={!!errors.model}
                  errorMessage={errors.model?.message as string}
                />
                <Input
                  className="my-3"
                  label={t("Plate Number")}
                  variant="bordered"
                  {...register("plateNumber")}
                  isInvalid={!!errors.plateNumber}
                  errorMessage={errors.plateNumber?.message as string}
                />

                <div className="modal-btn" onClick={handleSubmit(onSubmit)}>
                  <Link to="#" className="btn btn-secondary w-100">
                    {t("Create Car")}
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

export default observer(CarForm);
