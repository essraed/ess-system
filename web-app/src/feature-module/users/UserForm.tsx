import React from "react";
import { useStore } from "../../app/stores/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import toast from "react-hot-toast";
import { observer } from "mobx-react-lite";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  registerSchema,
  RegisterSchema,
} from "../../lib/schemas/registerSchema";

const UserForm = () => {
  const { userStore } = useStore();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      role: "USER",
    },
  });

  const onSubmit = async (data: RegisterSchema) => {
    console.log("UserData", data);
    const result = await userStore.register(data);

    if (result.status === "success") {
      toast.success(result.data);
      userStore.loadUsers();
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
          {t("Add New User")}
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
              <h4 className="modal-title">{t("Add New User")}</h4>
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
                <div className="space-y-4">
                  <Input
                    variant="bordered"
                    label="Display Name"
                    {...register("displayName")}
                    isInvalid={!!errors.displayName}
                    errorMessage={errors.displayName?.message}
                  />
                  <Input
                    variant="bordered"
                    label="Email"
                    type="email"
                    {...register("email")}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                  />
                  <Input
                    variant="bordered"
                    label="Password"
                    type="password"
                    {...register("password")}
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message}
                  />
                  <div>
                    <label className="block text-sm md:text-lg font-semibold mb-2">
                      Role
                    </label>
                    <select
                      {...register("role")}
                      className="w-full bg-gray-100 border-2 text-sm md:text-lg border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="USER">User</option>
                      <option value="MARKET">Market</option>
                      <option value="ADMIN">Admin</option>
                      <option value="MARKETIGNMANAGER">MARKETIGNMANAGER</option>
                      <option value="CASHIER">CASHIER</option>
                      <option value="AIRPORTCASHIER">AIRPORTCASHIER</option>
                    </select>
                    {errors.role && (
                      <span className="text-red-500 text-sm">
                        {errors.role.message}
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  className="mt-4 btn btn-primary"
                  fullWidth
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Add User
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(UserForm);
