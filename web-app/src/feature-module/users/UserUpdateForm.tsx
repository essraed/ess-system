import { Input } from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { observer } from "mobx-react-lite";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useStore } from "../../app/stores/store";
import { registerForUpdateSchema, RegisterForUpdateSchema} from "../../lib/schemas/registerSchema";
import { all_routes } from "../router/all_routes";

const UserUpdateForm = ({ user, id }: { user?: RegisterForUpdateSchema | null; id?: string | null }) => {
  const navigate = useNavigate();
  const {
    userStore: { updateUser },
  } = useStore();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForUpdateSchema>({
    resolver: zodResolver(registerForUpdateSchema),
    mode: "onTouched",
    defaultValues: {
      displayName: user?.displayName || "",
      email: user?.email || "",
      password: user?.password||"", // Password should not be pre-filled
    },
  });

  const onSubmit = async (data: RegisterForUpdateSchema) => {
    if (!id) {
      toast.error(t("User not found"));
      return;
    }

    const result = await updateUser(id, data);
    if (result.status === "success") {
      toast.success(t("User updated successfully"));
      navigate(all_routes.UserDashboard);
    } else {
      toast.error(t("Error: ") + result.error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          {/* Display Name Field */}
          <Input
            className="my-3"
            label={t("Display Name")}
            variant="bordered"
            {...register("displayName")}
            isInvalid={!!errors.displayName}
            errorMessage={errors.displayName?.message as string}
          />

          {/* Email Field */}
          <Input
            className="my-3"
            label={t("Email")}
            variant="bordered"
            type="email"
            {...register("email")}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message as string}
          />

          {/* Password Field */}
          <Input
            className="my-3"
            label={t("Password")}
            variant="bordered"
            type="password"
            {...register("password")}
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message as string}
          />

          <button type="submit" className="btn btn-primary mt-3">
            {id ? t("Update User") : t("Submit")}
          </button>
        </form>
      </div>
    </>
  );
};

export default observer(UserUpdateForm);
