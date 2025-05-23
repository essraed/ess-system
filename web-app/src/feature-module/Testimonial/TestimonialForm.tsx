import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Textarea } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { testimonialSchema, TestimonialSchema } from "../../lib/schemas/testimonialSchema ";

const TestimonialForm = () => {
  const { testimonialStore, userStore } = useStore(); // You must have a testimonialStore in your MobX store
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TestimonialSchema>({
    resolver: zodResolver(testimonialSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: TestimonialSchema) => {
    const result = await testimonialStore.addTestimonial(data);
    if (result.status === "success") {
      toast.success("Testimonial added successfully");
    } else {
      toast.error("Error: " + result.error);
    }
  };

  return (
    <>
       {(userStore.isMarketUser()||userStore.isMarketingManager()||userStore.isAdmin()) && (
        <Link
          to="#"
          data-bs-toggle="modal"
          data-bs-target="#add_testimonial"
          className="flex items-center gap-2 btn btn-primary"
        >
          <IoMdAddCircleOutline size={20} />
          {t("Add Testimonial")}
        </Link>
      )}

      <div
        className="modal new-modal fade"
        id="add_testimonial"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{t("Add Testimonial")}</h4>
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
                  label={t("Name")}
                  className="my-3"
                  {...register("customerName")}
                  isInvalid={!!errors.customerName}
                  errorMessage={errors.customerName?.message}
                />

                <Textarea
                  label={t("mess")}
                  className="my-3"
                  {...register("message")}
                  isInvalid={!!errors.message}
                  errorMessage={errors.message?.message}
                />

                <button type="submit" className="btn btn-primary w-100">
                  {t("Submit")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(TestimonialForm);
