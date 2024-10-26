"use client";

import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginSchema, loginSchema } from "@/lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useStore } from "@/stores/store";
import toast from "react-hot-toast";
import handleErrors from "@/lib/utils";
import Link from "next/link";

export const LoginForm = () => {
  const { userStore } = useStore();
  const router = useRouter();
  const [summaryErrors, setSummaryErrors] = useState<string[] | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginSchema) => {
    const result = await userStore.login(data);

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
        Login
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-3/5">
        <div className="space-y-4">
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
            defaultValue=""
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
            Login
          </Button>
        </div>
      </form>

      <div className="font-light text-slate-400 mt-4 text-sm">
        Don&apos;t have an account ?{" "}
        <Link href="/register" className="font-bold">
          Register here
        </Link>
      </div>
    </>
  );
};
