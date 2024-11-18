import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { observer } from "mobx-react-lite";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import {
  serviceSchema,
  ServiceSchema,
} from "../../../lib/schemas/serviceSchema";

const ServiceForm = () => {
  const {
    serviceStore,
    userStore,
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
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "serviceOptions", // Field name for the array of options
  });

  useEffect(() => {
    loadCategoriesForDropdown;
  }, [loadCategoriesForDropdown]);

  // const [formFile, setFormFile] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null);

  // function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   const file = e.target.files ? e.target.files[0] : null;
  //   setFormFile(file); // Set the file in state
  // }

  function handleCategorySelect(categoryId: string) {
    setCategoryId(categoryId);
  }

  // const onSubmit = async (data: ServiceSchema) => {
  //   const formData = new FormData();
  //   formData.append("categoryId", categoryId as string);

  //   Object.keys(data).forEach((key) => {
  //     if (key === "serviceOptions" && Array.isArray(data.serviceOptions)) {
  //       formData.append(key, JSON.stringify(data.serviceOptions)); // Add service options as JSON
  //     } else if (data[key as keyof ServiceSchema]) {
  //       formData.append(key, data[key as keyof ServiceSchema] as string | Blob);
  //     }
  //   });
  //   // formData.append("pictureFile", formFile as File);

  //   formData.forEach((value, key) => {
  //     console.log(`${key}: ${value}`);
  //   });

  //   const result = await serviceStore.addService(data); // Send file along with data
  //   if (result.status === "success") {
  //     toast.success("Service added successfully");
  //   } else {
  //     toast.error("Error: " + result.error);
  //   }
  // };

  const onSubmit = async (data: ServiceSchema) => {
    const submissionData = {
      categoryId: categoryId || "",
      ...data,
      serviceOptions: Array.isArray(data.serviceOptions)
        ? data.serviceOptions
        : [],
    };

    console.log("Submission Data:", submissionData);

    const result = await serviceStore.addService(submissionData); // Send data object directly
    if (result.status === "success") {
      toast.success("Service added successfully");
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
          {t("Add New Service")}
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
              <h4 className="modal-title">{t("Add New Service")}</h4>
              <button
                type="button"
                className="close-btn"
                data-bs-dismiss="modal"
              >
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <Input
                  className="my-3"
                  label={t("Service Name")}
                  variant="bordered"
                  {...register("name")}
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message as string}
                />
                <Input
                  className="my-3"
                  label={t("Service Description")}
                  variant="bordered"
                  {...register("description")}
                  isInvalid={!!errors.description}
                  errorMessage={errors.description?.message as string}
                />
                <Input
                  className="my-3"
                  label={t("Price")}
                  variant="bordered"
                  type="number"
                  {...register("price", { valueAsNumber: true })}
                  isInvalid={!!errors.price}
                  errorMessage={errors.price?.message as string}
                />
                <Input
                  className="my-3"
                  label={t("VIP Price (Optional)")}
                  variant="bordered"
                  type="number"
                  {...register("priceVIP", { valueAsNumber: true })}
                  isInvalid={!!errors.priceVIP}
                  errorMessage={errors.priceVIP?.message as string}
                />
                <Input
                  className="my-3"
                  label={t("VIP Service Name (Optional)")}
                  variant="bordered"
                  {...register("serviceVipName")}
                  isInvalid={!!errors.serviceVipName}
                  errorMessage={errors.serviceVipName?.message as string}
                />
                {/* <Input
                  className="my-3"
                  label={t("Image")}
                  variant="bordered"
                  type="file"
                  onChange={handleFileChange}
                /> */}

                <Autocomplete
                  className="mb-2"
                  label={t("External Category")}
                  placeholder={t("Search a Category")}
                  defaultItems={categoriesForDropdown ?? []}
                  onSelectionChange={(key) =>
                    handleCategorySelect(key?.toString() as string)
                  }
                >
                  {(item) => (
                    <AutocompleteItem key={item.id}>
                      {item.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>

                {/* Service Options */}
                <div className="my-3">
                  <h5>{t("Service Options")}</h5>
                  {fields.map((item, index) => (
                    <div
                      key={item.id}
                      className="d-flex align-items-center gap-2"
                    >
                      <Input
                        {...register(`serviceOptions.${index}.name`)}
                        className="flex-1"
                        placeholder={t("Option Name")}
                      />
                      <Input
                        {...register(`serviceOptions.${index}.description`)}
                        className="flex-1"
                        placeholder={t("Option Description")}
                      />
                      <Input
                        {...register(`serviceOptions.${index}.additionalFee`, {
                          valueAsNumber: true,
                        })}
                        className="flex-1"
                        placeholder={t("Additional Fee")}
                        type="number"
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
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
                    className="btn btn-secondary"
                  >
                    {t("Add Service Option")}
                  </button>
                </div>

                <button type="submit" className="btn btn-primary mt-3">
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

export default observer(ServiceForm);
