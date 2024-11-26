import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { CornerDownLeft } from "react-feather";
import { all_routes } from "../router/all_routes";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useStore } from "../../app/stores/store";
import { loginSchema, LoginSchema } from "../../lib/schemas/loginSchema";
import handleErrors from "../../lib/utils";
import { Button, Input } from "@nextui-org/react";
import { observer } from "mobx-react-lite";

const routes = all_routes;
const Login = () => {
  const { userStore } = useStore();
  const navigate = useNavigate();
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
      navigate("/");
    } else {
      setSummaryErrors(handleErrors(result.error));
    }
  };

  return (
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
              <h1>Sign In</h1>
              <p className="account-subtitle">
                We will send a confirmation code to your email.
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
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
                    className="btn w-100 btn-size"
                    isLoading={isSubmitting}
                    isDisabled={!isValid}
                    color="primary"
                    type="submit"
                  >
                    Sign In
                  </Button>
                </div>
                {/* <div className="login-or">
                  <span className="or-line" />
                  <span className="span-or-log">
                    Or, log in with your email
                  </span>
                </div> */}
                {/* Social Login */}
                {/* <div className="social-login">
                  <Link
                    to="#"
                    className="d-flex align-items-center justify-content-center input-block btn google-login w-100"
                  >
                    <span>
                      <ImageWithBasePath
                        src="assets/img/icons/google.svg"
                        className="img-fluid"
                        alt="Google"
                      />
                    </span>
                    Log in with Google
                  </Link>
                </div> */}
                {/* <div className="social-login">
                  <Link
                    to="#"
                    className="d-flex align-items-center justify-content-center input-block btn google-login w-100"
                  >
                    <span>
                      <ImageWithBasePath
                        src="assets/img/icons/facebook.svg"
                        className="img-fluid"
                        alt="Facebook"
                      />
                    </span>
                    Log in with Facebook
                  </Link>
                </div> */}
                {/* /Social Login */}
                {/* <div className="text-center dont-have">
                  <Link to={routes.register}>Register</Link>
                </div> */}
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
              <p>© 2024 Karama Business Center. All Rights Reserved.</p>

            </div>
          </div>
          {/* /Copyright */}
        </div>
      </footer>
      {/* /Footer */}
    </div>
  );
};

export default observer(Login);
