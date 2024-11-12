import React, { useState } from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Link, useNavigate } from "react-router-dom";
import { CornerDownLeft } from "react-feather";
import { all_routes } from "../router/all_routes";
import { useStore } from "../../app/stores/store";
import {
  registerSchema,
  RegisterSchema,
} from "../../lib/schemas/registerSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import handleErrors from "../../lib/utils";
import { Button, Input } from "@nextui-org/react";
import { observer } from "mobx-react-lite";

const routes = all_routes;
const SignUp = () => {
  const { userStore } = useStore();
  const navigate = useNavigate();
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
      navigate("/");
    } else {
      setSummaryErrors(handleErrors(result.error));
    }
  };

  return (
    <div>
      <div className="main-wrapper login-body">
        {/* Header */}
        <header className="log-header">
          <Link to={routes.homeOne}>
            <ImageWithBasePath
              className="img-fluid logo-dark"
              src="assets/img/logo.svg"
              alt="Logo"
            />
          </Link>
        </header>
        {/* /Header */}
        <div className="login-wrapper">
          <div className="loginbox">
            <div className="login-auth">
              <div className="login-auth-wrap">
                <div className="sign-group">
                  <Link to={routes.homeOne} className="btn sign-up">
                    <span>
                      <CornerDownLeft />
                    </span>{" "}
                    Back To Home
                  </Link>
                </div>
                <h1>Sign Up</h1>
                <p className="account-subtitle">
                  We will send a confirmation code to your email.
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                    <div>
                      {summaryErrors && (
                        <div className="text-red-500">
                          {summaryErrors.map((error, index) => (
                            <div key={index}>{error}</div>
                          ))}
                        </div>
                      )}
                    </div>
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
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <footer className="log-footer">
          <div className="container-fluid">
            {/* Copyright */}
            <div className="copyright">
              <div className="copyright-text">
                <p>© 2023 Dreams Rent. All Rights Reserved.</p>
              </div>
            </div>
            {/* /Copyright */}
          </div>
        </footer>
        {/* /Footer */}
      </div>
    </div>
  );
};

export default observer (SignUp);
