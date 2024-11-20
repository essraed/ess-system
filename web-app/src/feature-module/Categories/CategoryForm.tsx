import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { observer } from "mobx-react-lite";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { categorySchema, CategorySchema } from "../../lib/schemas/categorySchema";


const CategoryForm = () => {
  const { categoryStore, userStore } = useStore();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    mode: "onTouched",
  });

  // const [formFile, setFormFile] = useState<File | null>(null);

  // function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   const file = e.target.files ? e.target.files[0] : null;
  //   setFormFile(file);
  // }

  const onSubmit = async (data: CategorySchema) => {
    try {
      const result = await categoryStore.addCategory(data);
      if (result.status === "success") {
        toast.success("Category added successfully");
      } else {
        toast.error("Error: " + result.error);
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
      console.error("Submission error:", error);
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
          {t("Add New Category")}
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
              <h4 className="modal-title"> {t("Add New Category")}</h4>
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
                  label={t("Category Name")}
                  variant="bordered"
                  {...register("name")}
                  isInvalid={!!errors?.name}
                  errorMessage={
                    errors?.name?.message ? errors.name.message : ""
                  }
                />

                {/* <Input
                  className="my-3 "
                  label={t("Category Picture")}
                  variant="bordered"
                  type="file"
                  onChange={handleFileChange}
                /> */}

                <div className="modal-btn" onClick={handleSubmit(onSubmit)}>
                  <Link to="#" className="btn btn-secondary w-100">
                    {t("Create Category")}
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

export default observer(CategoryForm);
