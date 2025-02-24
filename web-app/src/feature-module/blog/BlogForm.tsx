import { useStore } from "../../app/stores/store";
import { blogSchema, BlogSchema } from "../../lib/schemas/BlogSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Textarea } from "@nextui-org/react";
import React from "react";
import toast from "react-hot-toast";
import { observer } from "mobx-react-lite";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";


const BlogForm = () => {
  const { blogStore, userStore } = useStore();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogSchema>({
    resolver: zodResolver(blogSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: BlogSchema) => {
    const result = await blogStore.addBlog(data);
    if (result.status === "success") {
      toast.success("Blog created successfully");
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
          {t("Add New Blog")}
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
              <h4 className="modal-title"> {t("Add New Blog")}</h4>
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
                  className="my-3"
                  label={t("Blog Name")}
                  variant="bordered"
                  {...register("blogtitle")}
                  isInvalid={!!errors.blogtitle}
                  errorMessage={errors.blogtitle?.message as string}
                />

                <Textarea
                  className="my-3"
                  label={t("Blog Content")}
                  variant="bordered"
                  {...register("blogcontent")}
                  isInvalid={!!errors.blogcontent}
                  errorMessage={errors.blogcontent?.message as string}
                />


                <div className="modal-btn" onClick={handleSubmit(onSubmit)}>
                  <Link to="#" className="btn btn-secondary w-100">
                    {t("Create Blog")}
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

export default observer(BlogForm);
