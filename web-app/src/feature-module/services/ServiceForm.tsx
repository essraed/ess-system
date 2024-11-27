
import { Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { observer } from "mobx-react-lite";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


import { Dropdown } from "primereact/dropdown";
import { ServiceData } from "../../types/service";
import { useStore } from "../../app/stores/store";
import { serviceSchema, ServiceSchema } from "../../lib/schemas/serviceSchema";
import { all_routes } from "../router/all_routes";

type Props = {
  service?: ServiceData | null;
  id?: string | null | undefined;
};

const ServiceForm = ({ service, id }: Props) => {
  const navigate = useNavigate();

  const {
    serviceStore: { addService, updateService },
    categoryStore: { categoriesForDropdown, loadCategoriesForDropdown },
  } = useStore();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ServiceSchema>({
    resolver: zodResolver(serviceSchema),
    mode: "onTouched",
    defaultValues: { serviceOptions: service?.serviceOptions ?? [] },
  });

  // Use field array to manage service options dynamically
  const { fields, append, remove } = useFieldArray({
    control,
    name: "serviceOptions",
  });

  useEffect(() => {
    loadCategoriesForDropdown();
  }, [loadCategoriesForDropdown]);

  const [categoryId, setCategoryId] = useState<string | null>(null);

  function handleCategorySelect(categoryId: string) {
    setCategoryId(categoryId);
  }

  const onSubmit = async (data: ServiceSchema) => {
    console.log("data: ", service);

    const submissionData = {
      categoryId: categoryId ?? service?.categoryId,
      ...data,
      serviceOptions: Array.isArray(data.serviceOptions)
        ? data.serviceOptions
        : [],
    };

    // Handle adding or updating service
    if (id) { // update
      const result = await updateService(id, submissionData);
      if (result.status === "success") {
        toast.success("Service updated successfully");
      } else {
        toast.error("Error: " + result.error);
      }
    } else {
      // Adding a new service
      const result = await addService(submissionData);
      if (result.status === "success") {
        toast.success("Service added successfully");
      } else {
        toast.error("Error: " + result.error);
      }
    }
    navigate(all_routes.serviceDashboard)
  };

  // Handle removing an option from the list
  function handleRemoveOption(index: number) {
    remove(index);
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <Input
            className="my-3"
            label={t("Service Name")}
            variant="bordered"
            {...register("name")}
            defaultValue={service?.name || ""}
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message as string}
          />
          <Input
            className="my-3"
            label={t("Service Description")}
            variant="bordered"
            {...register("description")}
            defaultValue={service?.description || ""}
            isInvalid={!!errors.description}
            errorMessage={errors.description?.message as string}
          />
          <Input
            className="my-3"
            label={t("Price")}
            variant="bordered"
            type="number"
            {...register("price", { valueAsNumber: true })}
            defaultValue={service?.price.toString() || ""}
            isInvalid={!!errors.price}
            errorMessage={errors.price?.message as string}
          />
          <Input
            className="my-3"
            label={t("VIP Price (Optional)")}
            variant="bordered"
            type="number"
            {...register("priceVIP", { valueAsNumber: true })}
            defaultValue={service?.priceVIP?.toString() || "0"}
            isInvalid={!!errors.priceVIP}
            errorMessage={errors.priceVIP?.message as string}
          />

          <Dropdown
            className="w-full mb-2"
            value={categoryId ?? service?.categoryId}
            options={categoriesForDropdown?.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
            onChange={(e) => handleCategorySelect(e.value)}
            placeholder={t("Search a Category")}
          />

          {/* Service Options and Add/Remove Logic */}
          <div className="my-3">
            <h5 className="mb-2">{t("Service Options")}</h5>
            {fields.map((item, index) => (
              <div
                key={item.id}
                className="d-flex align-items-center gap-2 mb-2"
              >
                <Input
                  {...register(`serviceOptions.${index}.name`)}
                  className="flex-1"
                  placeholder={t("Option Name")}
                  defaultValue={item.name || ""}
                />
                <Input
                  {...register(`serviceOptions.${index}.description`)}
                  className="flex-1"
                  placeholder={t("Option Description")}
                  defaultValue={item.description || ""}
                />
                <Input
                  {...register(`serviceOptions.${index}.additionalFee`, {
                    valueAsNumber: true,
                  })}
                  className="flex-1"
                  placeholder={t("Additional Fee")}
                  type="number"
                  defaultValue={item.additionalFee.toString() || ""}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveOption(index)}
                  className="btn btn-danger"
                >
                  {t("Remove")}
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                append({ name: "", description: "", additionalFee: 0 })
              }
              className="btn btn-secondary mt-2"
            >
              {t("Add Service Option")}
            </button>
          </div>

          <button
            type="submit" className="btn btn-primary mt-3">
            {id ? t("Update Service") : t("Submit")}
          </button>
        </form>
      </div>
    </>
  );
};

export default observer(ServiceForm);
