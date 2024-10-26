"use client";

import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useStore } from "@/stores/store";
import toast from "react-hot-toast";
import handleErrors from "@/lib/utils";
import Link from "next/link";
import { RegisterSchema, registerSchema } from "@/lib/schemas/registerSchema";

export const RegisterForm = () => {
  const { userStore } = useStore();
  const router = useRouter();
  const [summaryErrors, setSummaryErrors] = useState<string[] | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: RegisterSchema) => {
    const result = await userStore.register(data); // Use your register function

    if (result.status === "success") {
      toast.success(result.data);
      router.push("/");
    } else {
      setSummaryErrors(handleErrors(result.error));
    }
  };

  return (
    <>
      <div className="text-center text-[25px] font-bold mb-6 mx-auto">
        Register
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-3/5">
        <div className="space-y-4">
          <Input
            variant="bordered"
            label="displayName"
            {...register("displayName")}
            defaultValue=""
            isInvalid={!!errors.displayName}
            errorMessage={errors.displayName?.message}
          />
          <Input
            variant="bordered"
            label="Email"
            type="email"
            {...register("email")}
            defaultValue=""
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

          <Button
            fullWidth
            isLoading={isSubmitting}
            isDisabled={!isValid}
            variant="flat"
            color="primary"
            type="submit"
          >
            Register
          </Button>

          {summaryErrors && (
            <div className="text-red-500">
              {summaryErrors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          )}
        </div>
      </form>

      <div className="font-light text-slate-400 mt-4 text-sm">
        Already have an account?{" "}
        <Link href="/login" className="font-bold">
          Login here
        </Link>
      </div>
    </>
  );
};
